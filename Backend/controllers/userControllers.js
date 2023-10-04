//internal imports
const User = require("../models/User");
const uploadPicture = require("../middleware/uploadPictureMiddleware");
const { fileRemover } = require("../utils/fileRemover");

//Route: api/users/register
const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		//check weather user exists or not
		let user = await User.findOne({ email });

		if (user) {
			throw new Error("User have already registered.");
		}

		//if user not exists, then create one
		user = await User.create({
			name,
			email,
			password,
		});

		return res.status(200).json({
			_id: user._id,
			avatar: user.avatar,
			name: user.name,
			email: user.email,
			verified: user.verified,
			admin: user.admin,
			token: await user.generateJWT(),
		});
	} catch (error) {
		next(error);
	}
};

//Route: api/users/login

const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		//check weather user exists or not
		let user = await User.findOne({ email });

		//if user not exists
		if (!user) {
			throw new Error("Email Not Found");
		}
		//if user found , then compare the password
		if (await user.comparePassword(password)) {
			return res.status(200).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
				token: await user.generateJWT(),
			});
		} else {
			throw new Error("Invalid password");
		}
	} catch (error) {
		next(error);
	}
};

// get user profile
//Route: api/users/profile
const userProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);
		if (user) {
			return res.status(200).json({
				_id: user._id,
				avatar: user.avatar,
				name: user.name,
				email: user.email,
				verified: user.verified,
				admin: user.admin,
			});
		} else {
			let error = new Error("User not Found ");
			error.statusCode = 404;
			next(error);
		}
	} catch (error) {
		next(error);
	}
};

// update user info
// Route : api/users/updateProfile

const updateProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);

		if (!user) {
			throw new Error("User Not Found");
		}

		//if user is found , then update the info
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password && req.body.password.length < 6) {
			throw new Error("Password length must be at least 6 character.");
		} else if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUserProfleInfo = await user.save();

		res.json({
			_id: user._id,
			avatar: updatedUserProfleInfo.avatar,
			name: updatedUserProfleInfo.name,
			email: updatedUserProfleInfo.email,
			verified: updatedUserProfleInfo.verified,
			admin: updatedUserProfleInfo.admin,
			token: await updatedUserProfleInfo.generateJWT(),
		});
	} catch (error) {
		next(error);
	}
};

// update user info
// Route : api/users/updateProfilePicture

const updatedUserProfilePicture = async (req, res, next) => {
	try {
		const upload = uploadPicture.single("profilePicture");

		upload(req, res, async function (err) {
			if (err) {
				const error = new Error("An error occured when uploading.");
				next(error);
			} else {
				//everything went well
				if (req.file) {
					let filename;
					const updatedUser = await User.findById(req.user._id);

					//we want to delete old picture file after updating the new one
					filename = updatedUser.avatar;
					if (filename) {
						fileRemover(filename);
					}
					updatedUser.avatar = req.file.filename;

					await updatedUser.save();

					res.json({
						_id: updatedUser._id,
						avatar: updatedUser.avatar,
						name: updatedUser.name,
						email: updatedUser.email,
						verified: updatedUser.verified,
						admin: updatedUser.admin,
						token: await updatedUser.generateJWT(),
					});
				} else {
					//if there is no file
					let filename;
					let updateUser = await User.findById(req.user._id);
					filename = updateUser.avatar;
					updateUser.avatar = "";
					await updateUser.save();
					fileRemover(filename);
					res.json({
						_id: updateUser._id,
						avatar: updateUser.avatar,
						name: updateUser.name,
						email: updateUser.email,
						verified: updateUser.verified,
						admin: updateUser.admin,
						token: await updateUser.generateJWT(),
					});
				}
			}
		});
	} catch (error) {
		next(error);
	}
};

//export
module.exports = {
	registerUser,
	loginUser,
	userProfile,
	updateProfile,
	updatedUserProfilePicture,
};
