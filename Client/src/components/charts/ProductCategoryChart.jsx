import React from "react";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

function ProductCategoryChart() {

    const [stats, setStats] = useState([]);

    const func = async () => {
        const userData = JSON.parse(localStorage.getItem("userDataObject"));
        const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
        const username = userData?.username;
        let data = await axios.post(BASEURL + "/stats/getcategorystats", {
            username,
            jwt_key,
        });
        const response = data?.data;

        console.log(response.data);
        setStats(response?.data == undefined ? [] : response?.data);
    };
    useEffect(() => {
        func();
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
	}

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
				width="280vw"
				height={"350vh"}
				data={categoryData}
			/>
		</div>
	);
}

export default ProductCategoryChart;
