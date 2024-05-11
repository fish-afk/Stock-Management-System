import React, { useEffect } from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import MemoryUsageChart from "../../components/charts/MemoryUsageChart";
import DiskStorageChart from "../../components/charts/DiskStorageChart";
import CrashesChart from "../../components/charts/CrashesChart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const AdminDashboard = () => {

	
	const getDate = () => {
		const today = new Date();
		const day = today.getDate();
		const month = today.toLocaleString("default", { month: "long" });
		const year = today.getFullYear();

		const daySuffix = (day) => {
			if (day > 3 && day < 21) return "th";
			switch (day % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		};

		const formattedDate = `${day}${daySuffix(day)} ${month} ${year}`;

		return formattedDate;
	};

	const username = JSON.stringify(
		JSON.parse(localStorage.getItem("userDataObject")).username,
	).replaceAll('"', "");

	return (
		<div className="d-flex">
			<AdminNavbar />

			<div className="text-end">
				<div className="d-flex justify-content-between align-items-center">
					<div className="text-start">
						<h5 className="p-3">
							<em>{getDate()}</em>
						</h5>
					</div>
					<div>
						
						<h5 className="p-3 text-end">
							
							<FaRegUserCircle className="me-2" size={20}/>
							<em>{username} : Admin</em>
						</h5>
					</div>
				</div>

				<div className="text-start p-3 pt-2">
					<h4 className="text-primary">
						<em>System stats 📈</em>
					</h4>

					<div className="d-flex p-3">
						<MemoryUsageChart />
						<DiskStorageChart />
						<CrashesChart />
					</div>
				</div>
				<div className="text-start p-3">
					<h4 className="text-primary">
						<em>Quick shortcuts 🔗</em>
					</h4>
					<div>
						<Link
							to="/admin/pages/system-users/new"
							className="btn btn-primary me-4 ps-4 pe-4"
						>
							Add user
						</Link>
						<Link
							to="/admin/pages/customers/new"
							className="btn btn-primary m-4 ps-4 pe-4"
						>
							Add customer
						</Link>
						<Link
							to="/admin/pages/suppliers/new"
							className="btn btn-primary m-4 ps-4 pe-4"
						>
							Add supplier
						</Link>
						<Link
							to="/admin/pages/product-categories/new"
							className="btn btn-primary m-4 ps-4 pe-4"
						>
							Add product category
						</Link>
						<Link
							to="/admin/pages/warehouses/new"
							className="btn btn-primary m-4 ps-4 pe-4"
						>
							Add warehouse
						</Link>
						<button className="btn btn-primary m-4 ps-4 pe-4">
							Export system Data as CSV
						</button>
					</div>
				</div>

				<div className="text-start p-3 pt-1">
					<h4 className="text-danger">
						<em>Danger Zone ⚠️</em>
					</h4>
					<div>
						<button className="btn btn-danger me-4 ps-4 pe-4">
							Reset Database
						</button>
						<button className="btn btn-danger m-4 ps-4 pe-4">
							Delete All Users
						</button>
						<button className="btn btn-danger m-4 ps-4 pe-4">
							Delete All Sales
						</button>
						<button className="btn btn-danger m-4 ps-4 pe-4">
							Delete All Purchases
						</button>
						<button className="btn btn-danger m-4 ps-4 pe-4">
							Delete All Suppliers and Customers
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
