import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import axios from "axios";

export default function AddNewSystemUser() {
	const [formValues, setFormValues] = useState({});
	const roleOptions = ["Admin", "Warehouse Operator", "StakeHolder"];

	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			newUserUsername,
			password,
			email,
			firstName,
			lastName,
			confirm_password,
			role = "Warehouse Operator",
		} = formValues;

		if (password !== confirm_password) {
			Swal.fire({
				title: "Passwords dont match",
				timer: 3000,
				icon: "error",
			});
			return;
		}

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		try {

			const roleId = role == "Admin" ? 1 : role == 'Warehouse Operator' ? 2 : 3;
 			let response = await axios.post(BASEURL + "/users/register", {
				jwt_key,
				username,
				newUserUsername,
				firstName,
				lastName,
				password,
				roleId,
				email,
			});

			const data = await response?.data;
			if (data.status == "SUCCESS") {
				Swal.fire({
					title: "User registered successfully",
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
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="d-flex " style={{ height: "100vh" }}>
			<AdminNavbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h3>Add new user</h3>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-1">
						<label className="text-white form-label" htmlFor="form6Example1">
							Username
						</label>
						<input
							required
							type="text"
							id="form6Example1"
							className="form-control"
							value={formValues.newUserUsername}
							onChange={(e) =>
								setFormValues({
									...formValues,
									newUserUsername: e.target.value,
								})
							}
						/>
					</div>

					<div className="row mb-1">
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
									value={formValues.firstName}
									onChange={(e) =>
										setFormValues({
											...formValues,
											firstName: e.target.value,
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
									value={formValues.lastName}
									onChange={(e) =>
										setFormValues({
											...formValues,
											lastName: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="form-outline mb-1">
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

					<div className="form-outline mb-1">
						<label className="text-white form-label" htmlFor="roleDropdown">
							Role
						</label>
						<select
							id="roleDropdown"
							className="form-select"
							value={formValues.role}
							onChange={(e) =>
								setFormValues({
									...formValues,
									role: e.target.value,
								})
							}
						>
							{roleOptions.map((role) => (
								<option key={role} value={role}>
									{role}
								</option>
							))}
						</select>
					</div>

					<div className="row mb-1">
						<div className="col">
							<div className="form-outline">
								<label
									className="text-white form-label"
									htmlFor="form6Example1"
								>
									Password
								</label>
								<input
									required
									type="password"
									minLength={8}
									id="form6Example1"
									className="form-control"
									value={formValues.password}
									onChange={(e) =>
										setFormValues({
											...formValues,
											password: e.target.value,
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
									Confirm Password
								</label>
								<input
									required
									type="password"
									minLength={8}
									id="form6Example2"
									className="form-control"
									value={formValues.confirm_password}
									onChange={(e) =>
										setFormValues({
											...formValues,
											confirm_password: e.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button className="btn btn-info" onClick={(e) => handleSubmit}>
							Add User
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
