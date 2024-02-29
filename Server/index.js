const express = require('express')
const cors = require('cors')
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json({ limit: "10mb" })); // max request size 10 mb
app.use(cors({ origin: "*" }))

const usersRouter = require("./routers/users");
app.use("/api/users", usersRouter);

app.get('/', (req, res) => {
    res.send('working')
})

app.listen(3000, () => {
    console.log('Server Listening on Port ' + PORT)
})

