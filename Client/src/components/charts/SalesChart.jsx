import React from "react";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

function SalesChart() {
	const [sales, setSales] = useState([]);

	const func = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/sales/getallsales", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setSales(response?.data == undefined ? [] : response?.data);
	};
	useEffect(() => {
		func();
	}, []);

	const data = {
		labels: sales.map((data) => new Date(data.sale_date).getDate()),
		datasets: [
			{
				label: "Sales",
				data: sales.map((data) => data.quantity * data.unit_price),
				backgroundColor: ["green"],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	};

	return (
		<div className="p-2 ps-4">
			<Bar
				width="450vw"
				options={{ indexAxis: "y" }}
				height={"350vh"}
				data={data}
			/>
		</div>
	);
}

export default SalesChart;
