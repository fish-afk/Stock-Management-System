const { pool } = require("../models/_mysql");
const jwt = require("jsonwebtoken");

async function getAllPurchases(req, res) {
	try{
	const query = "SELECT * FROM Purchases";
	const [Purchases] = await pool.query(query);

	return res.send({
		status: "SUCCESS",
		message: "Purchases Retrieved",
		data: Purchases,
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
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1", 2, "2"]; // admin and wh operator role ids

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	const purchase_proof_image = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const purchase = {
		supplier_id,
		product_id,
		purchase_date,
		quantity,
		unit_price,
		purchase_proof_image
	};

	try {
		await pool.query("UPDATE Purchases SET ? WHERE purchase_id = ?", [
			purchase,
			purchase_id,
		]);
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
	const {
		supplier_id,
		product_id,
		purchase_date,
		quantity,
		unit_price,
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1", 2, "2"]; // admin and wh operator role ids

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	const purchase_proof_image = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const purchase = {
		supplier_id,
		product_id,
		purchase_date,
		quantity,
		unit_price,
		proof_of_purchase_image: purchase_proof_image,
	};

	try {
		// Query the current quantity in stock of the product
		const [product] = await pool.query(
			"SELECT quantity_in_stock FROM Products WHERE product_id = ?",
			[product_id],
		);

		if (!product) {
			return res
				.send({ status: "FAILURE", message: "Product not found" });
		}


		// Insert the purchase into the Purchases table
		await pool.query("INSERT INTO Purchases SET ?", purchase);

		const currentQuantity = product[0].quantity_in_stock;

		// Update the quantity in stock after purchase
		const updatedQuantity = Number(currentQuantity) + Number(quantity);
		await pool.query(
			"UPDATE Products SET quantity_in_stock = ? WHERE product_id = ?",
			[updatedQuantity, product_id],
		);

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
