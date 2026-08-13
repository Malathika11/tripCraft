require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();


console.log('🔥 SERVER VERSION: HOME-API-TEST');
console.log('🔥 SERVER FILE:', __filename);


app.use(cors());
app.use(express.json());

const homeRoutes = require('./routes/home.routes');

app.use('/api/home', homeRoutes);

const packageRoutes = require('./routes/package.routes');

app.use('/api/packages', packageRoutes);

// Sector Search API
app.get('/api/sectors/search', (req, res) => {

    const term = req.query.term;

    if (!term || term.length < 3) {
        return res.json([]);
    }

    const sql = `
        SELECT *
        FROM sectors
        WHERE city LIKE ?
        OR airport LIKE ?
        OR code LIKE ?
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});