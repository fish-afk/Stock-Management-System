import React, { useEffect, useState } from "react";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import WarehouseOperatorNavbar from "../../components/navbars/WarehouseOperatorNavbar";
import { useParams, useLocation } from "react-router-dom";

export default function EditProduct() {
	const params = useParams();
	const locationHook = useLocation();

	const [formValues, setFormValues] = useState({
		product_name: locationHook.state.product_name,
		description: locationHook.state.description,
		unit_price: locationHook.state.unit_price,
		quantity_in_stock: locationHook.state.quantity_in_stock,
		category_id: locationHook.state.category_id,
		warehouse_id: locationHook.state.warehouse_id,
	});

	const [productImage, setProductImage] = useState(null);
	const [categories, setCategories] = useState([]);
	const [warehouses, setWarehouses] = useState([]);

	const getCategories = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(
			BASEURL + "/productcategories/getallproductcategories",
			{
				username,
				jwt_key,
			},
		);
		const response = data?.data;
		console.log(response);

		setCategories(response?.data == undefined ? [] : response?.data);
	};

	const getWarehouses = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/warehouses/getallwarehouses", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setWarehouses(response?.data == undefined ? [] : response?.data);
	};

	useEffect(() => {
		getCategories();
		getWarehouses();
	}, []);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setProductImage(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			product_name,
			description,
			unit_price,
			quantity_in_stock,
			category_id,
			warehouse_id,
		} = formValues;

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		try {
			const formData = new FormData();
			formData.append("jwt_key", jwt_key);
			formData.append("username", username);
			formData.append("product_name", product_name);
			formData.append("description", description);
			formData.append("product_image", productImage);
			formData.append("unit_price", unit_price);
			formData.append("quantity_in_stock", quantity_in_stock);
			formData.append("category_id", category_id);
			formData.append("warehouse_id", warehouse_id);
			formData.append("product_id", params.product_id);

			axios
				.post(BASEURL + "/products/editproduct", formData)
				.then(async (response) => {
					const data = await response?.data;

					if (data.status == "SUCCESS") {
						Swal.fire({
							title: "Edited Product successfully!",
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
			<WarehouseOperatorNavbar priv="admin" />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h3>Add New Product</h3>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="product_name">
							Product Name
						</label>
						<input
							required
							type="text"
							id="product_name"
							className="form-control"
							value={formValues.product_name}
							onChange={(e) =>
								setFormValues({
									...formValues,
									product_name: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="description">
							Product Description
						</label>
						<input
							required
							type="text"
							id="description"
							className="form-control"
							value={formValues.description}
							onChange={(e) =>
								setFormValues({
									...formValues,
									description: e.target.value,
								})
							}
						/>
					</div>

					<div className="row mb-1">
						<div className="form-outline mb-3 col">
							<label className="text-white form-label" htmlFor="unit_price">
								Unit Price (K)
							</label>
							<input
								required
								type="number"
								id="unit_price"
								className="form-control"
								value={formValues.unit_price}
								onChange={(e) =>
									setFormValues({
										...formValues,
										unit_price: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-outline mb-3 col">
							<label
								className="text-white form-label"
								htmlFor="quantity_in_stock"
							>
								Quantity available (Default 0)
							</label>
							<input
								required
								type="number"
								id="quantity_in_stock"
								className="form-control"
								value={formValues.quantity_in_stock}
								onChange={(e) =>
									setFormValues({
										...formValues,
										quantity_in_stock: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="product_image">
							Product Image
						</label>
						<input
							accept="image/jpeg,image/png,image/jpg,image/bmp,image/webp"
							type="file"
							id="product_image"
							className="form-control"
							onChange={handleFileChange}
						/>
					</div>

					<div className="row mb-1">
						<div className="form-outline mb-3 col">
							<label className="text-white form-label" htmlFor="category_id">
								Product Category
							</label>
							<select
								required
								id="category_id"
								className="form-select"
								value={formValues.category_id}
								onChange={(e) =>
									setFormValues({
										...formValues,
										category_id: e.target.value,
									})
								}
							>
								<option value="">Select category</option>
								{categories.map((category) => (
									<option
										key={category.category_id}
										value={category.category_id}
									>
										{category.category_name}
									</option>
								))}
							</select>
						</div>

						<div className="form-outline mb-5 col">
							<label className="text-white form-label" htmlFor="warehouse_id">
								Warehouse
							</label>
							<select
								required
								id="warehouse_id"
								className="form-select"
								value={formValues.warehouse_id}
								onChange={(e) =>
									setFormValues({
										...formValues,
										warehouse_id: e.target.value,
									})
								}
							>
								<option value="">Select warehouse</option>
								{warehouses.map((warehouse) => (
									<option
										key={warehouse.warehouse_id}
										value={warehouse.warehouse_id}
									>
										{warehouse.warehouse_name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button type="submit" className="btn btn-info">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
