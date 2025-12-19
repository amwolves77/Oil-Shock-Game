const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;

export async function airtableFindByEmail(email: string) {
  const formula = `{Email}="${email}"`;
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(
    TABLE_NAME
  )}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('Airtable lookup failed');
  }

  const data = await res.json();
  return data.records.length > 0;
}

export async function airtableCreateScore(email: string, nickname: string, score: number) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      records: [
        { fields: { Email: email, Nickname: nickname, Score: score } }
      ]
    }),
  });

  if (!res.ok) {
    throw new Error('Airtable create failed');
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


