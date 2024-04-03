const multer = require("multer");
const path = require("path");

// Define an array of allowed file extensions
const allowedFileExtensions = [
	".jpeg",
	".jpg",
	".png",
];

// Create a custom file filter function
const fileFilter = (req, file, cb) => {
	const fileExtension = path.extname(file.originalname).toLowerCase();

	if (
		allowedFileExtensions.includes(fileExtension) ||
		file.mimetype.startsWith("image/")
	) {
		// Allow the file to be uploaded
		cb(null, true);
	} else {
		// Reject the file
		cb({ message: "File type not supported", status: false });
	}
};

// Configure multer with the custom file filter
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./images/");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname;
		const fileExtension = path.extname(fileName);
		const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + fileExtension);
	},
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { upload };