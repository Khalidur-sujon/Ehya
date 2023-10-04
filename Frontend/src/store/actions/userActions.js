import { userActions } from "../reducers/userReducer";

export const logout = () => (dispatch) => {
	dispatch(userActions.resetUserInfo());
	localStorage.removeItem("account");
};
