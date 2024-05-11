import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";

function CrashesChart() {
	const UserData = [
		{
			id: 1,
			year: 2020,
			craches: 8
		},
		{
			id: 2,
			year: 2021,
			craches: 9
		},
		{
			id: 3,
			year: 2022,
			craches: 7
		},
		{
			id: 4,
			year: 2023,
			craches: 9
		},
		{
			id: 5,
			year: 2024,
			craches: 4
		},
	];

	const [userData, setUserData] = useState({
		labels: UserData.map((data) => data.year),
		datasets: [
			{
				label: "crashes",
				data: UserData.map((data) => data.craches),
				backgroundColor: [
					"red",
				],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	});

	return (
		<div className="p-2 ps-4">
			<Line
				options={{
					plugins: {
						title: {
							display: true,
							text: "Server crashes per year.",
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

export default CrashesChart;
