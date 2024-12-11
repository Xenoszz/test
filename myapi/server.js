const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 9000;

// อนุญาตการเข้าถึง CORS
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// กำหนด Static Files ให้ไปยังโฟลเดอร์ที่คุณระบุ
// ใช้ __dirname เพื่อให้เป็น path ที่สัมพันธ์กับไฟล์ที่รัน
app.use(express.static(path.join(__dirname, '../Final')));

// Endpoint สำหรับเสิร์ฟไฟล์ HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Final/index.html'));
});

// Endpoint สำหรับรับคะแนน
let currentScore = 0;
app.post('/api/score', (req, res) => {
    const score = parseInt(req.body.score);
    console.log('Received score:', score);
    currentScore = score;
    res.json({ score: currentScore });
});

// Endpoint สำหรับรับค่าชีวิต
let currentLives = 3;
app.post('/api/lives', (req, res) => {
    const lives = parseInt(req.body.lives);
    console.log('Received lives:', lives);
    currentLives = lives;
    res.json({ lives: currentLives });
});

// Endpoint สำหรับดึงคะแนน
app.get('/api/score', (req, res) => {
    res.json({ score: currentScore });
});

// Endpoint สำหรับดึงค่าชีวิต
app.get('/api/lives', (req, res) => {
    res.json({ lives: currentLives });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
