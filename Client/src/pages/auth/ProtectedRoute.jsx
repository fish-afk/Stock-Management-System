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
            
            const userData = JSON.parse(localStorage.getItem('userDataObject'))
            const username = userData?.username;
			const role_id = userData?.role_id;

			let response = await axios.post(`${BASEURL}/users/confirmjwt`,{"jwt_key": accessToken,username: username});

            const data = response?.data;
			setAuthenticated(data.auth);
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
