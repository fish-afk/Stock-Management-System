const express = require("express");
const cors = require("cors");
const security = require("./middleware/Security");
const path = require("path");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors({ origin: "*" }));
app.use(security.securityMiddleware);
app.use("/static/images", express.static(path.join(__dirname, "images"))); //serve static images

const usersRouter = require("./routers/users");
const productCategoriesRouter = require("./routers/categories");
const customersRouter = require("./routers/customers");
const suppliersRouter = require("./routers/suppliers");
const warehousesRouter = require('./routers/warehouses')

const rateLimiter = rateLimit({
	windowMs: 3 * 60 * 1000, // 3 minutes
	max: 200, // Limit each IP to 200 requests
	message: {
		status: "FAILURE",
		message: "Too many requests, please try again later",
	},
	standardHeaders: true,
	legacyHeaders: false, // Disable the RateLimit headers
});

app.set("trust proxy", 1); // to trust loadbalancers like nginx so that, that ip doesn`t get rate limited.

app.use("/api/users", rateLimiter, usersRouter);
app.use("/api/productcategories", rateLimiter, productCategoriesRouter);
app.use("/api/customers", rateLimiter, customersRouter);
app.use("/api/suppliers", rateLimiter, suppliersRouter);
app.use('/api/warehouses', rateLimiter, warehousesRouter)

app.get("/", rateLimiter, (req, res) => {
	res.send("working test route");
});

//resolve all other routes to 404
app.get("*", rateLimiter, (req, res) => {
	res
		.status(404)
		.send({ status: "FAILURE", message: "Error 404 api route not found" });
});

app.listen(PORT, () => {
	console.log("Server Listening on Port " + PORT);
});
