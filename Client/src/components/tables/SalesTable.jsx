import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASEURL from "../../constants/apiBaseUrl";
import axios from "axios";

const SalesTable = ({ sales, crud }) => {
	const Navigate = useNavigate();
	const [record, setrecord] = useState(null);

	const delete_sale = async (sale_id) => {
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
			const reqData = { sale_id, jwt_key, username };

			let data = await axios.delete(BASEURL + "/sales/deletesale", {
				data: reqData,
			});
			const response = data?.data;
			console.log(response);

			if (response.status === "SUCCESS") {
				Swal.fire({
					title: "Deleted " + sale_id + " Successfully",
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

	function formatDate(date) {
		// Extract date components
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
		const year = date.getFullYear();

		// Format the date and time as 'dd/mm/yyyy'
		return `${day}/${month}/${year}`;
	}


	return (
		<div className="container-fluid">
			<table className="table table-hover table-success table-striped table-bordered p-5">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Sale ID</th>
						<th scope="col">Customer ID</th>
						<th scope="col">Product ID</th>
						<th scope="col">Sale Date</th>
						<th scope="col">Unit Price</th>
						<th scope="col">Quantity</th>
					</tr>
				</thead>
				<tbody>
					{sales.map((sale, index) => (
						<tr key={index}>
							<td>{sale.sale_id}</td>
							<td>{sale.customer_id}</td>
							<td>{sale.product_id}</td>
							<td>{formatDate(new Date(sale.sale_date))}</td>
							<td>{sale.unit_price}</td>
							<td>{sale.quantity}</td>
							{crud == true ? (
								<>
									<td>
										<button
											className="btn btn-warning pe-2 ps-2 pt-1 pb-1"
											onClick={() => {
												Navigate(
													"/warehouse-operator/pages/sales/edit/" +
														sale.sale_id,
													{
														state: { ...sale },
													},
												);
											}}
										>
											Edit Sale
										</button>
									</td>
									<td>
										<button
											className="btn btn-danger pe-2 ps-2 pt-1 pb-1"
											onClick={() => {
												delete_sale(sale.sale_id);
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

export default SalesTable;
