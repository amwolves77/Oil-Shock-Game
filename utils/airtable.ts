const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

export async function airtableFindByEmail(email: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/check-email?email=${encodeURIComponent(email)}`
  );

  if (!res.ok) {
    throw new Error("Email lookup failed");
  }

  const data = await res.json();
  return data.exists === true;
}


export async function airtableCreateScore(
  email: string,
  nickname: string,
  score: number
) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/submit-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, nickname, score }),
  });

  if (!res.ok) {
    throw new Error("Score submit failed");
  }

  return true;
}

export async function airtableTop10() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/leaderboard`);

  if (!res.ok) {
    throw new Error("Leaderboard API failed");
  }

  const data = await res.json();

  return data.map((entry: any) => ({
    ...entry,
    timestamp: Date.now(),
  }));
}


