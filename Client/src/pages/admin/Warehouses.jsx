import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function Warehouses() {
	return (
		<div className="d-flex">
			<AdminNavbar priv={"admin"} />
			<h1>Warehouses</h1>
		</div>
	);
}
