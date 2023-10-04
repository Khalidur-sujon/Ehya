//external imports
const { Schema, model } = require("mongoose");

const postSchema = new Schema(
	{
		title: { type: String, required: true },
		caption: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		body: { type: Object, required: true },
		photo: { type: String, required: false },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		tags: { type: [String] },
		categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

postSchema.virtual("comments", {
	ref: "Comment",
	localField: "_id",
	foreignField: "post",
});

const Post = model("Post", postSchema);

//export
module.exports = Post;
