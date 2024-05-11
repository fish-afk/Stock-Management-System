import React from "react";
import StakeholderNavbar from "../../components/navbars/StakeHolderNavbar";
import PurchasesTable from "../../components/tables/PurchasesTable";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASEURL from "../../constants/apiBaseUrl";

export default function PurchasesSt() {
	const Navigate = useNavigate();
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

	return (
		<div className="d-flex">
			<StakeholderNavbar />
			<div
				className="container pb-5 overflow-auto"
				style={{ maxHeight: "100vh" }}
			>
				<div className="title text-center p-4">
					<h1 className="fw-light">
						{purchases.length < 1
							? "No purchases made yet"
							: "Record of all the purchases made so far"}
					</h1>
				</div>

				<PurchasesTable purchases={purchases} crud={false} />
			</div>
		</div>
	);
}
