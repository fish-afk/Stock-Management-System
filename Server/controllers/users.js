const bcrypt = require("bcrypt"); // For password hashing
const mysql = require("../models/_mysql");
const authMiddleware = require("../middleware/auth");
// Replace with your actual connection details

const register = async (req, res) => {
	try {
		const { username, password, firstName, lastName, contactInfo, roleId } =
			req.body;

		// Check if username already exists
		const [existingUser] = await mysql.pool.query(
			"SELECT * FROM Users WHERE username = ?",
			[username],
		);
		if (existingUser.length > 0) {
			return res.status(400).json({ message: "Username already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const [result] = await mysql.pool.query(
			"INSERT INTO Users (username, password, first_name, last_name, contact_info, role_id) VALUES (?, ?, ?, ?, ?, ?)",
			[username, hashedPassword, firstName, lastName, contactInfo, roleId],
		);

		res.status(201).json({
			message: "User registered successfully",
			userId: result.insertId,
		}); // Include the generated user ID
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.send({ message: "Please provide username and password" });
		}

		// Find the user by username
		const [user] = await mysql.pool.query(
			"SELECT * FROM Users WHERE username = ?",
			[username],
		);
		if (!user.length) {
			return res.status(401).json({ message: "Invalid username or password" });
		}

		// Compare hashed passwords
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid username or password" });
		} else {
			const role_id = user[0].role_id;
			const jwtToken = authMiddleware.generateJwtToken(
				user[0].username,
				role_id,
				"normal",
			);
            
			const refreshToken = await authMiddleware.generateRefreshToken(
				user[0].username,
				role_id,
			);

			if (refreshToken == false || !jwtToken) {
				return res.send({
					message: "Error creating tokens!",
					auth: false,
				});
			} else {
				// Login successful (replace with your authentication logic)
				res
					.status(200)
					.json({ message: "Login successful", jwtToken, refreshToken }); // Include relevant user information
			}
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const resetPassword = async (req, res) => {
	// Implement your reset password logic here
	// This example is a placeholder and doesn't send any emails
	try {
		const { username } = req.body;

		// Find the user by username
		const [user] = await mysql.pool.query(
			"SELECT * FROM Users WHERE username = ?",
			[username],
		);
		if (!user.length) {
			return res.status(400).json({ message: "User not found" });
		}

		// Generate a random password (replace with a secure random password generation method)
		const newPassword = Math.random().toString(36).substring(2, 15);

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update the user's password
		await mysql.pool.query("UPDATE Users SET password = ? WHERE username = ?", [
			hashedPassword,
			username,
		]);

		// Send the new password to the user's email (replace with your email sending logic)
		console.log(`New password for ${username}: ${newPassword}`);

		res.status(200).json({ message: "Password reset successful" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	register,
	login,
	resetPassword,
};
