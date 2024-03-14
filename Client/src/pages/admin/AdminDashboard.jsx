import React, { useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const AdminDashboard = () => {
	return (
		<div className="d-flex">
			<AdminNavbar priv={"admin"} />
			<h1>Welcome </h1>
		</div>
	);
};

export default AdminDashboard;
