const express = require('express');
const cors = require('cors'); // Import middleware cors
const app = express();

// Menggunakan middleware cors
app.use(cors());

// Fungsi untuk mendapatkan suhu dan kelembaban acak
function getRandomData() {
    const temperature = Math.floor(Math.random() * (40 - 10 + 1)) + 10; // Nilai acak antara 10 dan 40 derajat Celsius
    const humidity = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Nilai acak antara 50 dan 100 persen
    return { temperature, humidity };
}

// Endpoint untuk mendapatkan suhu dan kelembaban
app.get('/api/temperature', (req, res) => {
    const { temperature, humidity } = getRandomData();
    const data = {
        temperature: temperature,
        humidity: humidity,
        timestamp: new Date().toISOString()
    };
    res.json(data);
});

// Jalankan server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

// Mengganti suhu dan kelembaban setiap 5 detik
setInterval(() => {
    server.getConnections((err, count) => {
        console.log(`Sedang menjalankan...`);
        if (count > 0) {
            const { temperature, humidity } = getRandomData();
            const data = {
                temperature: temperature,
                humidity: humidity,
                timestamp: new Date().toISOString()
            };
            server.emit('updateTemperature', data);
        }
    });
}, 5000); // Setiap 5 detik
