const { pool } = require("../models/_mysql");

async function getTables(pool) {
	const [tables] = await pool.query("SHOW TABLES");
	return tables.map((row) => Object.values(row)[0]);
}

async function emptyTables(pool, tables) {
	try {
        for (let i = 0; i < tables.length; i++) {
			if (tables[i] != "users" && tables[i] != "Users") {
				await pool.query(`DELETE FROM \`${tables[i]}\``);
			}
		}
		return true;
    } catch (err) {
        console.log(err)
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
	const result = await emptyTables(pool, tables);

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
