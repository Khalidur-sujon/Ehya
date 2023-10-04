//exernal imports
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	//destination , filename
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "../uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const uploadPicture = multer({
	storage: storage,
	//filtering options
	limits: {
		fileSize: 1 * 1000000,
	},
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname);
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
			return cb(new Error("Only images are allowed"));
		}
		cb(null, true);
	},
});

//exprot
module.exports = uploadPicture;
