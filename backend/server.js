require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const homeRoutes = require('./routes/home.routes');

app.use('/api/home', homeRoutes);
// Sector Search API
app.get('/api/sectors/search', (req, res) => {

    const term = req.query.term;

    if (!term || term.length < 3) {
        return res.json([]);
    }

    const sql = `
        SELECT *
        FROM sectors
        WHERE city_name LIKE ?
        OR airport_name LIKE ?
        OR airport_code LIKE ?
        LIMIT 10
    `;

    const search = term + '%';

    db.query(sql, [search, search, search], (err, result) => {

        if (err) {
            console.error('Sector search error:', err);

            return res.status(500).json({
                message: 'Database query failed',
                fatal: true
            });
        }

        res.json(result);
    });
});

const net = require('net');

app.get('/api/test-db-network', (req, res) => {
    const host = process.env.DB_HOST;
    const port = Number(process.env.DB_PORT);

    const socket = new net.Socket();

    socket.setTimeout(10000);

    socket.on('connect', () => {
        socket.destroy();

        res.json({
            success: true,
            message: 'Render can reach Aiven MySQL',
            host: host,
            port: port
        });
    });

    socket.on('timeout', () => {
        socket.destroy();

        res.status(500).json({
            success: false,
            error: 'TCP connection timeout',
            host: host,
            port: port
        });
    });

    socket.on('error', (err) => {
        res.status(500).json({
            success: false,
            code: err.code,
            message: err.message,
            host: host,
            port: port
        });
    });

    socket.connect(port, host);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});