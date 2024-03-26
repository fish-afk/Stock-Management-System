const bcrypt = require("bcrypt"); // For password hashing
const mysql = require("../models/_mysql");
const authMiddleware = require("../middleware/auth");


const getAllUsers = async (req, res) => {
	try {
		if (req.decoded.role_id != 1) {
			return res.send({status: 'FAILURE', message: 'insufficient privileges'})
		}
		// Fetch all users excluding the password field
		const [users] = await mysql.pool.query(
			"SELECT username, first_name, last_name, email, role_id FROM Users",
		);

		res.json({
			status: "SUCCESS",
			message: "Users retrieved successfully",
			data: users
		});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
};

const register = async (req, res) => {
	try {

		if (req.decoded.role_id != 1) {
			return res.send({
				status: "FAILURE",
				message: "insufficient privileges",
			});
		}

		const { newUserUsername, password, firstName, lastName, email, roleId = 2 } = req.body;
		
		
		if (!newUserUsername || !password || !firstName || !lastName || !email || !roleId) {
			return res.send({ status: "FAILURE", message: "Missing details" });
		}

		const username_regex = /^[a-zA-Z0-9_]+$/;

		if (!username_regex.test(newUserUsername.toLowerCase())) {
			return res.json({
				status: "FAILURE",
				message:
					"Username should only contain alphanumeric characters and underscores",
			});
		}

		// Check if username already exists
		const [existingUser] = await mysql.pool.query(
			"SELECT * FROM Users WHERE username = ?",
			[newUserUsername],
		);
		if (existingUser.length > 0) {
			return res.json({
				status: "FAILURE",
				message: "Username already exists",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const [result] = await mysql.pool.query(
			"INSERT INTO Users (username, password, first_name, last_name, email, role_id) VALUES (?, ?, ?, ?, ?, ?)",
			[newUserUsername, hashedPassword, firstName, lastName, email, roleId],
		);

		res.json({
			status: "SUCCESS",
			message: "User registered successfully",
		}); // Include the generated user ID
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.send({
				status: "FAILURE",
				message: "Please provide username and password",
			});
		}

		// Find the user by username
		const [user] = await mysql.pool.query(
			"SELECT * FROM Users WHERE username = ?",
			[username],
		);
		if (!user.length) {
			return res.json({
				status: "FAILURE",
				message: "Invalid username or password",
			});
		}

		// Compare hashed passwords
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res.json({
				status: "FAILURE",
				message: "Invalid username or password",
			});
		} else {
			const { password, auth_refresh_token, ...userData } = user[0]; // Remove the 'password' field from user[0]
			const role_id = userData.role_id;
			const jwtToken = authMiddleware.generateJwtToken(
				userData.username,
				role_id,
				"normal",
			);

			const refreshToken = await authMiddleware.generateRefreshToken(
				userData.username,
				role_id,
			);

			if (refreshToken == false || !jwtToken) {
				return res.send({
					status: "FAILURE",
					message: "Error creating tokens!",
				});
			} else {
				// Login successful (replace with your authentication logic)
				res.json({
					status: "SUCCESS",
					message: "Login successful",
					userData, // Include relevant user information
					jwtToken,
					refreshToken,
				});
			}
		}
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { username, currentPassword, newPassword } = req.body;

		// Find the user by username
		const [user] = await mysql.pool.query(
			"SELECT * FROM Users WHERE username = ?",
			[username],
		);
		if (!user.length) {
			return res.json({ status: "FAILURE", message: "User not found" });
		}

		// Compare the current password provided with the stored password
		const match = await bcrypt.compare(currentPassword, user[0].password);
		if (!match) {
			return res.json({
				status: "FAILURE",
				message: "Incorrect current password",
			});
		}

		// Generate a random password (replace with a secure random password generation method

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update the user's password
		await mysql.pool.query("UPDATE Users SET password = ? WHERE username = ?", [
			hashedPassword,
			username,
		]);

		res.json({ status: "FAILURE", message: "Password reset successful" });
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
};

const deleteUser = async (req, res) => {
	try {
		if (req.decoded.role_id != 1) {
			return res.send({status: 'FAILURE', message: 'insufficient privileges'})
		}
	
		const username = req.body['user_username']

		if (!username) {
			return res.send({status: 'FAILURE', message: "Missing details"})
		}
		// Fetch all users excluding the password field
		await mysql.pool.query(
			"DELETE FROM Users WHERE username = ?", [username]
		);

		res.json({
			status: "SUCCESS",
			message: "User deleted successfully",
		});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
}

const editUserRole = async (req, res) => {
	try {
		if (req.decoded.role_id != 1) {
			return res.send({
				status: "FAILURE",
				message: "insufficient privileges",
			});
		}

		const username = req.body["user_username"];
		const role_id = req.body['role_id']

		

		if (!username || !role_id) {
			return res.send({ status: "FAILURE", message: "Missing details" });
		}
		// Fetch all users excluding the password field
		await mysql.pool.query("UPDATE Users SET role_id = ? WHERE username = ?", [role_id, username]);

		res.json({
			status: "SUCCESS",
			message: "User role changed successfully",
		});
	} catch (error) {
		console.error(error);
		res.json({ status: "FAILURE", message: "Internal server error" });
	}
};

const refresh = async (req, res) => {
	const refreshToken = req.body.refreshToken;
	const username = req.body.username;

	if (!refreshToken || !username) {
		return res.send({ message: "No Token or no username provided" });
	}
	await authMiddleware.verifyRefreshToken(refreshToken, username, res);
};

module.exports = {
	register,
	login,
	resetPassword,
	getAllUsers,
	refresh,
	deleteUser,
	editUserRole
};
