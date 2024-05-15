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
			<div className="text-primary">
				<h3>To reset your password please contact the system adminitrator for this website.</h3>
			</div>
			{/* Footer */}
			<div className="w-100 p-4 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
				Stock Management System | &copy; {new Date().getFullYear()}
			</div>
		</div>
	);
};

export default ResetPassword;
