const express = require("express");
const cors = require("cors");
require("dotenv").config();
const security = require("./middleware/Security");
const path = require("path"); 

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors({ origin: "*" }));
app.use(security.securityMiddleware);

// Serve static files from the /images folder
app.use("/static/images", express.static(path.join(__dirname, "images")));

const usersRouter = require("./routers/users");
const productCategoriesRouter = require("./routers/categories");
const customersRouter = require('./routers/customers');
const suppliersRouter = require('./routers/suppliers')

app.use("/api/users", usersRouter);
app.use("/api/productcategories", productCategoriesRouter);
app.use("/api/customers", customersRouter);
app.use('/api/suppliers', suppliersRouter)

app.get("/", (req, res) => {
	res.send("working");
});

app.listen(PORT, () => {
	console.log("Server Listening on Port " + PORT);
});
