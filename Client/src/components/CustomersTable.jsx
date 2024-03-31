import Swal from "sweetalert2";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASEURL from "../constants/apiBaseUrl";
import axios from "axios";

const CustomersTable = ({ customers }) => {
	const Navigate = useNavigate();
	const [userchosen, setuserChosen] = useState(null);

	const delete_customer = async (customer_id) => {
		const msg = "Are you sure you want to delete this user?";
		const txt = "This action is irreversible";
		const result = await Swal.fire({
			title: msg,
			text: txt,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes",
		});

		if (result.isConfirmed) {
			const userData = JSON.parse(localStorage.getItem("userDataObject"));
			const jwt_key = localStorage.getItem("stock-managment-system-auth-token");
			const username = userData?.username;
			const reqData = { customer_id, jwt_key, username };

			let data = await axios.delete(BASEURL + "/customers/deletecustomer", {
				data: reqData,
			});
			const response = data?.data;
			console.log(response);

			if (response.status === "SUCCESS") {
				Swal.fire({
					title: "Deleted " + customer_id + " Successfully",
					timer: 3000,
					icon: "success",
				}).then(() => {
					location.reload();
				});
			} else {
				Swal.fire({
					title: "Error deleting customer. Try later",
					timer: 3000,
					icon: "error",
				}).then(() => {
					location.reload();
				});
			}
		}
	};

	return (
		<div className="container-fluid">
			<table className="table table-hover table-dark p-5">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Customer ID</th>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Phone</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customer, index) => (
						<tr key={index}>
							<td>{customer.customer_id}</td>
							<td>{customer.customer_name}</td>
							<td>{customer.email}</td>
							<td>{customer.phone}</td>
							<td>
								<button
									className="btn btn-danger pe-2 ps-2 pt-1 pb-1"
									onClick={() => {
										delete_customer(customer.customer_id);
									}}
								>
									Remove
								</button>
							</td>
							<td>
								<button
									className="btn btn-warning pe-2 ps-2 pt-1 pb-1"
									onClick={() => {
										Navigate(
											"/admin/pages/customers/edit/" + customer.customer_id,
											{
												state: { ...customer },
											},
										);
									}}
								>
									Edit Customer
								</button>
							</td>
							<td>
								<button className="btn btn-warning pe-2 ps-2 pt-1 pb-1">
									See details
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CustomersTable;
