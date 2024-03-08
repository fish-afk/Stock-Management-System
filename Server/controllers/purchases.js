const {pool} = require("../models/_mysql");

function getAllPurchases(req, res) {
	const query = "SELECT * FROM Purchases";

	pool.query(query, (err, results) => {
		if (!err && results) {
			return res.send({ status: "SUCCESS", data: results });
		} else {
			console.log(err);
			return res.send({ status: "FAILURE", message: "Unknown error" });
		}
	});
}

async function deletePurchase(req, res) {
	let purchaseId = req.body["purchase_id"];

	try {
		await pool.query(
			"DELETE FROM Purchases WHERE purchase_id = ?",
			[purchaseId],
		);
		return res.send({
			status: "SUCCESS",
			message: `Purchase with ID ${purchaseId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function editPurchase(req, res) {
	const {
		purchase_id,
		supplier_id,
		product_id,
		purchase_date,
		quantity,
		unit_price,
	} = req.body;

	const purchase = {
		supplier_id,
		product_id,
		purchase_date,
		quantity,
		unit_price,
	};

	try {
		await pool.query(
			"UPDATE Purchases SET ? WHERE purchase_id = ?",
			[purchase, purchase_id],
		);
		return res.send({
			status: "SUCCESS",
			message: "Purchase updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function addPurchase(req, res) {
	const { supplier_id, product_id, purchase_date, quantity, unit_price } =
		req.body;

	const purchase = {
		supplier_id,
		product_id,
		purchase_date,
		quantity,
		unit_price,
	};

	try {
		await pool.query("INSERT INTO Purchases SET ?", purchase);
		return res.send({
			status: "SUCCESS",
			message: "Purchase added successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

module.exports = {
	getAllPurchases,
	deletePurchase,
	editPurchase,
	addPurchase,
};
