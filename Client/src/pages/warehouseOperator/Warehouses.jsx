import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";
import IMAGESBASEURL from "../../constants/imagesBaseUrl";
import WarehouseOperatorNavbar from "../../components/WarehouseOperatorNavbar";

export default function WarehousesWh() {
	const [warehouses, setWarehouses] = useState([]);
    
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
			<WarehouseOperatorNavbar priv={"admin"} />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center mt-2 mb-5 p-1">
					<h1 className="fw-light">Warehouses</h1>
				</div>
				

				<div className="container-fluid mt-1">
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-5">
						{warehouses.map((warehouse) => (
							<div className="col" key={warehouse.warehouse_id}>
								<div
									className="card h-100 text-white p-3 bg-dark"
									style={{
										backgroundImage: `url(${IMAGESBASEURL}/warehouses/${
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
										
										<button className="btn btn-info" onClick={() => {}}>
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
