import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = process.env.BRAWL_API_KEY;

const players = {
  ikikrepus: "28289CL98J",
  Eliott14: "22989JGCUP",
  Alexcool56: "2J2GRCGJJ9",
  Max911: "2U9QYVQ9L2"
};

app.get("/", (req, res) => {
  res.send("API Fenyx OK 🚀");
});

app.get("/api/player/:name", async (req, res) => {
  const tag = players[req.params.name];
  if (!tag) return res.status(404).json({ error: "Joueur inconnu" });

  try {
    const r = await fetch(`https://api.brawlstars.com/v1/players/%23${tag}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!r.ok) {
      return res.status(r.status).json({ error: "Erreur API Brawl Stars" });
    }

    const data = await r.json();
    res.json({
      name: data.name,
      trophies: data.trophies,
      highestTrophies: data.highestTrophies
    });
  } catch (e) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("API prête");
});
