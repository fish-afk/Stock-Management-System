import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/auth/Login";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import Redirector from "./pages/auth/Redirector";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StakeHolderDashboard from "./pages/stakeHolder/StakeHolderDashboard";
import WarehouseOperatorDashboard from "./pages/warehouseOperator/WarehouseOperatorDashboard";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Redirector />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/reset-password",
		element: <ResetPassword />,
	},
	{
		path: "/admin",
		element: <Navigate to={"/admin/dashboard"} />,
		children: [
			{
				
				path: "dashboard",
				element: (
					<ProtectedRoute>
						<AdminDashboard />
					</ProtectedRoute>
				),
			},
		],
	},

	{
		path: "/warehouse-operator",
		element: <Navigate to={"/warehouse-operator/dashboard"} />,
		children: [
			{
				path: "dashboard",
				element: (
					<ProtectedRoute>
						<WarehouseOperatorDashboard />
					</ProtectedRoute>
				),
			},
		],
	},

	{
		path: "/stakeholder",
		element: <Navigate to={"/stakeholder/dashboard"} />,
		children: [
			{
				path: "dashboard",
				element: (
					<ProtectedRoute>
						<StakeHolderDashboard />
					</ProtectedRoute>
				),
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
