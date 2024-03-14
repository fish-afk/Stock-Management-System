import React from "react";
import StakeHolderNavbar from "../../components/StakeHolderNavbar";

export default function StakeHolderDashboard() {
	return (
		<div className="d-flex">
			<StakeHolderNavbar priv={"stakeholder"} />
			<h1>StakeHolderDashboard</h1>
		</div>
	);
}
