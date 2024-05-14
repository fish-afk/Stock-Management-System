const { pool } = require("../models/_mysql");
const path = require("path");
const { Parser } = require("json2csv");
const fs = require("fs");
const archiver = require("archiver");

async function getTables(pool) {
	const [tables] = await pool.query("SHOW TABLES");
	return tables.map((row) => Object.values(row)[0]);
}

async function exportTableToCsv(pool, tableName, outputDir) {
	const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
	const json2csvParser = new Parser();
	const csv = json2csvParser.parse(rows);
	const filename = path.join(outputDir, `${tableName}.csv`);
	fs.writeFileSync(filename, csv);
	return filename;
}

async function exportDbToJson(pool, tables) {
	const data = {};

	for (const table of tables) {
		const [rows] = await pool.query(`SELECT * FROM \`${table}\``);
		data[table] = rows;
	}

	return data;
}

async function exportDbToCSV(outputZip, tables) {
	const outputDir = path.join(__dirname, "../tmpexports");

	// Create exports directory if it doesn't exist
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}
	try {
		const files = [];

		for (const table of tables) {
			const file = await exportTableToCsv(pool, table, outputDir);
			files.push(file);
		}

		// Create a file to stream archive data to.
		const output = fs.createWriteStream(outputZip);
		const archive = archiver("zip", { zlib: { level: 9 } });

		// Listen for all archive data to be written
		output.on("close", () => {
			console.log(`${archive.pointer()} total bytes`);
			console.log(
				"Archiver has been finalized and the output file descriptor has closed.",
			);
		});

		archive.on("error", (err) => {
			throw err;
		});

		// Pipe archive data to the file
		archive.pipe(output);

		// Append files to the archive
		files.forEach((file) => {
			archive.file(file, { name: path.basename(file) });
		});

		await archive.finalize();
		console.log(`Database has been exported and archived to ${outputZip}`);
	} catch (err) {
		console.error("Error exporting database:", err);
	} finally {
		fs.rmSync(outputDir, { recursive: true, force: true });
	}
}

const SystemDataExporter = async (req, res) => {
	if (req.decoded.role_id != 1) {
		return res.send({
			status: "FAILURE",
			message: "insufficient privileges",
		});
	}
	
	const option = req.body.option || "csv"; // default to 'csv' if no format is specified

	if (option != "csv" && option != "json") {
		res.send({
			status: "FAILURE",
			message: "Invalid format. Use 'csv' or 'json'.",
		});
	}

	if (option == "json") {
		const tables = await getTables(pool);
		const data = await exportDbToJson(pool, tables);
		return res.send({ status: "SUCCESS", data: data });
	} else {
		const tables = await getTables(pool);
		const outputZipDir = path.join(__dirname, "../dbexports");
		const outputZip = path.join(__dirname, "../dbexports/database_export.zip");

		// Create exports directory if it doesn't exist
		if (!fs.existsSync(outputZipDir)) {
			fs.mkdirSync(outputZipDir);
		}

		try {
			await exportDbToCSV(outputZip, tables);
			setTimeout(async () => {
				await res.download(outputZip, (err) => {
					if (err) {
						console.error("Error sending file:", err);
						res.status(500).send("Error downloading file");
					} else {
						// Delete the zip file after download
						fs.unlinkSync(outputZip);
					}
				});
			}, 1000); // Delay to ensure file closure
		} catch (err) {
			console.error("Error exporting database:", err);
			res.status(500).send("Error exporting database");
		}
	}
};

const InventoryDataExporter = async (req, res) => {
	const option = req.body.option || "csv"; // default to 'csv' if no format is specified

	if (option != "csv" && option != "json") {
		res.send({
			status: "FAILURE",
			message: "Invalid format. Use 'csv' or 'json'.",
		});
	}

	if (option == "json") {
		const tables = [
			"purchases",
			"sales",
			"products",
			"customers",
			"suppliers",
			"warehouses",
		];
		const data = await exportDbToJson(pool, tables);
		return res.send({ status: "SUCCESS", data: data });
	} else {
		const tables = [
			"purchases",
			"sales",
			"products",
			"customers",
			"suppliers",
			"warehouses",
		];
		const outputZipDir = path.join(__dirname, "../dbexports");
		const outputZip = path.join(__dirname, "../dbexports/inventory_data_export.zip");

		// Create exports directory if it doesn't exist
		if (!fs.existsSync(outputZipDir)) {
			fs.mkdirSync(outputZipDir);
		}

		try {
			await exportDbToCSV(outputZip, tables);
			setTimeout(async () => {
				await res.download(outputZip, (err) => {
					if (err) {
						console.error("Error sending file:", err);
						res.status(500).send("Error downloading file");
					} else {
						// Delete the zip file after download
						fs.unlinkSync(outputZip);
					}
				});
			}, 1000); // Delay to ensure file closure
		} catch (err) {
			console.error("Error exporting database:", err);
			res.status(500).send("Error exporting database");
		}
	}
};

module.exports = {
	SystemDataExporter,
	InventoryDataExporter,
};
