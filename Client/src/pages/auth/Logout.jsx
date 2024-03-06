import React from "react";
import { Navigate } from "react-router-dom";


export default function Logout() {
	localStorage.clear()
	const url = `/login?message=logged-out`;

	return <Navigate to={url} />;
}
