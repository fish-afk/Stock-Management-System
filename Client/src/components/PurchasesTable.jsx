import Swal from "sweetalert2";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASEURL from "../constants/apiBaseUrl";
import axios from "axios";

const PurchasesTable = ({ purchases, crud }) => {
	const Navigate = useNavigate();
	const [record, setrecord] = useState(null);

	const delete_purchase = async (purchase_id) => {
		const msg = "Are you sure you want to delete this record?";
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
			const reqData = { purchase_id, jwt_key, username };

			let data = await axios.delete(BASEURL + "/purchases/deletepurchase", {
				data: reqData,
			});
			const response = data?.data;
			console.log(response);

			if (response.status === "SUCCESS") {
				Swal.fire({
					title: "Deleted " + purchase_id + " Successfully",
					timer: 3000,
					icon: "success",
				}).then(() => {
					location.reload();
				});
			} else {
				Swal.fire({
					title: "Error deleting supplier. Try later",
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
			<table className="table table-hover table-info table-striped table-bordered p-5">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Purchase ID</th>
						<th scope="col">Supplier ID</th>
						<th scope="col">Product ID</th>
						<th scope="col">Purchase Date</th>
						<th scope="col">Unit Price</th>
						<th scope="col">Quantity</th>
					</tr>
				</thead>
				<tbody>
					{purchases.map((purchase, index) => (
						<tr key={index}>
							<td>{purchase.purchase_id}</td>
							<td>{purchase.supplier_id}</td>
							<td>{purchase.product_id}</td>
							<td>{purchase.purchase_date}</td>
							<td>{purchase.unit_price}</td>
							<td>{purchase.quantity}</td>

							{crud == true ? (
								<>
									<td>
										<button
											className="btn btn-warning pe-2 ps-2 pt-1 pb-1"
											onClick={() => {
												Navigate(
													"/warehouse-operator/pages/purchases/edit/" +
														purchase.purchase_id,
													{
														state: { ...purchase },
													},
												);
											}}
										>
											Edit Purchase
										</button>
									</td>
									<td>
										<button
											className="btn btn-danger pe-2 ps-2 pt-1 pb-1"
											onClick={() => {
												delete_purchase(purchase.purchase_id);
											}}
										>
											Remove
										</button>
									</td>
								</>
							) : (
								<></>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PurchasesTable;
