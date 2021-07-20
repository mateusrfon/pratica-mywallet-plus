import connection from "../database.js";

export async function findByEmail(email) {
    const result = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
    );
    return result.rows[0];
};

export async function create(name, email, hashedPassword) {
    await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, hashedPassword]
    );
};