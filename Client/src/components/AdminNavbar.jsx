import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AiFillHome } from "react-icons/ai";
import { SiTask } from "react-icons/si";
import { BsPersonLinesFill, BsPersonFillGear } from "react-icons/bs";
import { GoPerson } from "react-icons/go";
import { MdCategory } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";

const AdminNavbar = () => {
	const Navigate = useNavigate();
	return (
		<div
			className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
			style={{ width: "19%", height: "100vh" }}
		>
			<Link
				to="#"
				className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
			>
				<span className="fs-6 pe-2 ps-3">Shihab Enterprises</span>
				<button className="bg-dark button">
					<MdOutlineKeyboardArrowLeft
						className="ms-2 me-2 mb-1"
						color="white"
					/>
				</button>
			</Link>

			<hr />

			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link
						to={`/admin/home`}
						className="nav-link text-white"
						aria-current="page"
					>
						<AiFillHome className="bi me-2 mb-1" />
						Home
					</Link>
				</li>
				<li>
					<Link to="/admin/listfreelancers" className="nav-link text-white">
						<GoPerson className="bi me-2 mb-1" />
						System Users
					</Link>
				</li>
				<li>
					<Link to="/admin/listadmins" className="nav-link text-white">
						<SiTask className="bi me-2 mb-1" />
						Products
					</Link>
				</li>
				<li>
					<Link to="/admin/listclients" className="nav-link text-white">
						<MdCategory className="bi me-2 mb-1" />
						Product Categories
					</Link>
				</li>
				<li>
					<Link to="/admin/listclients" className="nav-link text-white">
						<FaWarehouse className="bi me-2 mb-1" />
						Warehouses
					</Link>
				</li>
				<li>
					<Link to="/admin/listprojects" className="nav-link text-white">
						<BsPersonLinesFill className="bi me-2 mb-1" />
						Suppliers
					</Link>
				</li>
				<li>
					<Link to="/admin/listtasks" className="nav-link text-white">
						<BsPersonFillGear className="bi me-2 mb-1" />
						Customers
					</Link>
				</li>
			</ul>
			<hr />

			<div
				className="container text-white btn btn-primary mb-3"
				onClick={() => {
					Navigate("/admin/editprofile");
				}}
			>
				<p className="fs-7 m-0">Edit Profile</p>
			</div>
			<div
				className="container text-white btn btn-primary mb-3"
				onClick={() => {
					Navigate("/admin/changepassword");
				}}
			>
				<p className="fs-7 m-0">Change Password</p>
			</div>
			<div
				className="container text-white btn btn-primary"
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
			</div>
		</div>
	);
};

export default AdminNavbar;
