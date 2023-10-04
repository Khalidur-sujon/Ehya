import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
	createNewComment,
	updatedComment,
	deleteComment,
} from "../services/index/comment";

function CommentSectionContainer({ loggedInUserId, comments, postSlug }) {
	const userState = useSelector((state) => state.user);
	const [affectedComment, setaffectedComment] = useState(null);
	const queryClient = useQueryClient();

	//create comment
	const { mutate: mutateCreateComment, isLoading } = useMutation({
		mutationFn: ({ desc, slug, parent, replyOnUser, token }) => {
			return createNewComment({
				desc,
				slug,
				parent,
				replyOnUser,
				token,
			});
		},
		onSuccess: () => {
			toast.success(
				"Your comment is send successfully, it will be visible after the confirmation of Admin"
			);
			queryClient.invalidateQueries(["blog", postSlug]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	//update comment
	const { mutate: mutateComment } = useMutation({
		mutationFn: ({ desc, token, commentId }) => {
			return updatedComment({
				desc,
				token,
				commentId,
			});
		},
		onSuccess: () => {
			toast.success("Your comment is updated");
			queryClient.invalidateQueries(["blog", postSlug]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	// delete comment
	const { mutate: mutateDeleteComment } = useMutation({
		mutationFn: ({ token, commentId }) => {
			return deleteComment({ token, commentId });
		},
		onSuccess: () => {
			toast.success("Your commnet is deleted successfully");
			queryClient.invalidateQueries(["blog", postSlug]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const addCommentHandler = (value, parent = null, replyOnUser = null) => {
		mutateCreateComment({
			desc: value,
			parent,
			replyOnUser,
			token: userState.userInfo.token,
			slug: postSlug,
		});
		setaffectedComment(null);
	};

	const updateCommentHandler = (value, commentId) => {
		mutateComment({
			desc: value,
			token: userState.userInfo.token,
			commentId,
		});
		setaffectedComment(null);
	};

	const deleteCommentHandler = (commentId) => {
		mutateDeleteComment({ token: userState.userInfo.token, commentId });
	};

	return (
		<div>
			<CommentForm
				btnLabel="Send"
				formSubmitHandler={(value) => addCommentHandler(value)}
				loading={isLoading}
			/>
			<div className="space-y-4 mt-8">
				{comments?.map((comment) => (
					<Comment
						key={comment._id}
						comment={comment}
						loggedInUserId={loggedInUserId}
						affectedComment={affectedComment}
						setaffectedComment={setaffectedComment}
						addComment={addCommentHandler}
						updateComment={updateCommentHandler}
						deleteComment={deleteCommentHandler}
						replies={comment.replies}
					/>
				))}
			</div>
		</div>
	);
}

export default CommentSectionContainer;
