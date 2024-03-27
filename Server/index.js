const express = require('express')
const cors = require('cors')
require("dotenv").config();
const security = require('./middleware/Security')

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json({ limit: "10mb" })); // max request size 10 mb
app.use(cors({ origin: "*" }))
app.use(security.securityMiddleware)

const usersRouter = require("./routers/users");
const productCategoriesRouter = require('./routers/categories');
app.use("/api/users", usersRouter);
app.use("/api/productcategories", productCategoriesRouter)

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(3000, () => {
    console.log('Server Listening on Port ' + PORT)
})

