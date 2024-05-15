import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../../css/auth.css";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.webp";

const Login = () => {
	const [inputUsername, setInputUsername] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const Navigate = useNavigate();

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

			response?.userData?.role_id == 1
				? Navigate("/admin/dashboard")
				: response?.userData.role_id == 2
				? Navigate("/warehouse-operator/dashboard")
				: Navigate("/stakeholder/dashboard");
		}

		setLoading(false);
	};

	return (
		<div className="sign-in__wrapper bg-dark">
			{/* Overlay */}
			<div className="sign-in__backdrop"></div>
			{/* Form */}

			<Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
				{/* Header */}
				{/* Header */}
				<img
					className="img-thumbnail mx-auto d-block mb-2"
					src={Logo}
					alt="logo"
				/>
				<div className="h4 mb-2 text-center">Sign In</div>
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
						className="border-dark" 
						value={inputUsername}
						placeholder="Enter Username"
						onChange={(e) => setInputUsername(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-2" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						className="border-dark"
						value={inputPassword}
						placeholder="Enter Password"
						onChange={(e) => setInputPassword(e.target.value)}
						required
					/>
				</Form.Group>

				<div className="d-grid justify-content-end pb-3">
					<Button
						className="text-muted px-0"
						variant="link"
						onClick={() => {
							Navigate("/reset-password");
						}}
					>
						Forgot password?
					</Button>
				</div>

				{!loading ? (
					<Button className="w-100" variant="primary" type="submit">
						Log In
					</Button>
				) : (
					<Button className="w-100" variant="primary" type="submit" disabled>
						Logging In...
					</Button>
				)}
			</Form>
			{/* Footer */}
			<div className="w-100 p-4 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
				Stock Management System | &copy; {new Date().getFullYear()}
			</div>
		</div>
	);
};

export default Login;
