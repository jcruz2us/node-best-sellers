module.exports = {
    "development": {
        "url": process.env.DB_CONNECTION_STRING || "postgres://postgres:password@0.0.0.0/postgres",
    },
    "production": {
        "url": process.env.DB_CONNECTION_STRING,
    }
}