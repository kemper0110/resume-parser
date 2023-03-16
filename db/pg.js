const {Pool} = require('pg');
const connectionString = process.env.DB_CONNECTION;

const pool = new Pool (
    {
        max: 20,
        connectionString,
        idleTimeoutMillis: 30_000
    }
)

module.exports = pool;