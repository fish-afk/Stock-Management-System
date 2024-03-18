import React from "react";
import AdminNavbar from "../../components/AdminNavbar";

export default function Customers() {
	return (
		<div className="d-flex">
			<AdminNavbar priv={"admin"} />
			<h1>Customers</h1>
		</div>
	);
}
