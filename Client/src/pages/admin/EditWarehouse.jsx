import React, { useState } from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

export default function EditWarehouse() {
	const params = useParams();
	const locationHook = useLocation();

	const [formValues, setFormValues] = useState({
		warehouse_name: locationHook.state.warehouse_name,
		warehouse_description: locationHook.state.warehouse_description,
		warehouse_location: locationHook.state.warehouse_location,
		max_storage_capacity: locationHook.state.max_storage_capacity,
	});

	const [warehouseImage, setCategoryImage] = useState(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setCategoryImage(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			warehouse_name,
			warehouse_description,
			warehouse_location,
			max_storage_capacity,
		} = formValues;

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		try {
			const formData = new FormData();
			formData.append("jwt_key", jwt_key);
			formData.append("username", username);
			formData.append("warehouse_id", params.warehouse_id);
			formData.append("warehouse_name", warehouse_name);
			formData.append("warehouse_description", warehouse_description);
			formData.append("warehouse_location", warehouse_location);
			formData.append("max_storage_capacity", max_storage_capacity);
			formData.append("warehouse_image", warehouseImage);

			axios
				.post(BASEURL + "/warehouses/editwarehouse", formData)
				.then(async (response) => {
					const data = await response?.data;

					if (data.status == "SUCCESS") {
						Swal.fire({
							title: data.message,
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
					if (error.response.status >= 500) {
						Swal.fire({
							title: "Only Images Allowed For Image Field !",
							timer: 30000,
							icon: "error",
						}).then(() => {
							location.reload();
						});
					} else {
						Swal.fire({
							title: error.response.data.message,
							timer: 30000,
							icon: "error",
						}).then(() => {
							location.reload();
						});
					}
				});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="d-flex" style={{ height: "100vh" }}>
			<AdminNavbar />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h3>Add New Warehouse</h3>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="row">
						<div className="form-outline mb-3 col">
							<label className="text-white form-label" htmlFor="warehouse_name">
								Warehouse Name
							</label>
							<input
								required
								type="text"
								id="warehouse_name"
								className="form-control"
								value={formValues.warehouse_name}
								onChange={(e) =>
									setFormValues({
										...formValues,
										warehouse_name: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-outline mb-3 col">
							<label
								className="text-white form-label"
								htmlFor="warehouse_location"
							>
								Warehouse location
							</label>
							<input
								required
								type="text"
								id="warehouse_location"
								className="form-control"
								value={formValues.warehouse_location}
								onChange={(e) =>
									setFormValues({
										...formValues,
										warehouse_location: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="form-outline mb-3">
						<label
							className="text-white form-label"
							htmlFor="warehouse_description"
						>
							Warehouse Description
						</label>
						<input
							required
							type="text"
							id="warehouse_description"
							className="form-control"
							value={formValues.warehouse_description}
							onChange={(e) =>
								setFormValues({
									...formValues,
									warehouse_description: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-outline mb-3">
						<label
							className="text-white form-label"
							htmlFor="max_storage_capacity"
						>
							Maximum Storage Capacity (Metric Tons)
						</label>
						<input
							required
							type="number"
							id="max_storage_capacity"
							className="form-control"
							value={formValues.max_storage_capacity}
							onChange={(e) =>
								setFormValues({
									...formValues,
									max_storage_capacity: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-5">
						<label className="text-white form-label" htmlFor="warehouse_image">
							Warehouse Image
						</label>
						<input
							accept="image/jpeg,image/png,image/jpg,image/bmp,image/webp"
							type="file"
							id="warehouse_image"
							className="form-control"
							onChange={handleFileChange}
						/>
					</div>

					<div className="d-flex justify-content-center p-2">
						<button type="submit" className="btn btn-info">
							SAVE CHANGES
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
