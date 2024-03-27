import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../constants/apiBaseUrl";
import axios from "axios";

export default function ListRoles() {
	const Navigate = useNavigate();
	const [ProductCategories, setProductCategories] = useState([]);

	const delete_category = (Role_id) => {
		const msg = "Are you sure you want to remove this Role?";
		const txt = "This will un-link it from any freelancers its attached to !";
		Swal.fire({
			title: msg,
			text: txt,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const token = JSON.stringify(
					localStorage.getItem("taskedit-accesstoken"),
				).replaceAll('"', "");

				const username = JSON.stringify(
					localStorage.getItem("username"),
				).replaceAll('"', "");

				const response = await fetch(`${SERVER_URL}/roles/deleterole`, {
					headers: {
						"taskedit-accesstoken": token,
						username: username,
						isadmin: "true",
						"Content-Type": "application/json",
					},

					method: "DELETE",
					body: JSON.stringify({
						id: Role_id,
					}),
				});

				const data = await response.json();

				console.log(data);

				if (data.status == "SUCCESS") {
					Swal.fire({
						title: "Deleted Role with id: " + Role_id + " Successfully",
						timer: 3000,
						icon: "success",
					}).then(() => {
						location.reload();
					});
				} else {
					Swal.fire({
						title: "Error deleting Role. Try later",
						timer: 3000,
						icon: "error",
					}).then(() => {
						location.reload();
					});
				}
			}
		});
	};

	const func = async () => {
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

		setProductCategories(response?.data);
	};
	useEffect(() => {
		func();
	}, []);

	return (
		<div className="d-flex">
			<AdminNavbar />
			<div className="container">
				<div className="title text-center p-1">
					<h1 className="fw-light">Current Product Categories In The System</h1>
				</div>

				<div
					className="container-fluid mt-1 overflow-auto"
					style={{ maxHeight: "75vh" }}
				>
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
						{ProductCategories.map((ProductCategory) => (
							<div className="col" key={ProductCategory.category_id}>
								<div className="card h-100 bg-black text-white p-2">
									<div className="card-body">
										<h5 className="card-title">
											{ProductCategory.category_name}
										</h5>
										<p className="card-text">
											{ProductCategory.category_description}
										</p>
										<button
											className="btn btn-warning me-2"
											onClick={() => {
												Navigate("/admin/editrole", {
													state: { ...ProductCategory },
												});
											}}
										>
											Edit
										</button>
										<button
											className="btn btn-danger"
											onClick={() => {
												delete_category(ProductCategory.category_id);
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

				<div className="d-flex justify-content-center pt-4">
					<button
						className="btn btn-primary fw-bold"
						onClick={() => {
							Navigate("/admin/pages/product-categories/new");
						}}
					>
						+ Add New Product Category
					</button>
				</div>
			</div>
		</div>
	);
}
