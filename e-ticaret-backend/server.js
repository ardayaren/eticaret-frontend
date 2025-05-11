import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const port = 5000;

// Tüm origin'lerden gelen istekleri kabul et

app.use(express.json());

app.use(
  cors({
    origin: ["*"], // Tüm kaynaklara izin ver
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // İzin verilen HTTP metodları
    allowedHeaders: ["Content-Type", "Authorization"], // İzin verilen başlıklar
  })
);

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "veritabani_adin", // Burayı kendi veritabanı adınla değiştir
});

// KAYDOL
app.post("/api/kaydol", async (req, res) => {
  const { ad, email, sifre } = req.body;
  if (!ad || !email || !sifre)
    return res.status(400).json({ error: "Tüm alanlar zorunludur" });

  try {
    const [users] = await pool.query(
      "SELECT * FROM kullanicilar WHERE email = ?",
      [email]
    );

    if (users.length > 0)
      return res.status(409).json({ error: "Bu email zaten kayıtlı" });

    const [result] = await pool.query(
      "INSERT INTO kullanicilar (ad, email, sifre) VALUES (?, ?, ?)",
      [ad, email, sifre]
    );

    res.status(201).json({
      message: "Kayıt başarılı",
      user: { id: result.insertId, ad, email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// GİRİŞ
app.post("/api/giris", async (req, res) => {
  const { email, sifre } = req.body;
  if (!email || !sifre)
    return res.status(400).json({ error: "Email ve şifre zorunludur" });

  try {
    const [users] = await pool.query(
      "SELECT * FROM kullanicilar WHERE email = ? AND sifre = ?",
      [email, sifre]
    );

    if (users.length === 0)
      return res.status(401).json({ error: "Geçersiz email veya şifre" });

    res.json({ message: "Giriş başarılı", user: users[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${port}`);
});
