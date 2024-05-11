import React from "react";
import WarehouseOperatorNavbar from "../../components/navbars/WarehouseOperatorNavbar";

export default function WarehouseOperatorDashboard() {
	return (
		<div className="d-flex">
			<WarehouseOperatorNavbar priv={"WarehouseOperator"} />
			<h1>WarehouseOperatorDashboard</h1>
		</div>
	);
}
