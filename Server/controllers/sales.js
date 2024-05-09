const { pool } = require("../models/_mysql");
const jwt = require("jsonwebtoken");

async function getAllSales(req, res) {
	try{
	const query = "SELECT * FROM Sales";
	const [Sales] = await pool.query(query);

	return res.send({
		status: "SUCCESS",
		message: "Sales Retrieved",
		data: Sales,
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
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1", 2, "2"]; // admin and wh operator role ids

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	const sale_proof_image = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const sale = {
		sale_date,
		customer_id,
		product_id,
		quantity,
		unit_price,
		sale_proof_image
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
		username,
		jwt_key,
	} = req.body;

	const expected_privs = [1, "1", 2, "2"]; // admin and wh operator role ids

	let status = verifyJWTInterMediate(username, jwt_key, expected_privs, res);

	if (status != true) {
		return;
	}

	const sale_proof_image = req.file ? req.file.filename : null; // Assuming filename is stored in req.file

	const sale = {
		sale_date,
		customer_id,
		product_id,
		quantity,
		unit_price,
		sale_proof_image
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
