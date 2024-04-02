import React, { useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";


const AdminDashboard = () => {
	return (
		<div className="d-flex">
			<AdminNavbar />
			<h1>Welcome Admin</h1>
		</div>
	);
};

export default AdminDashboard;
