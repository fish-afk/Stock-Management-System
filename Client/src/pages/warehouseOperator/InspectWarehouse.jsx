import React from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import { useParams, useLocation } from "react-router-dom";
import WarehouseComposition from "../../components/charts/WarehouseCompositionChart";

export default function InspectWarehouseWh() {
	const params = useParams();
	const locationHook = useLocation();

	return (
		<div className="d-flex">
			<AdminNavbar />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center p-1">
					<h1 className="fw-light">{locationHook.state.warehouse_name}</h1>
				</div>
				<div className="d-flex justify-content-center">
					<WarehouseComposition
						warehouse_id={params.warehouse_id}
						sizeH={"500vh"}
						sizeW={"650vw"}
					/>
				</div>
			</div>
		</div>
	);
}
