import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../constants/apiBaseUrl";
import axios from "axios";
import IMAGESBASEURL from "../../constants/imagesBaseUrl";
import WarehouseOperatorNavbar from "../../components/WarehouseOperatorNavbar";

export default function Products() {
	const Navigate = useNavigate();
	const [Products, setProducts] = useState([]);

	const delete_product = async (productId) => {
		const msg = "Are you sure you want to delete this Product Category?";
		const txt = "This action is irreversible";
		const result = await Swal.fire({
			title: msg,
			text: txt,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		});

		if (result.isConfirmed) {
			const userData = JSON.parse(localStorage.getItem("userDataObject"));
			const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
			const username = userData?.username;
			const reqData = {
				username,
				jwt_key,
				productId,
			};
			let data = await axios.delete(BASEURL + "/product/deleteproduct", {
				data: reqData,
			});
			const response = data?.data;
			console.log(response);

			if (response.status === "SUCCESS") {
				Swal.fire({
					title: "Deleted Product with ID " + productId + " Successfully",
					timer: 3000,
					icon: "success",
				}).then(() => {
					location.reload();
				});
			} else {
				Swal.fire({
					title: "Error deleting product. Try later",
					timer: 3000,
					icon: "error",
				}).then(() => {
					location.reload();
				});
			}
		}
	};

	const func = async () => {
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
	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex">
			<WarehouseOperatorNavbar />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center p-1">
					<h1 className="fw-light">
						{Products.length < 1
							? "No products found in any warehouse"
							: "Current products in all warehouses"}
					</h1>
				</div>
				<div className="d-flex justify-content-center p-4">
					<button
						className="btn btn-primary fw-bold"
						onClick={() => {
							Navigate("/admin/pages/product-categories/new");
						}}
					>
						+ Add New Product
					</button>
				</div>

				<div className="container-fluid mt-1">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{Products.map((Product) => (
							<div className="col" key={Product.product_id}>
								<div
									className="card h-100 text-white p-2 bg-dark"
									style={{
										backgroundImage: `url(${IMAGESBASEURL}/${
											Product.product_image_name || "none"
										})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
									}}
								>
									<div className="card-body">
										<h5 className="card-title">{Product.product_name}</h5>
										<p className="card-text">{Product.product_description}</p>
										<button
											className="btn btn-warning me-2"
											onClick={() => {
												Navigate(
													"/admin/pages/product-categories/edit/" +
														Product.product_id,
													{
														state: { ...Product },
													},
												);
											}}
										>
											Edit
										</button>
										<button
											className="btn btn-danger"
											onClick={() => {
												delete_product(Product.product_id);
											}}
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
