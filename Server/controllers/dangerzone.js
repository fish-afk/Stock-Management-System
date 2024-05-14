const { pool } = require("../models/_mysql");
const jwt = require("jsonwebtoken");

async function getTables(pool) {
	const [tables] = await pool.query("SHOW TABLES");
	return tables.map((row) => Object.values(row)[0]);
}

async function emptyTables(pool, tables) {
	try {
		for (const table in tables) {
			if (table != "users" && table != "Users") {
				await pool.query(`DELETE FROM \`${table}\``);
			}
		}
		return true;
	} catch (err) {
		return false;
	}
}

const resetDb = async (req, res) => {
	if (req.decoded.role_id != 1) {
		return res.send({
			status: "FAILURE",
			message: "insufficient privileges",
		});
	}

	const tables = await getTables(pool);
	const result = emptyTables(pool, tables);

	try {
		if (result == true) {
			return res.send({
				status: "SUCCESS",
				message: "Resetting db successfull",
			});
		} else {
			return res.send({
				status: "FAILURE",
				message: "Resetting db unsuccessfull",
			});
		}
	} catch (err) {
		console.log(err);
		return res.send({
			status: "FAILURE",
			message: "Server error",
		});
	}
};

const deleteSpecificTable = async (req, res) => {
	if (req.decoded.role_id != 1) {
		return res.send({
			status: "FAILURE",
			message: "insufficient privileges",
		});
	}

    const table = req.body["table"];

    if (table == 'users' || table == "Users") {
        return res.send({
					status: "FAILURE",
					message: "Cannot delete data in users table",
				});
    }

	try {
        await pool.query(`DELETE FROM \`${table}\``);
        return res.send({
					status: "SUCCESS",
					message: `Emptied ${table} table successfully`,
				});
	} catch (err) {
		console.log(err);
		return res.send({
			status: "FAILURE",
			message: "Server error",
		});
	}
};

module.exports = {
	resetDb,
    deleteSpecificTable
};
