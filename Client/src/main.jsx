import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import Redirector from "./pages/auth/Redirector";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";

//warehouse operator pages
import WarehouseOperatorDashboard from "./pages/warehouseOperator/WarehouseOperatorDashboard";
import Products from "./pages/warehouseOperator/Products";
import AddNewProduct from "./pages/warehouseOperator/AddNewProduct";
import EditProduct from "./pages/warehouseOperator/EditProduct";
import ProductCategoriesWh from "./pages/warehouseOperator/ProductCategories";
import WarehousesWh from "./pages/warehouseOperator/Warehouses";
import Purchases from "./pages/warehouseOperator/Purchases";
import Sales from "./pages/warehouseOperator/Sales";
import AddNewPurchase from "./pages/warehouseOperator/AddNewPurchase";
import AddNewSale from "./pages/warehouseOperator/AddNewSale";

//stakeholder pages
import StakeHolderDashboard from "./pages/stakeHolder/StakeHolderDashboard";

// admin pages
import SystemUsers from "./pages/admin/SystemUsers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductCategories from "./pages/admin/ProductCategories";
import Warehouses from "./pages/admin/Warehouses";
import Suppliers from "./pages/admin/Suppliers";
import Customers from "./pages/admin/Customers";
import AddNewSystemUser from "./pages/admin/AddNewSystemUser";
import AddNewProductCategory from "./pages/admin/AddNewProductCategory";
import AddNewCustomer from "./pages/admin/AddNewCustomer";
import AddNewSupplier from "./pages/admin/AddNewSupplier";
import AddNewWarehouse from "./pages/admin/AddNewWarehouse";
import EditProductCategory from "./pages/admin/EditProductCategory";
import EditCustomer from "./pages/admin/EditCustomer";
import EditSupplier from "./pages/admin/EditSupplier";
import EditWarehouse from "./pages/admin/EditWarehouse";
import EditProfile from "./pages/auth/EditProfile";
import ChangePassword from "./pages/auth/ChangePassword";




const router = createBrowserRouter([
	{
		path: "/",
		element: <Redirector />,
	},
	{
		path: "*",
		element: (
			<div>
				<h1
					style={{ display: "flex", justifyContent: "center" }}
					className="mt-5"
				>
					Error 404: Page not found
				</h1>
				<br />
				<a href="/" style={{ display: "flex", justifyContent: "center" }}>
					<h4>Back to home</h4>
				</a>
			</div>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/logout",
		element: <Logout />,
	},
	{
		path: "/reset-password/:priv",
		element: <ResetPassword />,
	},
	{
		path: "/editprofile/:privs",
		element: (
			<ProtectedRoute>
				<EditProfile />
			</ProtectedRoute>
		),
	},
	{
		path: "/changepassword/:privs",
		element: (
			<ProtectedRoute>
				<ChangePassword />
			</ProtectedRoute>
		),
	},
	{
		path: "/admin",
		children: [
			{
				index: true,
				element: <Redirector />,
			},
			{
				path: "dashboard",
				element: (
					<ProtectedRoute>
						<AdminDashboard />
					</ProtectedRoute>
				),
			},

			{
				path: "pages",
				children: [
					{
						index: true,
						element: <Redirector />,
					},
					{
						path: "system-users",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<SystemUsers />
									</ProtectedRoute>
								),
							},
							{
								path: "new",
								element: (
									<ProtectedRoute>
										<AddNewSystemUser />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "product-categories",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<ProductCategories />
									</ProtectedRoute>
								),
							},
							{
								path: "new",
								element: (
									<ProtectedRoute>
										<AddNewProductCategory />
									</ProtectedRoute>
								),
							},
							{
								path: "edit/:category_id",
								element: (
									<ProtectedRoute>
										<EditProductCategory />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "warehouses",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Warehouses />
									</ProtectedRoute>
								),
							},
							{
								path: "new",
								element: (
									<ProtectedRoute>
										<AddNewWarehouse />
									</ProtectedRoute>
								),
							},
							{
								path: "edit/:warehouse_id",
								element: (
									<ProtectedRoute>
										<EditWarehouse />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "suppliers",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Suppliers />
									</ProtectedRoute>
								),
							},
							{
								path: "new",
								element: (
									<ProtectedRoute>
										<AddNewSupplier />
									</ProtectedRoute>
								),
							},
							{
								path: "edit/:supplier_id",
								element: (
									<ProtectedRoute>
										<EditSupplier />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "customers",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Customers />
									</ProtectedRoute>
								),
							},
							{
								path: "new",
								element: (
									<ProtectedRoute>
										<AddNewCustomer />
									</ProtectedRoute>
								),
							},
							{
								path: "edit/:customer_id",
								element: (
									<ProtectedRoute>
										<EditCustomer />
									</ProtectedRoute>
								),
							},
						],
					},
				],
			},
		],
	},

	{
		path: "/warehouse-operator",
		children: [
			{
				index: true,
				element: <Redirector />,
			},
			{
				path: "dashboard",
				element: (
					<ProtectedRoute>
						<WarehouseOperatorDashboard />
					</ProtectedRoute>
				),
			},

			{
				path: "pages",
				children: [
					{
						index: true,
						element: <Redirector />,
					},
					{
						path: "products",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Products />
									</ProtectedRoute>
								),
							},
							{
								path: "new",
								element: (
									<ProtectedRoute>
										<AddNewProduct />
									</ProtectedRoute>
								),
							},
							{
								path: "edit/:product_id",
								element: (
									<ProtectedRoute>
										<EditProduct />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "product-categories",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<ProductCategoriesWh />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "warehouses",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<WarehousesWh />
									</ProtectedRoute>
								),
							},
						],
					},
					{
						path: "sales",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Sales />
									</ProtectedRoute>
								),
							},
							{
								path: 'new',
								element: (
									<ProtectedRoute>
										<AddNewSale/>
									</ProtectedRoute>
								)
							}
						],
					},
					{
						path: "purchases",
						children: [
							{
								index: true,
								element: (
									<ProtectedRoute>
										<Purchases />
									</ProtectedRoute>
								),
							},
							{
								path: 'new',
								element: (
									<ProtectedRoute>
										<AddNewPurchase/>
									</ProtectedRoute>
								)
							}
						],
					},
				],
			},
		],
	},

	{
		path: "/stakeholder",
		children: [
			{
				index: true,
				element: <Redirector />,
			},
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
