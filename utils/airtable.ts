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
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(
    TABLE_NAME
  )}?maxRecords=5&sort%5B0%5D%5Bfield%5D=Score&sort%5B0%5D%5Bdirection%5D=desc`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  if (!res.ok) throw new Error('Airtable top10 failed');

  const data = await res.json();

  return (data.records || []).map((r: any) => ({
    nickname: r.fields?.Nickname ?? '',
    email: r.fields?.Email ?? '',
    score: r.fields?.Score ?? 0,
    timestamp: new Date(r.createdTime).getTime(),
  }));
}
