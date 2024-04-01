import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import SuppliersTable from "../../components/SuppliersTable";
import { useNavigate } from "react-router-dom";

export default function Suppliers() {
	const [Suppliers, setSuppliers] = useState([]);

	const Navigate = useNavigate();
	const func = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/suppliers/getallSuppliers", {
			username,
			jwt_key,
		});
		const response = data?.data;

		setSuppliers(response?.data == undefined ? [] : response?.data);
	};
	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex">
			<AdminNavbar priv={"admin"} />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center p-3">
					<h1 className="fw-light">System Suppliers list</h1>
				</div>

				<div className="d-flex justify-content-end">
					<button
						className="btn btn-primary me-5 ms-5 mb-2"
						onClick={() => {
							Navigate("/admin/pages/suppliers/new");
						}}
					>
						<b>+</b> Add New Supplier
					</button>
				</div>

				<SuppliersTable Suppliers={Suppliers} />
			</div>
		</div>
	);
}
