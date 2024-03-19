import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import BASEURL from "../../constants/apiBaseUrl";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthentication = async () => {
			const accessToken = localStorage.getItem(
				"stock-managment-system-auth-token",
			);
			
			const refreshToken = localStorage.getItem(
				"stock-managment-system-refresh-token",
			);
            
            const userData = JSON.parse(localStorage.getItem('userDataObject'))
            const username = userData?.username;

			let response = await axios.post(`${BASEURL}/users/confirmjwt`,{"jwt_key": accessToken,username: username});

            const data = response?.data;
			
			if (data?.auth == false || data?.auth == 'false') {
				let response2 = await axios.post(`${BASEURL}/users/refresh`, {
					refreshToken: refreshToken,
					username: username,
				});

				const data2 = response2.data;

				if (data2?.auth == true) {
					localStorage.setItem("stock-managment-system-auth-token", data2.jwt);
				}
				setAuthenticated(data2?.auth)

			} else {
				setAuthenticated(data?.auth);
			}
			setLoading(false);
		};

		checkAuthentication();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	} else {
		return authenticated ? children : <Navigate to="/login?error=unauthenticated" replace />;
	}
};

export default ProtectedRoute;
