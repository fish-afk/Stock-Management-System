import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../../css/auth.css";

const Register = () => {
	const [inputUsername, setInputUsername] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		await delay(500);
		console.log(`Username :${inputUsername}, Password :${inputPassword}`);
		if (inputUsername !== "admin" || inputPassword !== "admin") {
			setShow(true);
		}
		setLoading(false);
	};

	const handlePassword = () => {};

	function delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	return (
		<div className="sign-in__wrapper bg-dark">
			{/* Overlay */}
			<div className="sign-in__backdrop"></div>
			{/* Form */}
			<Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
				{/* Header */}
				
				<div className="h4 mb-2 text-center">Register</div>
				{/* ALert */}
				{show ? (
					<Alert
						className="mb-2"
						variant="danger"
						onClose={() => setShow(false)}
						dismissible
					>
						Incorrect username or password.
					</Alert>
				) : (
					<div />
				)}
				<Form.Group className="mb-2" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						value={inputUsername}
						placeholder="Username"
						onChange={(e) => setInputUsername(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-2" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={inputPassword}
						placeholder="Password"
						onChange={(e) => setInputPassword(e.target.value)}
						required
					/>
				</Form.Group>

				{!loading ? (
					<Button className="w-100" variant="primary" type="submit">
						Sign Up
					</Button>
				) : (
					<Button className="w-100" variant="primary" type="submit" disabled>
						Registering...
					</Button>
				)}

				<div className="d-grid justify-content-end pt-3">
					<p className="text-dark px-0">
						Already have an account ?{" "}
						<a className="text-primary" href="/login">
							Login
						</a>
					</p>
				</div>
			</Form>
			{/* Footer */}
			<div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
				Stock Management System | &copy; {new Date().getFullYear()}
			</div>
		</div>
	);
};

export default Register;
