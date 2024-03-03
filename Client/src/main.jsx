import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Redirector from "./pages/auth/Redirector";
import Dashboard from "./pages/warehouseOperator/Dashboard";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

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
		path: "/register",
		element: <Register />,
	},
	{
		path: "/Dashboard",
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
