const { pool } = require("../models/_mysql");

async function getAllCategories(req, res) {
	try {
		if (req.decoded.role_id != 1) {
			return res.send({
				status: "FAILURE",
				message: "insufficient privileges",
			});
		}

		const query = "SELECT * FROM Categories";
		const [categories] = await pool.query(query);

		return res.send({
			status: "SUCCESS",
			message: "Product Categories Retrieved",
			data: categories,
		});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
}

async function deleteCategory(req, res) {
	if (req.decoded.role_id != 1) {
		return res.send({
			status: "FAILURE",
			message: "insufficient privileges",
		});
	}

	let categoryId = req.body["categoryId"];

	if (!categoryId) {
		return res.send({
			status: "FAILURE",
			message: "missing details",
		});
	}

	try {
		await pool.query("DELETE FROM Categories WHERE category_id = ?", [
			categoryId,
		]);
		return res.send({
			status: "SUCCESS",
			message: `Category with ID ${categoryId} deleted successfully.`,
		});
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.send({ status: "FAILURE", message: "Internal Server Error" });
	}
}

async function editCategory(req, res) {
	const { category_name, category_description, category_id } = req.body;

	// Get the uploaded file details from req.file
	const category_image_name = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const category = { category_name, category_description, category_image_name };

	try {
		const [results] = await pool.query(
			"UPDATE Categories SET ? WHERE category_id = ?",
			[category, category_id],
		);

		if (results.affectedRows == 0) {
			return res.send({
				status: "FAILURE",
				message: "Category not found",
			});
		}
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
	const { category_name, category_description } = req.body;

	// Get the uploaded file details from req.file
	const category_image_name = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const category = { category_name, category_description, category_image_name };

	try {
		await pool.query("INSERT INTO Categories SET ?", category);
		return res.send({
			status: "SUCCESS",
			message: "Category added successfully",
		});
	} catch (error) {
		console.log(error);
		return res.send({ status: "FAILURE", message: "Internal Server Error" });
	}
}

module.exports = {
	getAllCategories,
	deleteCategory,
	editCategory,
	addCategory,
};
