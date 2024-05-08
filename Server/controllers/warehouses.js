const { pool } = require("../models/_mysql");
const jwt = require('jsonwebtoken')

async function getAllWarehouses(req, res) {
	try {
		
		const query = "SELECT * FROM Warehouses";
		const [Warehouses] = await pool.query(query);

		return res.send({
			status: "SUCCESS",
			message: "Warehouses Retrieved",
			data: Warehouses,
		});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
}

async function deleteWarehouse(req, res) {
	let warehouseId = req.body["warehouseId"];

	try {
		await pool.query("DELETE FROM Warehouses WHERE warehouse_id = ?", [
			warehouseId,
		]);
		return res.send({
			status: "SUCCESS",
			message: `Warehouse with ID ${warehouseId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Internal server error" });
	}
}

// this function below is used for specific usecases...
function verifyJWTInterMediate(username, token, expected_privs = [], res) {
	let status = true;
	if (!token || !username) {
		status = false;
		return res
			.status(401)
			.send({ status: "FAILURE", message: "Missing auth fields !" });
	}
	// Verify the JWT and check that it is valid
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			status = false;
			return res.status(401).send({ status: "FAILURE", message: err.message });
		}
		if (decoded.exp < Date.now() / 1000) {
			status = false;
			return res
				.status(401)
				.send({ status: "FAILURE", message: "JWT has expired" });
		}

		if (!expected_privs.includes(decoded.role_id)) {
			status = false;
			return res
				.status(401)
				.send({ status: "FAILURE", message: "Insufficient privileges" });
		}
		// If the JWT is valid, save the decoded user information in the request object
		// so that it is available for the next middleware function
		if (decoded.username != username) {
			status = false;
			return res
				.status(401)
				.send({ status: "FAILURE", message: "Token mismatch" }); // Token is not this users, but another users
		}
	});

	return status;
}

async function editWarehouse(req, res) {
	const {
		warehouse_name,
		warehouse_description,
		warehouse_location,
		max_storage_capacity,
		warehouse_id,
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1"]; // admin role id

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	const image_name = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const warehouse = {
		warehouse_name,
		warehouse_description,
		warehouse_location,
		max_storage_capacity,
		image_name,
	};

	try {
		const [results] = await pool.query(
			"UPDATE Warehouses SET ? WHERE warehouse_id = ?",
			[warehouse, warehouse_id],
		);

		if (results.affectedRows == 0) {
			return res.send({
				status: "FAILURE",
				message: "Warehouse not found",
			});
		}
		return res.send({
			status: "SUCCESS",
			message: "Warehouse updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Internal Server Error" });
	}
}

async function addWarehouse(req, res) {
	const {
		warehouse_name,
		warehouse_description,
		warehouse_location,
		max_storage_capacity,
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1"]; // admin role id

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	const image_name = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const warehouse = {
		warehouse_name,
		warehouse_description,
		warehouse_location,
		max_storage_capacity,
		image_name,
	};

	try {
		await pool.query("INSERT INTO Warehouses SET ?", warehouse);
		return res.send({
			status: "SUCCESS",
			message: "Warehouse added successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Internal Server Error" });
	}
}

module.exports = {
	getAllWarehouses,
	deleteWarehouse,
	editWarehouse,
	addWarehouse,
};
