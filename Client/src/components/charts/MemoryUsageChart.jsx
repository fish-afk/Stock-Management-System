import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

function MemoryUsageChart() {
	const UserData = [
		{
			id: 1,
			time: "20:00",
			usage: 8000
		},
		{
			id: 2,
			time: "21:00",
			usage: 4677
		},
		{
			id: 3,
			time: "22:00",
			usage: 7888
		},
		{
			id: 4,
			time: "23:00",
			usage: 9000
		},
		{
			id: 5,
			time: "00:00",
			usage: 4300
		},
	];

	const [userData, setUserData] = useState({
		labels: UserData.map((data) => data.time),
		datasets: [
			{
				label: "Memory Usage",
				data: UserData.map((data) => data.usage),
				backgroundColor: [
					"rgba(75,192,192,1)"
				],
				borderColor: "black",
				borderWidth: 2,
				textColor: 'black'
			},
		],
	});

	return (
		<div className="p-2">
			<Line
				options={{
					plugins: {
						title: {
							display: true,
							text: "Memory usage (MB)",
								
						},
						
					},
				}}
				width="450vw"
				height={"300vh"}
				data={userData}
			/>
		</div>
	);
}

export default MemoryUsageChart;
