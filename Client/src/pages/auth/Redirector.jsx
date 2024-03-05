import { Navigate } from "react-router-dom";

const Redirector = () => {
	const hasTokens =
		localStorage.getItem("stock-managment-system-auth-token") &&
		localStorage.getItem("stock-managment-system-refresh-token");

	const userData = JSON.parse(localStorage.getItem("userDataObject"));
	console.log(userData);

	if (hasTokens) {
		if (userData == null || userData == undefined || userData == "") {
			return <Navigate to="/login?error=Unknown Role Id" replace />;
		} else {
			if (userData.role_id == 1) {
				return <Navigate to="/admin/dashboard" replace />;
			} else if (userData?.role_id == 2) {
				return <Navigate to="/warehouse-operator/dashboard" replace />;
			} else if (userData?.role_id == 3) {
				return <Navigate to="/stakeholder/dashboard" replace />;
			} else {
				return <Navigate to="/login?error=Unknown+Role+Id" replace />;
			}
		}
	} else {
		return <Navigate to="/login?error=Unauthenticated" replace />;
	}
};

export default Redirector;
