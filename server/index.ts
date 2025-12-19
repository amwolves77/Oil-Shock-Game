
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();




const app = express();
app.use(cors());

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/leaderboard", async (_req, res) => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID!;
    const table = process.env.AIRTABLE_TABLE_NAME!;
    const token = process.env.AIRTABLE_TOKEN!;

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      table
    )}?maxRecords=5&sort%5B0%5D%5Bfield%5D=Score&sort%5B0%5D%5Bdirection%5D=desc`;

    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!r.ok) throw new Error("Airtable error");

    const data = await r.json();

    res.json(
      data.records.map((rec: any) => ({
        nickname: rec.fields?.Nickname ?? "",
        score: rec.fields?.Score ?? 0,
      }))
    );
    } catch (err: any) {
        console.log("LEADERBOARD ERROR:", err?.message || err);

        const baseId = process.env.AIRTABLE_BASE_ID;
        const table = process.env.AIRTABLE_TABLE_NAME;
        const token = process.env.AIRTABLE_TOKEN;

        console.log("ENV CHECK:", {
        baseId,
        table,
        token: token ? "SET" : "MISSING",
        });

        res.status(500).json({ error: "leaderboard_failed" });
    }

});



const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
