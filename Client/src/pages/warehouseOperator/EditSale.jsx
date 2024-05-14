import React, { useEffect, useState } from "react";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import WarehouseOperatorNavbar from "../../components/navbars/WarehouseOperatorNavbar";
import { useParams, useLocation } from "react-router-dom";

export default function EditSale() {
	const params = useParams();
	const locationHook = useLocation();

	const [formValues, setFormValues] = useState({
		customer_id: locationHook.state.customer_id,
		product_id: locationHook.state.product_id,
		sale_date: locationHook.state.sale_date,
		quantity: locationHook.state.quantity,
		unit_price: locationHook.state.unit_price,
	});
	const [saleImage, setSaleImage] = useState(null);
	const [products, setProducts] = useState([]);
	const [customers, setCustomers] = useState([]);

	const getProducts = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/products/getallproducts", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setProducts(response?.data == undefined ? [] : response?.data);
	};

	const getSuppliers = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/customers/getallcustomers", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setCustomers(response?.data == undefined ? [] : response?.data);
	};

	useEffect(() => {
		getProducts();
		getSuppliers();
	}, []);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setSaleImage(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { customer_id, product_id, sale_date, quantity, unit_price } =
			formValues;

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		try {
			const formData = new FormData();
			formData.append("jwt_key", jwt_key);
			formData.append("username", username);
			formData.append("sale_id", params.sale_id);
			formData.append("customer_id", customer_id);
			formData.append("product_id", product_id);
			formData.append("unit_price", unit_price);
			formData.append("sale_date", sale_date);
			formData.append("quantity", quantity);
			formData.append("sale_proof_image", saleImage);

			axios
				.post(BASEURL + "/sales/editsale", formData)
				.then(async (response) => {
					const data = await response?.data;

					if (data.status == "SUCCESS") {
						Swal.fire({
							title: "Edited Sale successfully!",
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
							title:
								"Only Images, PDFs and DOCX files Allowed For document Field !",
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
			<WarehouseOperatorNavbar />
			<div className="container">
				<div className="d-flex justify-content-center p-2">
					<h3>Add New Sale</h3>
				</div>

				<form className="bg-dark p-5 rounded-3" onSubmit={handleSubmit}>
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
								Quantity (Default 1)
							</label>
							<input
								required
								type="number"
								id="quantity"
								className="form-control"
								value={formValues.quantity}
								onChange={(e) =>
									setFormValues({
										...formValues,
										quantity: e.target.value,
									})
								}
							/>
						</div>
					</div>

					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="sale_date">
							Sale Date
						</label>
						<input
							required
							type="date"
							id="sale_date"
							className="form-control"
							value={formValues.sale_date}
							onChange={(e) =>
								setFormValues({
									...formValues,
									sale_date: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="sale_proof">
							Sale Proof Document (optional)
						</label>
						<input
							accept="image/jpeg,image/png,image/jpg,image/bmp,image/webp,application/pdf,.docx"
							type="file"
							id="sale_proof"
							className="form-control"
							onChange={handleFileChange}
						/>
					</div>

					<div className="row mb-1">
						<div className="form-outline mb-3 col">
							<label className="text-white form-label" htmlFor="product_id">
								Product
							</label>
							<select
								required
								id="product_id"
								className="form-select"
								value={formValues.product_id}
								onChange={(e) =>
									setFormValues({
										...formValues,
										product_id: e.target.value,
									})
								}
							>
								<option value="">Select product</option>
								{products.map((product) => (
									<option key={product.product_id} value={product.product_id}>
										{product.product_name}
									</option>
								))}
							</select>
						</div>

						<div className="form-outline mb-5 col">
							<label className="text-white form-label" htmlFor="customer_id">
								Customer
							</label>
							<select
								required
								id="customer_id"
								className="form-select"
								value={formValues.customer_id}
								onChange={(e) =>
									setFormValues({
										...formValues,
										customer_id: e.target.value,
									})
								}
							>
								<option value="">Select customer</option>
								{customers.map((customer) => (
									<option
										key={customer.customer_id}
										value={customer.customer_id}
									>
										{customer.customer_name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button type="submit" className="btn btn-info">
							Add Sale Record
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
