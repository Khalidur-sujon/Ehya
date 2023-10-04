//external imports
const express = require("express");
//internal imports
const {
	registerUser,
	loginUser,
	userProfile,
	updateProfile,
	updatedUserProfilePicture,
} = require("../controllers/userControllers");
const { authGuard } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateUserProflePicture", authGuard, updatedUserProfilePicture);

//export
module.exports = router;
