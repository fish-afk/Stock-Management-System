import React from 'react'
import StakeHolderNavbar from "../../components/StakeHolderNavbar";
import BarChart from '../../components/PurchasesChart';

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
