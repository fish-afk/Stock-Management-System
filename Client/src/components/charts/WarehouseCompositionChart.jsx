import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

function WarehouseComposition({ sizeW, sizeH, orientation, warehouse_id }) {
	const [stats, setWarehouseComposition] = useState([]);

	const func = async () => {
		const userData = JSON.parse(localStorage.getItem("userDataObject"));
		const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
		const username = userData?.username;
		let data = await axios.post(BASEURL + "/stats/getwarehousecomposition", {
			username,
			jwt_key,
			warehouse_id,
		});
		const response = data?.data;
		console.log(response);

		setWarehouseComposition(response?.data == undefined ? [] : response?.data);
	};
	useEffect(() => {
		func();
	}, []);

	const data = {
		labels: stats.map((data) => data.product_name),
		datasets: [
			{
				backgroundColor: [
					"rgba(75,192,192,1)",
					"#ecf0f1",
					"#50AF95",
					"#f3ba2f",
					"#2a71d0",
				],
				label: "Warehouse product composition",
				data: stats.map((data) => data.quantity_in_stock),
				borderColor: "black",
				borderWidth: 2,
			},
		],
	};

	return (
		<div className="p-2 ps-4">
			<Doughnut
				options={{
					plugins: {
						title: {
							display: true,
							text: "Warehouse Composition",
						},
					},
				}}
				width={sizeW}
				height={sizeH}
				data={data}
			/>
		</div>
	);
}

export default WarehouseComposition;
