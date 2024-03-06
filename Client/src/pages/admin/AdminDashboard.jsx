import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
	return (
		<div className="d-flex">
			<Navbar priv={'admin'}/>
			<h1>Admin Dashboard</h1>
		</div>
	);
};

export default AdminDashboard;
