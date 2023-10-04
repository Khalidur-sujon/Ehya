//external imports
const express = require("express");
//internal imports
const {
	createPost,
	updatePost,
	deletePost,
	getPost,
	getAllPosts,
} = require("../controllers/postControllers");
const { authGuard, adminGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts);
router
	.route("/:slug")
	.put(authGuard, adminGuard, updatePost)
	.delete(authGuard, adminGuard, deletePost)
	.get(getPost);

//export
module.exports = router;
