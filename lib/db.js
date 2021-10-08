import mysql from "serverless-mysql";

export const db = mysql({
    config: {
        host: "localhost",
        database: "storeapi",
        user: "root",
        password: "",
        port: 3306
    }
});

export async function query(query, parma) {
    try {
        const results = await db.query(query, parma);
        await db.end();
        return { status: { code: 200, message: 'OK' }, data: results };
    } catch (e) {
        console.log(e);
        return { status: { code: 400, message: 'Bad Request' } };
    }
}