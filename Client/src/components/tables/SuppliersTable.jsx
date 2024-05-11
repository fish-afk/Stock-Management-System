import Swal from "sweetalert2";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../constants/apiBaseUrl";
import axios from "axios";

const SuppliersTable = ({ Suppliers }) => {
	const Navigate = useNavigate();
	const [userchosen, setuserChosen] = useState(null);

	const delete_supplier = async (supplier_id) => {
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
			const reqData = { supplier_id, jwt_key, username };

			let data = await axios.delete(BASEURL + "/suppliers/deletesupplier", {
				data: reqData,
			});
			const response = data?.data;
			console.log(response);

			if (response.status === "SUCCESS") {
				Swal.fire({
					title: "Deleted " + supplier_id + " Successfully",
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
			<table className="table table-hover table-success table-striped table-bordered p-5">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Supplier ID</th>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">Phone</th>
					</tr>
				</thead>
				<tbody>
					{Suppliers.map((supplier, index) => (
						<tr key={index}>
							<td>{supplier.supplier_id}</td>
							<td>{supplier.supplier_name}</td>
							<td>{supplier.email}</td>
							<td>{supplier.phone}</td>
							<td>
								<button
									className="btn btn-danger pe-2 ps-2 pt-1 pb-1"
									onClick={() => {
										delete_supplier(supplier.supplier_id);
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
											"/admin/pages/suppliers/edit/" + supplier.supplier_id,
											{
												state: { ...supplier },
											},
										);
									}}
								>
									Edit Supplier
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

export default SuppliersTable;
