const {pool} = require("../models/_mysql");

function getAllWarehouses(req, res) {
	const query = "SELECT * FROM Warehouses";

	pool.query(query, (err, results) => {
		if (!err && results) {
			return res.send({ status: "SUCCESS", data: results });
		} else {
			console.log(err);
			return res.send({ status: "FAILURE", message: "Unknown error" });
		}
	});
}

async function deleteWarehouse(req, res) {
	let warehouseId = req.body["warehouse_id"];

	try {
		await pool.query(
			"DELETE FROM Warehouses WHERE warehouse_id = ?",
			[warehouseId],
		);
		return res.send({
			status: "SUCCESS",
			message: `Warehouse with ID ${warehouseId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function editWarehouse(req, res) {
	const { warehouse_id, warehouse_name, location_id } = req.body;

	const warehouse = { warehouse_name, location_id };

	try {
		await pool.query(
			"UPDATE Warehouses SET ? WHERE warehouse_id = ?",
			[warehouse, warehouse_id],
		);
		return res.send({
			status: "SUCCESS",
			message: "Warehouse updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function addWarehouse(req, res) {
	const { warehouse_name, location_id } = req.body;

	const warehouse = { warehouse_name, location_id };

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
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

module.exports = {
	getAllWarehouses,
	deleteWarehouse,
	editWarehouse,
	addWarehouse,
};
