import Swal from "sweetalert2";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BASEURL from "../constants/apiBaseUrl";

const SystemUserTable = ({ users }) => {
	const Navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [userchosen, setuserChosen] = useState(null);

	const handleClose = () => setShow(false);
	const handleShow = (user) => {
		setShow(true);
		setuserChosen(user);
	};

	const delete_user = async (user_username) => {
		const msg = "Are you sure you want to remove this user?";
		const txt = "This will un-link them from any projects they're attached to!";
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
			const token = localStorage.getItem("taskedit-accesstoken");
			const username = localStorage.getItem("username");

			const response = await fetch(`${BASEURL}/users/deleteuser`, {
				headers: {
					"taskedit-accesstoken": token,
					username: username,
					isadmin: "true",
					"Content-Type": "application/json",
				},
				method: "DELETE",
				body: JSON.stringify({
					username: user_username,
				}),
			});

			const data = await response.json();
			console.log(data);

			if (data.status === "SUCCESS") {
				Swal.fire({
					title: "Deleted " + user_username + " Successfully",
					timer: 3000,
					icon: "success",
				}).then(() => {
					location.reload();
				});
			} else {
				Swal.fire({
					title: "Error deleting user. Try later",
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
						<th scope="col">#</th>
						<th scope="col">Username</th>
						<th scope="col">Fullname</th>
						<th scope="col">Email</th>
						<th scope="col">Role</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<th scope="row">{index + 1}</th>
							<td>{user.username}</td>
							<td>{user.first_name + " " + user.last_name}</td>
							<td>{user.email}</td>
							<td>
								{user.role_id == "1"
									? "Admin"
									: user.role_id == "2"
									? "StakeHolder"
									: "Warehouse Operator"}
							</td>
							<td>
								{user.role_id == "1" ? (
									<></>
								) : (
									<button
										className="btn btn-primary"
										onClick={() => {
											Navigate("/admin/edituser", {
												state: { ...user },
											});
										}}
									>
										Edit
									</button>
								)}
							</td>
							<td>
								{user.role_id == "1" ? (
									<></>
								) : (
									<button
										className="btn btn-danger"
										onClick={() => {
											delete_user(user.username);
										}}
									>
										Remove
									</button>
								)}
							</td>
							<td>
								<button className="btn btn-warning">See details</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Modal show={show} onHide={handleClose} variant="dark">
				<Modal.Header closeButton>
					<Modal.Title>Send Message</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Send message to {userchosen?.username}</Form.Label>
							<Form.Control
								required
								minLength={50}
								as="textarea"
								id="message"
								type="text"
								placeholder="Enter message here"
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={async () => {
							const message = document.getElementById("message").value;

							if (message?.length < 7) {
								alert("Message not long enough");
								return;
							}
							const token = localStorage.getItem("taskedit-accesstoken");
							const username = localStorage.getItem("username");

							const response = await fetch(`${BASEURL}/messages/sendmessage`, {
								headers: {
									"taskedit-accesstoken": token,
									username: username,
									isadmin: "true",
									"Content-Type": "application/json",
								},
								method: "POST",
								body: JSON.stringify({
									Message: message,
									to: userchosen?.username,
									to_usertype: "user",
								}),
							});

							const data = await response.json();
							console.log(data);

							if (data.status === "SUCCESS") {
								Swal.fire({
									title: "Message sent",
									timer: 3000,
									icon: "success",
								});
							} else {
								Swal.fire({
									title: "An error occurred, try later",
									timer: 3000,
									icon: "error",
								});
							}
						}}
					>
						Send
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default SystemUserTable;
