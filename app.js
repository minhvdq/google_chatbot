const express = require('express')
require('express-async-errors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middlewares')
const app = express()
const cors = require('cors')
const path = require('path')

// model.generateContent("how are you doing").then((result) => {
//     // console.log(result.response.text());
// })

app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app