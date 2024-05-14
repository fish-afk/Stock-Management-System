import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import IMAGESBASEURL from "../../constants/imagesBaseUrl";
import WarehouseOperatorNavbar from "../../components/navbars/WarehouseOperatorNavbar";
import { useNavigate } from "react-router-dom";

export default function WarehousesWh() {
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

	return (
		<div className="d-flex">
			<WarehouseOperatorNavbar />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center mt-2 mb-5 p-1">
					<h1 className="fw-light">Warehouses</h1>
				</div>

				<div className="container-fluid mt-1 ">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-5">
						{warehouses.map((warehouse) => (
							<div
								className="col item-cardss-parent"
								key={warehouse.warehouse_id}
							>
								<div
									className="card h-100 text-white p-3 bg-dark"
									style={{
										position: "relative", // Added position relative
										overflow: "hidden", // Ensures the overlay doesn't overflow the card
									}}
								>
									<div
										className="item-cardss"
										style={{
											backgroundImage: `url(${IMAGESBASEURL}/warehouses/${
												warehouse.image_name || "none"
											})`,
											backgroundBlendMode: "darken",
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
											position: "absolute",
											top: 0,
											left: 0,
											width: "100%",
											height: "100%",
											zIndex: 1, // Ensures the overlay is below the content
											filter: "brightness(0.35)", // Adjust brightness
										}}
									></div>
									<div
										className="card-body"
										style={{ position: "relative", zIndex: 2 }} // Ensures content is above the overlay
									>
										<h5 className="card-title">{warehouse.warehouse_name}</h5>
										<p className="card-text pt-3">
											{warehouse.warehouse_description}
										</p>
										<p className="card-text">
											Location: {warehouse.warehouse_location}
										</p>
										<p className="card-text">
											Storage Capacity: {warehouse.max_storage_capacity} MT
										</p>
										<button
											className="btn btn-info"
											onClick={() => {
												Navigate(
													"/admin/pages/warehouses/inspect/" +
														warehouse.warehouse_id,
													{
														state: { ...warehouse },
													},
												);
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
