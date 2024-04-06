import pool from "../database.js";

class Bron {
	static async createInstance(bronData) {
		const connection = await pool.getConnection();

		console.log(bronData);
		try {
			const queryString = `
                INSERT INTO car (id, name)
                VALUES (?, ?)
            `;

			const {
				id,
				name
			} = bronData;

			await connection.query(queryString, [
                id,
				name
			]);

			console.log("Создана новая бронь");
		} catch (error) {
			console.error(
				`Произошла ошибка при создании нового пользователя: ${error}`
			);
		} finally {
			connection.release(); // Возвращаем соединение в пул
		}
	}

	static async getUserByEmail(email) {
		const connection = await pool.getConnection();

		try {
			const queryString = `
				SELECT * FROM user
				WHERE email = ?
			`;

			const result = await connection.query(queryString, [email]);

			return result[0];
		} catch (error) {
			console.error(
				`Произошла ошибка при получении пользователя по email: ${error}`
			);
		} finally {
			connection.release(); // Возвращаем соединение в пул
		}
	}

	static async checkUser(email, password) {
		const connection = await pool.getConnection();

		try {
			const queryString = `
				SELECT EXISTS (
					SELECT 1
					FROM user
					WHERE email = ? AND password = ?
				) AS user_exists;
			`;

			const result = await connection.query(queryString, [
				email,
				password,
			]);

			return result[0];
		} catch (error) {
			console.error(
				`Произошла ошибка при авторизации пользователя: ${error}`
			);
		} finally {
			connection.release(); // Возвращаем соединение в пул
		}
	}
}

export default Bron;
