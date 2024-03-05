import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../../css/auth.css";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
	const Navigate = useNavigate();
	const [inputUsername, setInputUsername] = useState("");
	const [inputPassword, setInputPassword] = useState("");
	const [inputConfirmPassword, setInputConfirmPassword] = useState("");

	const [show, setShow] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		let data = await axios.post(BASEURL + "/users/login", {
			username: inputUsername,
			password: inputPassword,
		});
		const response = data?.data;

		console.log(response);
		setShow(response?.status);
		setMessage(response?.message);

		if (response?.status == "SUCCESS") {
			localStorage.setItem(
				"stock-managment-system-auth-token",
				response?.jwtToken,
			);

			localStorage.setItem(
				"stock-managment-system-refresh-token",
				response?.refreshToken,
			);

			localStorage.setItem(
				"userDataObject",
				JSON.stringify(response?.userData),
			);
		}
		setLoading(false);
	};

	const handlePassword = () => {};

	return (
		<div className="sign-in__wrapper bg-black">
			{/* Overlay */}
			<div className="sign-in__backdrop"></div>
			{/* Form */}
			<Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
				{/* Header */}

				<div className="h4 mb-2 text-center">Reset Password</div>
				{/* ALert */}
				{show == "" ? (
					<></>
				) : show == "SUCCESS" ? (
					<Alert
						className="mb-2"
						variant="success"
						onClose={() => setShow(false)}
						dismissible
					>
						{message}
					</Alert>
				) : (
					<Alert
						className="mb-2"
						variant="danger"
						onClose={() => setShow(false)}
						dismissible
					>
						{message}
					</Alert>
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
				<Form.Group className="mb-2" controlId="new_password">
					<Form.Label>New Password</Form.Label>
					<Form.Control
						type="password"
						value={inputPassword}
						placeholder="Password"
						onChange={(e) => setInputPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-2" controlId="confirm_password">
					<Form.Label>Confrm New Password</Form.Label>
					<Form.Control
						type="password"
						value={inputConfirmPassword}
						placeholder="Password"
						onChange={(e) => setInputConfirmPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<div className="d-grid justify-content-end pb-3">
					<Button
						className="text-muted px-0"
						variant="link"
						onClick={() => {
							Navigate("/login");
						}}
					>
						Back to Login
					</Button>
				</div>

				{!loading ? (
					<Button className="w-100" variant="primary" type="submit">
						Reset Password
					</Button>
				) : (
					<Button className="w-100" variant="primary" type="submit" disabled>
						Reset Password Pending...
					</Button>
				)}
			</Form>
			{/* Footer */}
			<div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
				Stock Management System | &copy; {new Date().getFullYear()}
			</div>
		</div>
	);
};

export default ResetPassword;
