import React, { useState } from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

export default function EditCustomer() {
	const params = useParams();
	const locationHook = useLocation();
	const [formValues, setFormValues] = useState({
		customer_name: locationHook.state.customer_name,
		email: locationHook.state.email,
		phone: locationHook.state.phone,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { customer_name, email, phone } = formValues;

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		try {
			axios
				.patch(BASEURL + "/customers/editCustomer", {
					jwt_key,
					username,
					customer_name,
					email,
					phone,
					customer_id: params.customer_id,
				})
				.then(async (response) => {
					const data = await response?.data;

					if (data.status == "SUCCESS") {
						Swal.fire({
							title: "Edited Customer successfully!",
							timer: 3000,
							icon: "success",
						}).then(() => {
							location.reload();
						});
					} else {
						Swal.fire({
							title: data.message,
							timer: 3000,
							icon: "error",
						}).then(() => {
							location.reload();
						});
					}
				})
				.catch((error) => {
					console.log(error);
					Swal.fire({
						title: "Unknown error occured !",
						timer: 30000,
						icon: "error",
					}).then(() => {
						location.reload();
					});
				});
		} catch (err) {
			Swal.fire({
				title: "Unknown error occured !",
				timer: 30000,
				icon: "error",
			}).then(() => {
				location.reload();
			});
			console.error(err);
		}
	};

	return (
		<div className="d-flex" style={{ height: "100vh" }}>
			<AdminNavbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h3>Edit Customer</h3>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="customer_name">
							Customer Name
						</label>
						<input
							required
							type="text"
							id="customer_name"
							className="form-control"
							value={formValues.customer_name}
							onChange={(e) =>
								setFormValues({
									...formValues,
									customer_name: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="email">
							Email
						</label>
						<input
							required
							type="text"
							id="email"
							className="form-control"
							value={formValues.email}
							onChange={(e) =>
								setFormValues({
									...formValues,
									email: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="phone">
							Phone
						</label>
						<input
							required
							type="text"
							id="phone"
							className="form-control"
							value={formValues.phone}
							onChange={(e) =>
								setFormValues({
									...formValues,
									phone: e.target.value,
								})
							}
						/>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button type="submit" className="btn btn-info">
							SAVE CHANGES
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
