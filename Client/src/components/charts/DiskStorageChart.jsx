import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

function DiskStorageChart() {

	const chartData = [
		{
			id: 1,
			name: "Photos",
			usage: 80000
		},
		{
			id: 2,
			name: "Videos",
			usage: 45677
		},
		{
			id: 3,
			name: "Database",
			usage: 78888
		},
		{
			id: 4,
			name: "Documents",
			usage: 90000
		},
		{
			id: 5,
			name: "Other Files",
			usage: 4300
		},

	];
	
	const [diskData, setdiskData] = useState({
		labels: chartData.map((data) => data.name),
		datasets: [
			{
				label: "usage",
				data: chartData.map((data) => data.usage),
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


	return (
		<div className="p-2 ps-4">
			<Pie
				options={{
					plugins: {
						title: {
							display: true,
							text: "Disk storage (MB)",
						},
					},
				}}
				width="280vw"
				height={"200vh"}
				data={diskData}
			/>
		</div>
	);
}

export default DiskStorageChart;
