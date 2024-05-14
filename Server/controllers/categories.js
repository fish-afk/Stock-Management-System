const { pool } = require("../models/_mysql");
const jwt = require("jsonwebtoken");

async function getAllCategories(req, res) {
	try {
		const query = `SELECT c.*, COUNT(p.product_id) AS number_of_products FROM Categories c LEFT JOIN Products p ON c.category_id = p.category_id GROUP BY c.category_id;`;
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

// this function below is used for specific usecases....
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

async function editCategory(req, res) {
	const {
		category_name,
		category_description,
		category_id,
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1"]; // admin role id

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

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
	const { category_name, category_description, username, jwt_key } = req.body;

	const expected_privs = [1, "1"]; // admin role id

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

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
