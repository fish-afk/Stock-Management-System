const express = require("express");
const cors = require("cors");
require("dotenv").config();
const security = require("./middleware/Security");
const path = require("path"); // Import the path module

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: "*" }));
app.use(security.securityMiddleware);

// Serve static files from the /images folder
app.use("/static/images", express.static(path.join(__dirname, "images")));

const usersRouter = require("./routers/users");
const productCategoriesRouter = require("./routers/categories");
app.use("/api/users", usersRouter);
app.use("/api/productcategories", productCategoriesRouter);

app.get("/", (req, res) => {
	res.send("working");
});

app.listen(PORT, () => {
	console.log("Server Listening on Port " + PORT);
});
