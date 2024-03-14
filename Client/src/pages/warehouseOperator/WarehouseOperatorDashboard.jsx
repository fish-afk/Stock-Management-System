import React from 'react'
import WarehouseOperatorNavbar from '../../components/WarehouseOperatorNavbar';

export default function WarehouseOperatorDashboard() {
  return (
		<div className="d-flex">
			<WarehouseOperatorNavbar priv={"WarehouseOperator"} />
			<h1>WarehouseOperatorDashboard</h1>
		</div>
	);
}
