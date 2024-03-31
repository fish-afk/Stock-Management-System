const {pool} = require("../models/_mysql");

async function getAllSuppliers(req, res) {
	try {
		const query = "SELECT * FROM suppliers";
		const [Suppliers] = await pool.query(query);

		return res.send({
			status: "SUCCESS",
			message: "Suppliers Retrieved",
			data: Suppliers,
		});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
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
	const { supplier_id, supplier_name, email, phone } = req.body;

	const supplier = { supplier_name, email, phone };

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
