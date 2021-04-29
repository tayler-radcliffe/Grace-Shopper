require('dotenv').config();

const {PORT = 3000} = process.env
const express = require('express');
const server = express();

const cors = require("cors");
server.use(cors())

server.use(express.json())

const morgan = require("morgan");
server.use(morgan("dev"));

const client = require('./db/client.js');


const apiRouter = require("./api");
server.use("/api", apiRouter);

server.use((req, res, next) => {
    res.status(404).send('Page Not Found')
})

server.use((err, req, res, next) => {
    console.error('ERROR', err)
    res.status(500).json({error: err})
})

server.listen(PORT, () => {
    console.log("The server is up on port", PORT)
})

client.connect();

