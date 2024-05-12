const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createImageDirectories = () => {
	const baseDir = "images";
	const productsDir = `${baseDir}/products`;
	const productcategoriesDir = `${baseDir}/product_categories`;
	const purchasesDir = `${baseDir}/purchases`;
	const salesDir = `${baseDir}/sales`;
	const warehousesDir = `${baseDir}/warehouses`;

	if (!fs.existsSync(baseDir)) {
		fs.mkdirSync(baseDir);
		console.log(`Directory '${baseDir}' created for storing dynamic images.`);
	}

	if (!fs.existsSync(productsDir)) {
		fs.mkdirSync(productsDir);
	}

	if (!fs.existsSync(productcategoriesDir)) {
		fs.mkdirSync(productcategoriesDir);
	}

	if (!fs.existsSync(purchasesDir)) {
		fs.mkdirSync(purchasesDir);
	}

	if (!fs.existsSync(salesDir)) {
		fs.mkdirSync(salesDir);
	}

	if (!fs.existsSync(warehousesDir)) {
		fs.mkdirSync(warehousesDir);
	}
};

// Define an array of allowed file extensions
const allowedFileExtensions = [
	".jpeg",
	".jpg",
	".png",
	".bmp",
	".webp",
	".pdf",
	".docx",
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
		cb({ message: "File type not supported", status: "FAILURE" });
	}
};

// Configure multer with the custom file filter
const storage1 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./images/sales");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname;
		const fileExtension = path.extname(fileName);
		const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + fileExtension);
	},
});

const storage2 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./images/purchases");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname;
		const fileExtension = path.extname(fileName);
		const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + fileExtension);
	},
});

const storage3 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./images/warehouses");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname;
		const fileExtension = path.extname(fileName);
		const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + fileExtension);
	},
});

const storage4 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./images/products");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname;
		const fileExtension = path.extname(fileName);
		const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + fileExtension);
	},
});

const storage5 = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./images/product_categories");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname;
		const fileExtension = path.extname(fileName);
		const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + fileExtension);
	},
});

const upload1 = multer({ storage: storage1, fileFilter: fileFilter });
const upload2 = multer({ storage: storage2, fileFilter: fileFilter });
const upload3 = multer({ storage: storage3, fileFilter: fileFilter });
const upload4 = multer({ storage: storage4, fileFilter: fileFilter });
const upload5 = multer({ storage: storage5, fileFilter: fileFilter });

module.exports = {
	upload1,
	upload2,
	upload3,
	upload4,
	upload5,
	createImageDirectories,
};
