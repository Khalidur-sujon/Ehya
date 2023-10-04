import axios from "axios";

export const signUp = async ({ name, email, password }) => {
	try {
		const { data } = await axios.post(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/users/register`,
			{
				name,
				email,
				password,
			}
		);

		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const login = async ({ email, password }) => {
	try {
		const { data } = await axios.post(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/users/login`,
			{
				email,
				password,
			}
		);

		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const getUserProfile = async ({ token }) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/users/profile`,
			config
		);

		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const updateProfile = async ({ token, userData }) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.put(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/users/updateProfile`,
			userData,
			config
		);

		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const updateProfilePicture = async ({ token, formData }) => {
	try {
		const config = {
			headers: {
				"Content-Type": "mutlipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.put(
			`${
				import.meta.env.VITE_APP_SERVER_DOMAIN
			}api/users/updateUserProflePicture`,
			formData,
			config
		);

		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};
