import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function Suppliers() {
	return (
		<div className="d-flex">
			<AdminNavbar priv={"admin"} />
			<h1>Suppliers</h1>
		</div>
	);
}
