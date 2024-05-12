import React from "react";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

function WarehouseDistribution({ sizeW, sizeH, orientation }) {
	const [stats, setWarehouseDistribution] = useState([]);

	const func = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/stats/getwarehousedistribution", {
			username,
			jwt_key,
		});
		const response = data?.data;
		console.log(response);

		setWarehouseDistribution(response?.data == undefined ? [] : response?.data);
	};
	useEffect(() => {
		func();
	}, []);

	const data = {
		labels: stats.map((data) => data.warehouse_name),
		datasets: [
			{
				label: "Warehouse product distribution",
				data: stats.map((data) => data.quantity_in_stock),
				backgroundColor: ["blue"],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	};

	return (
		<div className="p-2 ps-4">
			<Bar
				width={sizeW}
				options={{ indexAxis: orientation }}
				height={sizeH}
				data={data}
			/>
		</div>
	);
}

export default WarehouseDistribution;
