import React from "react";
import StakeHolderNavbar from "../../components/navbars/StakeHolderNavbar";
import BarChart from "../../components/charts/PurchasesChart";

export default function KPIs() {
	return (
		<div className="d-flex">
			<StakeHolderNavbar />
			<div>
				<BarChart />
			</div>
			KPIs
		</div>
	);
}
