const {pool} = require("../models/_mysql");
const jwt = require("jsonwebtoken");

async function getAllProducts(req, res) {
	try{
	const query = "SELECT * FROM Products";
	const [products] = await pool.query(query);

	return res.send({
		status: "SUCCESS",
		message: "Products Retrieved",
		data: products,
	});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
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

async function addProduct(req, res) {
	const {
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		warehouse_location_id,
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1", 2, "2"]; // admin and wh operator role ids

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	// Get the uploaded file details from req.file
	const product_image_name = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const product = {
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		product_image_name,
		warehouse_location_id,
		username,
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


async function editProduct(req, res) {
	const {
		product_id,
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		warehouse_location_id,
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1", 2, "2"]; // admin and wh operator role ids

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	// Get the uploaded file details from req.file
	const product_image_name = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const product = {
		product_name,
		description,
		unit_price,
		quantity_in_stock,
		category_id,
		product_image_name,
		warehouse_location_id,
		username,
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

async function deleteProduct(req, res) {
	let productId = req.body["product_id"];

	try {
		await pool.query("DELETE FROM Products WHERE product_id = ?", [productId]);
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

module.exports = {
	getAllProducts,
	deleteProduct,
	editProduct,
	addProduct,
};
