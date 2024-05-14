import React, { useEffect, useState } from "react";
import BASEURL from "../../constants/apiBaseUrl";
import Swal from "sweetalert2";
import axios from "axios";
import WarehouseOperatorNavbar from "../../components/navbars/WarehouseOperatorNavbar";
import { useParams, useLocation } from "react-router-dom";

export default function EditPurchase() {
	const params = useParams();
	const locationHook = useLocation();

	const [formValues, setFormValues] = useState({
		supplier_id: locationHook.state.supplier_id,
		product_id: locationHook.state.product_id,
		purchase_date: locationHook.state.purchase_date,
		quantity: locationHook.state.purchase_date,
		unit_price: locationHook.state.unit_price,
	});

	const [purchaseImage, setPurchaseImage] = useState(null);
	const [products, setProducts] = useState([]);
	const [suppliers, setSuppliers] = useState([]);

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
		let data = await axios.post(BASEURL + "/suppliers/getallsuppliers", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setSuppliers(response?.data == undefined ? [] : response?.data);
	};

	useEffect(() => {
		getProducts();
		getSuppliers();
	}, []);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setPurchaseImage(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { supplier_id, product_id, purchase_date, quantity, unit_price } =
			formValues;

		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;

		try {
			const formData = new FormData();
			formData.append("jwt_key", jwt_key);
			formData.append("username", username);
			formData.append("purchase_id", params.purchase_id);
			formData.append("supplier_id", supplier_id);
			formData.append("product_id", product_id);
			formData.append("unit_price", unit_price);
			formData.append("purchase_date", purchase_date);
			formData.append("quantity", quantity);
			formData.append("purchase_proof_image", purchaseImage);

			axios
				.post(BASEURL + "/purchases/editpurchase", formData)
				.then(async (response) => {
					const data = await response?.data;

					if (data.status == "SUCCESS") {
						Swal.fire({
							title: "Edited Purchase successfully!",
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
					<h3>Add New Purchase</h3>
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
						<label className="text-white form-label" htmlFor="purchase_date">
							Purchase Date
						</label>
						<input
							required
							type="date"
							id="purchase_date"
							className="form-control"
							value={formValues.purchase_date}
							onChange={(e) =>
								setFormValues({
									...formValues,
									purchase_date: e.target.value,
								})
							}
						/>
					</div>

					<div className="form-outline mb-3">
						<label className="text-white form-label" htmlFor="sale_proof">
							Purchase Proof Document (optional)
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
							<label className="text-white form-label" htmlFor="supplier_id">
								Supplier
							</label>
							<select
								required
								id="supplier_id"
								className="form-select"
								value={formValues.supplier_id}
								onChange={(e) =>
									setFormValues({
										...formValues,
										supplier_id: e.target.value,
									})
								}
							>
								<option value="">Select supplier</option>
								{suppliers.map((supplier) => (
									<option
										key={supplier.supplier_id}
										value={supplier.supplier_id}
									>
										{supplier.supplier_name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="d-flex justify-content-center p-4">
						<button type="submit" className="btn btn-info">
							Add Purchase Record
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
