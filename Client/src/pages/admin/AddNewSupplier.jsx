import React, { useState } from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddNewSupplier() {
	const [formValues, setFormValues] = useState({
		supplier_name: "",
		email: "",
		phone: "",
	});

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setCategoryImage(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { supplier_name, email, phone } = formValues;

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		try {
			axios
				.post(BASEURL + "/suppliers/addnewsupplier", {
					jwt_key,
					username,
					supplier_name,
					email,
					phone,
				})
				.then(async (response) => {
					const data = await response?.data;

					if (data.status == "SUCCESS") {
						Swal.fire({
							title: "Added New supplier successfully!",
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
			<AdminNavbar />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h3>Add New Supplier</h3>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="supplier_name">
							supplier Name
						</label>
						<input
							required
							type="text"
							id="supplier_name"
							className="form-control"
							value={formValues.supplier_name}
							onChange={(e) =>
								setFormValues({
									...formValues,
									supplier_name: e.target.value,
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
							Add Supplier
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
