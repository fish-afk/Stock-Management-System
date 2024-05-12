import React from "react";
import StakeHolderNavbar from "../../components/navbars/StakeHolderNavbar";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import PurchasesChart from "../../components/charts/PurchasesChart";
import SalesChart from "../../components/charts/SalesChart";
import ProductCategoryChart from "../../components/charts/ProductCategoryChart";
import WarehouseDistribution from "../../components/charts/WarehouseDistribution";

export default function StakeHolderDashboard() {
	
	const getDate = () => {
		const today = new Date();
		const day = today.getDate();
		const month = today.toLocaleString("default", { month: "long" });
		const year = today.getFullYear();

		const daySuffix = (day) => {
			if (day > 3 && day < 21) return "th";
			switch (day % 10) {
				case 1:
					return "st";
				case 2:
					return "nd";
				case 3:
					return "rd";
				default:
					return "th";
			}
		};

		const formattedDate = `${day}${daySuffix(day)} ${month} ${year}`;

		return formattedDate;
	};

	const username = JSON.stringify(
		JSON.parse(localStorage.getItem("userDataObject")).username,
	).replaceAll('"', "");
	
	return (
		<div className="d-flex">
			<StakeHolderNavbar />
			<div className="text-end overflow-auto" style={{ maxHeight: "100vh" }}>
				<div className="d-flex justify-content-between align-items-center">
					<div className="text-start">
						<h5 className="p-3">
							<em>{getDate()}</em>
						</h5>
					</div>
					<div>
						<h5 className="p-3 text-end">
							<FaRegUserCircle className="me-2" size={20} />
							<em>{username} : Stakeholder</em>
						</h5>
					</div>
				</div>
				<div className="text-start p-3 pt-2">
					<h4 className="text-primary">
						<em>Inventory stats 📈</em>
					</h4>

					<div className="d-flex p-3 pt-5">
						<PurchasesChart sizeH={"230vh"} sizeW={"600vw"} />
						<SalesChart sizeH={"230vh"} sizeW={"600vw"} />
					</div>
					<div className="d-flex">
						<WarehouseDistribution
							sizeH={"350vh"}
							sizeW={"640vw"}
							orientation={"y"}
						/>
						<ProductCategoryChart
							sizeW="400vw"
							sizeH="500vh"
							legendPosition={"left"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
