import mysql from 'mysql2/promise'

let conn;

export const conTOData = async () => {
    if (!conn) {
        conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,

        })
    }
    return conn
}