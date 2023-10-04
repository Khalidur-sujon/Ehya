//external imports
const express = require("express");
//internal imports
const {
	createComment,
	updateComment,
	deleteComment,
} = require("../controllers/commentControllers");
const { authGuard, adminGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authGuard, createComment);
router
	.route("/:commentId")
	.put(authGuard, updateComment)
	.delete(authGuard, deleteComment);
//export
module.exports = router;
