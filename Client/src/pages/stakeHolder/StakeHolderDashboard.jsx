import React from 'react'
import Navbar from '../../components/Navbar'

export default function StakeHolderDashboard() {
  return (
		<div className="d-flex">
			<Navbar priv={"stakeholder"} />
			<h1>StakeHolderDashboard</h1>
		</div>
	);
}
