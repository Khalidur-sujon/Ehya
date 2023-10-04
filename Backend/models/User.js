//external imports
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
	{
		avatar: { type: String, default: "" },
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
		verificationCode: { type: Boolean, required: false },
		admin: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

// hash the password before saving
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
		return next();
	}
	return next();
});

//generate jwt token
userSchema.methods.generateJWT = async function () {
	const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
		expiresIn: "30d",
	});
	return token;
};

//comapare the given and hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = model("User", userSchema);

//export
module.exports = User;
