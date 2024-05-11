import React from "react";
import StakeholderNavbar from "../../components/navbars/StakeHolderNavbar";
import SalesTable from "../../components/tables/SalesTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

export default function SalesSt() {
	const Navigate = useNavigate();
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

	return (
		<div className="d-flex">
			<StakeholderNavbar />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center p-4">
					<h1 className="fw-light">
						{sales.length < 1
							? "No sales made yet"
							: "Record of all the sales made so far"}
					</h1>
				</div>

				<SalesTable sales={sales} crud={false} />
			</div>
		</div>
	);
}
