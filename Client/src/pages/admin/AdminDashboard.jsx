import React, { useEffect } from "react";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import LineChart from "../../components/charts/SystemUsageChart";
import { useState } from "react";

const AdminDashboard = () => {
	const Data = [
		{
			id: 1,
			year: 2016,
			userGain: 80000,
			userLost: 823,
		},
		{
			id: 2,
			year: 2017,
			userGain: 45677,
			userLost: 345,
		},
		{
			id: 3,
			year: 2018,
			userGain: 78888,
			userLost: 555,
		},
		{
			id: 4,
			year: 2019,
			userGain: 90000,
			userLost: 4555,
		},
		{
			id: 5,
			year: 2020,
			userGain: 4300,
			userLost: 234,
		},
	];
	const [chartData, setChartData] = useState({
		labels: Data.map((data) => data.year),
		datasets: [
			{
				label: "Users Gained ",
				data: Data.map((data) => data.userGain),
				backgroundColor: [
					"rgba(75,192,192,1)",
					"#ecf0f1",
					"#50AF95",
					"#f3ba2f",
					"#2a71d0",
				],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	});

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

	return (
		<div className="d-flex">
			<AdminNavbar />
			<div className="text-end">
				<div className="d-flex text-end">
					<h5 className="p-4">{getDate()}</h5>
					<h5 className="p-4">Admin</h5>
				</div>

				<LineChart chartData={chartData} />

				<div className="text-start p-3">
					<h4 className="text-primary">
						<em>Quick shortcuts</em>
					</h4>
					<div>
						<button className="btn btn-primary me-4 ps-4 pe-4">Add user</button>
						<button className="btn btn-primary m-4 ps-4 pe-4">
							Add customer
						</button>
						<button className="btn btn-primary m-4 ps-4 pe-4">
							Add supplier
						</button>
						<button className="btn btn-primary m-4 ps-4 pe-4">
							Add product category
						</button>
						<button className="btn btn-primary m-4 ps-4 pe-4">
							Add warehouse
						</button>
						<button className="btn btn-primary m-4 ps-4 pe-4">
							Export system Data as CSV
						</button>
					</div>
				</div>

				<div className="text-start p-3 pt-1">
					<h4 className="text-danger">
						<em>Danger Zone</em>
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
