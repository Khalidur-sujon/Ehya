//internal imports
const Post = require("../models/Post");
const comment = require("../models/Comment");
const uploadPicture = require("../middleware/uploadPictureMiddleware");
const { fileRemover } = require("../utils/fileRemover");

//external imports
const uuidv4 = require("uuid").v4;

//Route: api/posts/
const createPost = async (req, res, next) => {
	try {
		const post = new Post({
			title: "sample title",
			caption: "sample caption",
			slug: uuidv4(),
			body: {
				type: "doc",
				content: [],
			},
			photo: "",
			user: req.user._id,
		});

		const createdPost = await post.save();
		return res.json(createdPost);
	} catch (error) {
		next(error);
	}
};

//Route: api/posts/:slug

const updatePost = async (req, res, next) => {
	try {
		const post = await Post.findOne({ slug: req.params.slug });

		if (!post) {
			let error = new Error("Post was not found");
			next(error);
		}
		//if post was found
		//handle picture upload
		const upload = uploadPicture.single("postPicture");

		//handle others property of post
		const handleUpdatePostData = async (data) => {
			const { title, caption, slug, body, tags, categories } =
				JSON.parse(data);

			(post.title = title || post.title),
				(post.caption = caption || post.caption),
				(post.slug = slug || post.slug),
				(post.body = body || post.body),
				(post.tags = tags || post.tags),
				(post.categories = categories || post.categories);

			const updatedPost = await post.save();
			return res.json(updatedPost);
		};

		upload(req, res, async function (err) {
			if (err) {
				let error = new Error(
					"An unknown error occured when uploading"
				);
				next(error);
			} else {
				//every thing went well
				//if file exists
				if (req.file) {
					//if there is already a file, then delete that or if not then add that
					let filename;
					filename = post.photo;
					if (filename) {
						fileRemover(filename);
					}
					post.photo = req.file.filename;
					handleUpdatePostData(req.body.document);
				} else {
					//file not exists
					let filename;
					filename = post.photo;
					post.photo = "";
					fileRemover(filename);
					handleUpdatePostData(req.body.document);
				}
			}
		});
	} catch (error) {
		next(error);
	}
};

//Route : api/posts/:slug
const deletePost = async (req, res, next) => {
	try {
		const post = await Post.findOneAndDelete({ slug: req.params.slug });

		if (!post) {
			let error = new Error("Post was not found");
			next(error);
		}

		await comment.deleteMany({ post: post._id });

		return res.json({ message: "Post is successfully deleted" });
	} catch (error) {
		next(error);
	}
};

//Route : api/posts/:slug
const getPost = async (req, res, next) => {
	const post = await Post.findOne({ slug: req.params.slug }).populate([
		{
			path: "user",
			select: ["avatar", "name", "email"],
		},
		{
			path: "comments",
			match: {
				check: true,
				parent: null,
			},
			populate: [
				{
					path: "replies",
					match: {
						check: true,
					},
					populate: [
						{
							path: "user",
							select: ["avatar", "name"],
						},
					],
				},
			],
		},
	]);

	if (!post) {
		let error = new Error("Post was not found");
		next(error);
	}
	//if post is found
	return res.json(post);
};

//Route: api/posts/
const getAllPosts = async (req, res, next) => {
	try {
		const posts = await Post.find({}).populate([
			{
				path: "user",
				select: ["avatar", "name"],
			},
		]);
		return res.json(posts);
	} catch (error) {
		next(error);
	}
};

//export
module.exports = {
	createPost,
	updatePost,
	deletePost,
	getPost,
	getAllPosts,
};
