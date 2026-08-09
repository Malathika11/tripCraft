require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});