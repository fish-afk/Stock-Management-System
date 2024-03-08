const {pool} = require("../models/_mysql");

function getAllWarehouseLocations(req, res) {
	const query = "SELECT * FROM Warehouse_Locations";

	pool.query(query, (err, results) => {
		if (!err && results) {
			return res.send({ status: "SUCCESS", data: results });
		} else {
			console.log(err);
			return res.send({ status: "FAILURE", message: "Unknown error" });
		}
	});
}

async function deleteWarehouseLocation(req, res) {
	let locationId = req.body["location_id"];

	try {
		await pool.query(
			"DELETE FROM Warehouse_Locations WHERE location_id = ?",
			[locationId],
		);
		return res.send({
			status: "SUCCESS",
			message: `Warehouse location with ID ${locationId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function editWarehouseLocation(req, res) {
	const { location_id, location_name, description } = req.body;

	const warehouseLocation = { location_name, description };

	try {
		await pool.query(
			"UPDATE Warehouse_Locations SET ? WHERE location_id = ?",
			[warehouseLocation, location_id],
		);
		return res.send({
			status: "SUCCESS",
			message: "Warehouse location updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function addWarehouseLocation(req, res) {
	const { location_name, description } = req.body;

	const warehouseLocation = { location_name, description };

	try {
		await pool.query(
			"INSERT INTO Warehouse_Locations SET ?",
			warehouseLocation,
		);
		return res.send({
			status: "SUCCESS",
			message: "Warehouse location added successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

module.exports = {
	getAllWarehouseLocations,
	deleteWarehouseLocation,
	editWarehouseLocation,
	addWarehouseLocation,
};
