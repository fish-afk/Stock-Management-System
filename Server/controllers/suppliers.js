const {pool} = require("../models/_mysql");

function getAllSuppliers(req, res) {
	const query = "SELECT * FROM Suppliers";

	pool.query(query, (err, results) => {
		if (!err && results) {
			return res.send({ status: "SUCCESS", data: results });
		} else {
			console.log(err);
			return res.send({ status: "FAILURE", message: "Unknown error" });
		}
	});
}

async function deleteSupplier(req, res) {
	let supplierId = req.body["supplier_id"];

	try {
		await pool.query(
			"DELETE FROM Suppliers WHERE supplier_id = ?",
			[supplierId],
		);
		return res.send({
			status: "SUCCESS",
			message: `Supplier with ID ${supplierId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function editSupplier(req, res) {
	const { supplier_id, supplier_name, email } = req.body;

	const supplier = { supplier_name, email };

	try {
		await pool.query(
			"UPDATE Suppliers SET ? WHERE supplier_id = ?",
			[supplier, supplier_id],
		);
		return res.send({
			status: "SUCCESS",
			message: "Supplier updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function addSupplier(req, res) {
	const { supplier_name, email } = req.body;

	const supplier = { supplier_name, email };

	try {
		await pool.query("INSERT INTO Suppliers SET ?", supplier);
		return res.send({
			status: "SUCCESS",
			message: "Supplier added successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

module.exports = {
	getAllSuppliers,
	deleteSupplier,
	editSupplier,
	addSupplier,
};
