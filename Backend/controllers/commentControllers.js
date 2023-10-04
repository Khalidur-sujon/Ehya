const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res, next) => {
	try {
		const { desc, slug, parent, replyOnUser } = req.body;

		//find the the post
		const post = await Post.findOne({ slug: slug }).populate([
			{
				path: "user",
				select: ["avatar", "name"],
			},
		]);

		//if post was not found
		if (!post) {
			let error = new Error("Post was not found");
			next(error);
		}

		//if post is found, then add the post id in the comment
		const newComment = new Comment({
			user: req.user._id,
			desc,
			post: post._id,
			parent,
			replyOnUser,
		});
		const savedComment = await newComment.save();
		return res.json(savedComment);
	} catch (error) {
		next(error);
	}
};

//Route : api/comments/:commentID
const updateComment = async (req, res, next) => {
	try {
		const { desc } = req.body;

		//find the comment
		const comment = await Comment.findById(req.params.commentId);

		//if comment not found
		if (!comment) {
			let error = new Error("Comment was not found ");
			next(error);
		}

		//if comment was found ,
		// change the description
		comment.desc = desc || comment.desc;

		const updatedComment = await comment.save();
		return res.json(updatedComment);
	} catch (error) {
		next(error);
	}
};

// Route: api/comments/commentId
const deleteComment = async (req, res, next) => {
	try {
		//find the comment
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		// when delete a comment , make sure delete the replies under the comment
		await Comment.deleteMany({ parent: comment._id });

		//if comment not found
		if (!comment) {
			let error = new Error("Comment was not found ");
			next(error);
		}

		//if comment was found ,
		return res.json({
			message: "Comment is deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

//export
module.exports = { createComment, updateComment, deleteComment };
