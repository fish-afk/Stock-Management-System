import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import SystemUserTable from "../../components/SystemUsersTable";
import { useNavigate } from "react-router-dom";

export default function SystemUsers() {
	const [Users, setUsers] = useState([]);

	const Navigate = useNavigate();
	const func = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/users/getallusers", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setUsers(response?.data);
	};
	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex">
			<AdminNavbar priv={"admin"} />
			<div className="container">
				<div className="title text-center p-3">
					<h1 className="fw-light">System Users list</h1>
				</div>

				<div className="d-flex justify-content-end">
					<button
						className="btn btn-primary me-5 ms-5"
						onClick={() => {
							Navigate("/admin/newfreelancer");
						}}
					>
						<b>+</b> Add New User
					</button>
				</div>

				<SystemUserTable users={Users} />
			</div>
		</div>
	);
}
