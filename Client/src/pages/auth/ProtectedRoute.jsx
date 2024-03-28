import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import BASEURL from "../../constants/apiBaseUrl";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const ProtectedRoute = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = () => {
			const accessToken = localStorage.getItem(
				"stock-managment-system-auth-token",
			);

			const refreshToken = localStorage.getItem(
				"stock-managment-system-refresh-token",
			);

			const userData = JSON.parse(localStorage.getItem("userDataObject"));
			const username = userData?.username;

			fetch(`${BASEURL}/users/confirmjwt`, {
				body: JSON.stringify({
					jwt_key: accessToken,
					username: username,
				}),
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async (res) => {
				const body = await res.json();

				if (body?.auth == false) {
					console.log("its falsee");
					let response2 = await fetch(`${BASEURL}/users/refresh`, {
						body: JSON.stringify({
							refreshToken: refreshToken,
							username: username,
						}),
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					});

					const body2 = await response2.json();

					if (body2?.auth == true) {
						localStorage.setItem(
							"stock-managment-system-auth-token",
							body2.jwt,
						);
						setAuthenticated(true);
					} else {
						setAuthenticated(false);
					}
				} else {
					setAuthenticated(true);
				}
				setLoading(false);
			});
		};

		checkAuthentication();
	}, []);

	if (loading) {
		return (
			<div class="position-absolute top-50 start-50 translate-middle">
				<ThreeCircles
					visible={true}
					height="100"
					width="100"
					color="black"
					ariaLabel="three-circles-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
			</div>
		);
	} else {
		return authenticated ? (
			children
		) : (
			<Navigate to="/login?error=unauthenticated" replace />
		);
	}
};

export default ProtectedRoute;
