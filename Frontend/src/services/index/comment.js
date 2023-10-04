import axios from "axios";

export const createNewComment = async ({
	desc,
	slug,
	parent,
	replyOnUser,
	token,
}) => {
	try {
		//header
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.post(
			import.meta.env.VITE_APP_SERVER_DOMAIN + "api/comments",
			{ desc, slug, parent, replyOnUser },
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

// update comment

export const updatedComment = async ({ desc, commentId, token }) => {
	try {
		//header
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.put(
			`${
				import.meta.env.VITE_APP_SERVER_DOMAIN
			}api/comments/${commentId}`,
			{ desc },
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

//delete comment
export const deleteComment = async ({ commentId, token }) => {
	try {
		//header
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.delete(
			`${import.meta.env.VITE_APP_SERVER_DOMAIN}comments/${commentId}`,
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
