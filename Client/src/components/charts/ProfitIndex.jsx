import React from "react";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

function ProfitIndex() {
    const [purchases, setPurchases] = useState([]);
    const [sales, setSales] = useState([]);

    const func2 = async () => {
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
        func2();
	}, []);

	const categoryData = {
		labels: stats.map((data) => data.category_name),
		datasets: [
			{
				label: "quantity",
				data: stats.map((data) => data.product_count),
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
	};

	return (
		<div className="p-2 ps-4">
			<Pie
				options={{
					plugins: {
						title: {
							display: true,
							text: "Product Category Distribution",
						},
					},
				}}
				width="300vw"
				height={"400vh"}
				data={categoryData}
			/>
		</div>
	);
}

export default ProfitIndex;
