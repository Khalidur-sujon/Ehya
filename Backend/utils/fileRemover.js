//external imports
const fs = require("fs");
const path = require("path");

const fileRemover = (filename) => {
	fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
		if (err && err.code == "ENOENT") {
			//doesnot exist
			console.log(`File ${filename} does not exist, won't remove it. `);
		} else if (err) {
			//failed to remove
			console.log(
				`Error occured while trying to remove the file ${filename}`
			);
		} else {
			//remove succcessfull
			console.log(`Removed ${filename}`);
		}
	});
};

//export
module.exports = { fileRemover };
