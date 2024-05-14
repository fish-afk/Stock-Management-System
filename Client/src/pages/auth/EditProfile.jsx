import React from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import WarehouseOperatorNavbar from "../../components/navbars/WarehouseOperatorNavbar";
import StakeholderNavbar from "../../components/navbars/StakeHolderNavbar";

export default function EditProfile() {
	const [formValues, setFormValues] = useState({});
	const params = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email, first_name, last_name, phone } = formValues;

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		let data = await axios.patch(BASEURL + "/users/editprofile", {
			jwt_key,
			username,
			email,
			first_name,
			last_name,
			phone,
		});

		const response = data?.data;

		if (response.status === "SUCCESS") {
			Swal.fire({
				title: response.message,
				timer: 3000,
				icon: "success",
			}).then(() => {
				location.reload();
			});
		} else {
			Swal.fire({
				title: response.message,
				timer: 3000,
				icon: "error",
			}).then(() => {
				location.reload();
			});
		}
	};

	return (
		<div className="d-flex">
			{params.privs == "adm" ? (
				<AdminNavbar />
			) : params.privs == "wh" ? (
				<WarehouseOperatorNavbar />
			) : (
				<StakeholderNavbar />
			)}
			<div className="container">
				<div className="d-flex justify-content-center p-4">
					<h1>Update your details</h1>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="row mb-4">
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									First Name
								</label>
								<input
									required
									type="text"
									id="form6Example2"
									className="form-control"
									value={formValues.first_name}
									onChange={(e) =>
										setFormValues({
											...formValues,
											first_name: e.target.value,
										})
									}
								/>
							</div>
						</div>
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Last Name
								</label>
								<input
									required
									type="text"
									id="form6Example2"
									className="form-control"
									value={formValues.last_name}
									onChange={(e) =>
										setFormValues({
											...formValues,
											last_name: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Email
						</label>
						<input
							required
							type="email"
							id="form6Example5"
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

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example1">
							Phone
						</label>
						<input
							required
							type="text"
							id="form6Example2"
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
						<button className="btn btn-primary" onClick={(e) => handleSubmit}>
							SAVE
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
