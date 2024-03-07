const {pool} = require("../models/_mysql");

function getAllProducts(req, res) {
	const query = "SELECT * FROM Products";

	pool.query(query, (err, results) => {
		if (!err && results) {
			return res.send({ status: "SUCCESS", data: results });
		} else {
			console.log(err);
			return res.send({ status: "FAILURE", message: "Unknown error" });
		}
	});
}

async function deleteProduct(req, res) {
	let productId = req.body["product_id"];

	try {
		await pool.query("DELETE FROM Products WHERE product_id = ?", [
			productId,
		]);
		return res.send({
			status: "SUCCESS",
			message: `Product with ID ${productId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function editProduct(req, res) {
	const {
		product_id,
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		warehouse_location_id,
		last_edited_by,
	} = req.body;

	const product = {
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		warehouse_location_id,
		last_edited_by,
	};

	try {
		await pool.query("UPDATE Products SET ? WHERE product_id = ?", [
			product,
			product_id,
		]);
		return res.send({
			status: "SUCCESS",
			message: "Product updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function addProduct(req, res) {
	const {
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		warehouse_location_id,
		last_edited_by,
	} = req.body;

	const product = {
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		warehouse_location_id,
		last_edited_by,
	};

	try {
		await pool.query("INSERT INTO Products SET ?", product);
		return res.send({
			status: "SUCCESS",
			message: "Product added successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

module.exports = {
	getAllProducts,
	deleteProduct,
	editProduct,
	addProduct,
};
