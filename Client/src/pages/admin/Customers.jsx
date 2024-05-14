import React, { useState } from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import { useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import CustomersTable from "../../components/tables/CustomersTable";
import { useNavigate } from "react-router-dom";

export default function Customers() {
	const [Customers, setCustomers] = useState([]);

	const Navigate = useNavigate();
	const func = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/customers/getallcustomers", {
			username,
			jwt_key,
		});
		const response = data?.data;

		setCustomers(response?.data == undefined ? [] : response?.data);
	};
	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex">
			<AdminNavbar />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center p-3">
					<h1 className="fw-light">Customers list</h1>
				</div>

				<div className="d-flex justify-content-end">
					<button
						className="btn btn-primary me-5 ms-5 mb-2"
						onClick={() => {
							Navigate("/admin/pages/customers/new");
						}}
					>
						<b>+</b> Add New Customer
					</button>
				</div>

				<CustomersTable customers={Customers} />
			</div>
		</div>
	);
}
