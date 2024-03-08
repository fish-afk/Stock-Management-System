const {pool} = require("../models/_mysql");

function getAllSales(req, res) {
	const query = "SELECT * FROM Sales";

	pool.query(query, (err, results) => {
		if (!err && results) {
			return res.send({ status: "SUCCESS", data: results });
		} else {
			console.log(err);
			return res.send({ status: "FAILURE", message: "Unknown error" });
		}
	});
}

async function deleteSale(req, res) {
	let saleId = req.body["sale_id"];

	try {
		await pool.query("DELETE FROM Sales WHERE sale_id = ?", [
			saleId,
		]);
		return res.send({
			status: "SUCCESS",
			message: `Sale with ID ${saleId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function editSale(req, res) {
	const {
		sale_id,
		sale_date,
		customer_id,
		product_id,
		quantity,
		unit_price,
		total_price,
		order_completed,
	} = req.body;

	const sale = {
		sale_date,
		customer_id,
		product_id,
		quantity,
		unit_price,
		total_price,
		order_completed,
	};

	try {
		await pool.query("UPDATE Sales SET ? WHERE sale_id = ?", [
			sale,
			sale_id,
		]);
		return res.send({
			status: "SUCCESS",
			message: "Sale updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function addSale(req, res) {
	const {
		sale_date,
		customer_id,
		product_id,
		quantity,
		unit_price,
		total_price,
		order_completed,
	} = req.body;

	const sale = {
		sale_date,
		customer_id,
		product_id,
		quantity,
		unit_price,
		total_price,
		order_completed,
	};

	try {
		await pool.query("INSERT INTO Sales SET ?", sale);
		return res.send({ status: "SUCCESS", message: "Sale added successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

module.exports = {
	getAllSales,
	deleteSale,
	editSale,
	addSale,
};
