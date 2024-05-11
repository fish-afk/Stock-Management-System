import React from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import WarehouseOperatorNavbar from "../../components/navbars/WarehouseOperatorNavbar";
import StakeHolderNavbar from "../../components/navbars/StakeHolderNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function ChangePassword() {
	const [formValues, setFormValues] = useState({});
	const params = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { currentpass, newpass, confirmnewpass } = formValues;

		if (newpass !== confirmnewpass) {
			Swal.fire({
				title: "New Passwords dont match",
				timer: 3000,
				icon: "error",
			});
			return;
		}

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		let data = await axios.patch(BASEURL + "/users/changepassword", {
			jwt_key,
			username,
			currentpass,
			newpass,
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
				<AdminNavbar priv="admin" />
			) : params.privs == "wh" ? (
				<WarehouseOperatorNavbar />
			) : (
				<StakeholderNavbar />
			)}
			<div className="container">
				<div className="d-flex justify-content-center p-4">
					<h1>Change Your Password</h1>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example5">
							Current Password
						</label>
						<input
							required
							type="currentpass"
							id="form6Example5"
							className="form-control"
							value={formValues.currentpass}
							onChange={(e) =>
								setFormValues({
									...formValues,
									currentpass: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example1">
							New Password
						</label>
						<input
							required
							type="text"
							id="form6Example2"
							className="form-control"
							value={formValues.newpass}
							onChange={(e) =>
								setFormValues({
									...formValues,
									newpass: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-4">
						<label className="text-white form-label" htmlFor="form6Example1">
							Confirm New Password
						</label>
						<input
							required
							type="text"
							id="form6Example2"
							className="form-control"
							value={formValues.confirmnewpass}
							onChange={(e) =>
								setFormValues({
									...formValues,
									confirmnewpass: e.target.value,
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
