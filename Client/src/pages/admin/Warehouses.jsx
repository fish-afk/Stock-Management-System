import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASEURL from "../../constants/apiBaseUrl";
import IMAGESBASEURL from "../../constants/imagesBaseUrl";
import { useNavigate } from "react-router-dom";

export default function Warehouses() {
	const [warehouses, setWarehouses] = useState([]);
	const Navigate = useNavigate()
	const func = async () => {
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
		func();
	}, []);

	const delete_warehouse = async (warehouseId) => {
		const msg = "Are you sure you want to delete this warehouse?";
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
				warehouseId,
			};
			let data = await axios.delete(
				BASEURL + "/warehouses/deletewarehouse",
				{
					data: reqData,
				},
			);
			const response = data?.data;
			console.log(response);

			if (response.status === "SUCCESS") {
				Swal.fire({
					title: "Deleted warehouse with ID " + warehouseId + " Successfully",
					timer: 3000,
					icon: "success",
				}).then(() => {
					location.reload();
				});
			} else {
				Swal.fire({
					title: "Error deleting warehouse. Try later",
					timer: 3000,
					icon: "error",
				}).then(() => {
					location.reload();
				});
			}
		}
	};

	return (
		<div className="d-flex">
			<AdminNavbar priv={"admin"} />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center p-1">
					<h1 className="fw-light">Warehouses</h1>
				</div>
				<div className="d-flex justify-content-center p-4">
					<button
						className="btn btn-primary fw-bold"
						onClick={() => {
							Navigate("/admin/pages/warehouses/new");
						}}
					>
						+ Add New Warehouse
					</button>
				</div>

				<div className="container-fluid mt-1">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-5">
						{warehouses.map((warehouse) => (
							<div className="col" key={warehouse.warehouse_id}>
								<div
									className="card h-100 text-white p-3 bg-dark"
									style={{
										backgroundImage: `url(${IMAGESBASEURL}/${
											warehouse.image_name || "none"
										})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat",
									}}
								>
									<div className="card-body">
										<h5 className="card-title">{warehouse.warehouse_name}</h5>
										<p className="card-text">
											{warehouse.warehouse_description}
										</p>
										<button
											className="btn btn-warning me-2"
											onClick={() => {
												Navigate(
													"/admin/pages/warehouses/edit/" +
														warehouse.warehouse_id,
													{
														state: { ...warehouse },
													},
												);
											}}
										>
											Edit
										</button>
										<button
											className="btn btn-danger me-2"
											onClick={() => {
												delete_warehouse(warehouse.warehouse_id);
											}}
										>
											Remove
										</button>
										<button
											className="btn btn-info"
											onClick={() => {
												
											}}
										>
											Inspect
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
