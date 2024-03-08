const {pool} = require("../models/_mysql");

function getAllCategories(req, res) {
	const query = "SELECT * FROM Categories";

	pool.query(query, (err, results) => {
		if (!err && results) {
			return res.send({ status: "SUCCESS", data: results });
		} else {
			console.log(err);
			return res.send({ status: "FAILURE", message: "Unknown error" });
		}
	});
}

async function deleteCategory(req, res) {
	let categoryId = req.body["category_id"];

	try {
		await pool.query(
			"DELETE FROM Categories WHERE category_id = ?",
			[categoryId],
		);
		return res.send({
			status: "SUCCESS",
			message: `Category with ID ${categoryId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function editCategory(req, res) {
	const { category_id, category_name } = req.body;

	const category = { category_name };

	try {
		await pool.query(
			"UPDATE Categories SET ? WHERE category_id = ?",
			[category, category_id],
		);
		return res.send({
			status: "SUCCESS",
			message: "Category updated successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

async function addCategory(req, res) {
	const { category_name } = req.body;

	const category = { category_name };

	try {
		await pool.query("INSERT INTO Categories SET ?", category);
		return res.send({
			status: "SUCCESS",
			message: "Category added successfully",
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Unknown error" });
	}
}

module.exports = {
	getAllCategories,
	deleteCategory,
	editCategory,
	addCategory,
};
