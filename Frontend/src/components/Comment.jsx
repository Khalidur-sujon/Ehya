import { images } from "../constants/index";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import CommentForm from "./CommentForm";

function Comment({
	comment,
	loggedInUserId,
	affectedComment,
	setaffectedComment,
	addComment,
	updateComment,
	parentId = null,
	deleteComment,
	replies,
}) {
	const isUserLogged = Boolean(loggedInUserId);
	const commentBelongsToUser = comment.user?._id === loggedInUserId;

	const isReplying =
		affectedComment &&
		affectedComment.type === "replying" &&
		affectedComment._id === comment._id;

	const isEditing =
		affectedComment &&
		affectedComment.type === "editing" &&
		affectedComment._id === comment._id;

	const repliedCommentId = parentId ? parentId : comment._id;
	const replyOnUserId = comment.user?._id;

	return (
		<div className="flex flex-nowrap gap-x-3 items-start bg-[#F2F4F5] p-3 rounded-lg">
			<img
				src={
					comment?.user?.avatar
						? comment.user.avatar
						: images.author_default
				}
				alt="post_profile"
				className="w-9 h-9 object-cover rounded-full"
			/>

			<div className="flex-1 flex flex-col">
				<h5 className="font-bold text-dark-hard text-xs">
					{comment.user.name}
				</h5>
				<span className="text-xs text-dark-light">
					{new Date(comment.createdAt).toLocaleDateString("en-us", {
						day: "numeric",
						month: "short",
						year: "numeric",
						hour: "2-digit",
					})}
				</span>

				{!isEditing && (
					<p className="font-opensans text-dark-light mt-[10px]">
						{comment.desc}
					</p>
				)}

				{/* editing is true -> render the comment form */}
				{isEditing && (
					<CommentForm
						btnLabel="Update"
						formCancelHandler={() => setaffectedComment(null)}
						formSubmitHandler={(value) =>
							updateComment(value, comment._id)
						}
						initialText={comment.desc}
					/>
				)}

				<div className="flex items-center gap-x-3 text-dark-light font-roboto font-semibold text-xs my-3">
					{/* if user is logged in, then the user have access to replay */}
					{isUserLogged && (
						<button
							className="flex items-center space-x-2"
							onClick={() =>
								setaffectedComment({
									type: "replying",
									_id: comment._id,
								})
							}
						>
							<FiMessageSquare className="w-4 h-auto " />
							<span>Reply</span>
						</button>
					)}

					{commentBelongsToUser && (
						<>
							<button
								className="flex items-center space-x-2"
								onClick={() =>
									setaffectedComment({
										type: "editing",
										_id: comment._id,
									})
								}
							>
								<FiEdit2 className="w-4 h-auto " />
								<span>Edit</span>
							</button>
							<button
								className="flex items-center space-x-2"
								onClick={() => deleteComment(comment._id)}
							>
								<FiTrash className="w-4 h-auto" />
								<span>Delete</span>
							</button>
						</>
					)}
				</div>
				{/* replay section */}
				{isReplying && (
					<CommentForm
						btnLabel="Reply"
						formSubmitHandler={(value) => {
							addComment(value, repliedCommentId, replyOnUserId);
						}}
						formCancelHandler={() => setaffectedComment(null)}
					/>
				)}
				{replies.length > 0 && (
					<div>
						{replies.map((reply) => (
							<Comment
								key={reply._id}
								addComment={addComment}
								affectedComment={affectedComment}
								setaffectedComment={setaffectedComment}
								updateComment={updateComment}
								deleteComment={deleteComment}
								parentId={comment._id}
								comment={reply}
								replies={[]}
								loggedInUserId={loggedInUserId}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Comment;
