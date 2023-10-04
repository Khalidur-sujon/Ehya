import axios from "axios";

export const getAllPosts = async () => {
	try {
		const { data } = await axios.get(
			import.meta.env.VITE_APP_SERVER_DOMAIN + "api/posts"
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

export const getSinglePost = async ({ slug }) => {
	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/posts/${slug}`
		);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			throw new Error(error.response.data.message);
		}
		throw new Error(error.message);
	}
};

//delete post
export const deletePost = async ({ slug, token }) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.delete(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/posts/${slug}`,
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

// update post

export const updatePost = async ({ slug, token, updatedData }) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.put(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/posts/${slug}`,
			updatedData,
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

//create post
export const createPost = async ({ token }) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const { data } = await axios.post(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}api/posts`,
			{},
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
