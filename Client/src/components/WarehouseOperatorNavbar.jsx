import React from "react";
import {
	CDBSidebar,
	CDBSidebarContent,
	CDBSidebarFooter,
	CDBSidebarHeader,
	CDBSidebarMenu,
	CDBSidebarMenuItem,
	CDBBtn,
} from "cdbreact";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const WarehouseOperatorNavbar = () => {
	const Navigate = useNavigate();
	return (
		<div
			style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
		>
			<CDBSidebar textColor="#fff" backgroundColor="#111">
				<CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
					<Link
						to="#"
						className="text-decoration-none"
						style={{ color: "inherit" }}
					>
						Shihab Enterprises
					</Link>
				</CDBSidebarHeader>

				<CDBSidebarContent className="sidebar-content">
					<CDBSidebarMenu>
						<Link to="/admin/dashboard">
							<CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
						</Link>
						<Link to="/admin/pages/system-users">
							<CDBSidebarMenuItem icon="box">Products</CDBSidebarMenuItem>
						</Link>
						<Link to="/admin/pages/customers">
							<CDBSidebarMenuItem icon="money-bill">
								Purchases
							</CDBSidebarMenuItem>
						</Link>
						<Link to="/admin/pages/suppliers">
							<CDBSidebarMenuItem icon="money-bill">Sales</CDBSidebarMenuItem>
						</Link>
						<Link to="/admin/pages/product-categories">
							<CDBSidebarMenuItem icon="shapes">
								Product Categories
							</CDBSidebarMenuItem>
						</Link>
						<Link to="/admin/pages/warehouses">
							<CDBSidebarMenuItem icon="warehouse">
								Warehouses
							</CDBSidebarMenuItem>
						</Link>
					</CDBSidebarMenu>
				</CDBSidebarContent>

				<CDBSidebarFooter style={{ textAlign: "center" }} className="p-2">
					<CDBBtn
						className="container text-white btn mb-3"
						outline
						onClick={() => {
							Navigate("/admin/editprofile");
						}}
					>
						<p className="fs-7 m-0">Edit Profile</p>
					</CDBBtn>
					<CDBBtn
						className="container text-white btn mb-3"
						outline
						onClick={() => {
							Navigate("/admin/changepassword");
						}}
					>
						<p className="fs-7 m-0">Change Password</p>
					</CDBBtn>
					<CDBBtn
						className="container text-white btn"
						color="danger"
						outline
						onClick={() => {
							Swal.fire({
								title: "Are you sure you want to logout?",
								icon: "warning",
								showCancelButton: true,
								confirmButtonColor: "#3085d6",
								cancelButtonColor: "#d33",
								confirmButtonText: "Yes",
							}).then((result) => {
								if (result.isConfirmed) {
									Navigate(`/logout`);
								}
							});
						}}
					>
						<p className="fs-7 m-0">Logout</p>
					</CDBBtn>
				</CDBSidebarFooter>
			</CDBSidebar>
		</div>
	);
};

export default WarehouseOperatorNavbar;
