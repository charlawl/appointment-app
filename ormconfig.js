module.exports = {
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": process.env.POSTGRES_PORT,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASS,
    "database": process.env.POSTGRES_DB,
    "synchronize": process.env.POSTGRES_SYNC,
    "entities": [
      'dist/**/*.entity.js'
    ],
    "migrations": [
      "dist/migrations/**/*.{ts,js}"
    ]
}