import { Navigate } from "react-router-dom";

const Redirector = () => {
	const hasTokens =
		localStorage.getItem("stock-managment-system-auth-token") &&
		localStorage.getItem("stock-managment-system-refresh-token");

	if (hasTokens) {
		return <Navigate to="/dashboard" replace />;
	} else {
		return <Navigate to="/login?error=unauthenticated" replace />;
	}
};

export default Redirector;
