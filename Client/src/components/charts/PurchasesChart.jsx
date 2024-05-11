import React from "react";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

function BarChart() {

	const [purchases, setPurchases] = useState([]);

	const func = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/purchases/getallpurchases", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setPurchases(response?.data == undefined ? [] : response?.data);
	};
	useEffect(() => {
		func();
	}, []);


	const data = {
		labels: purchases.map((data) => new Date(data.purchase_date).getDay()),
		datasets: [
			{
				label: "Purchases",
				data: purchases.map((data) => data.quantity * data.unit_price),
				backgroundColor: [
					"pink",
					
				],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	}

	return (
		<div>
			<Bar width="600vw" height={"250vh"} data={data} />
		</div>
	);
}

export default BarChart;
