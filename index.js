const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const {Server} = require('socket.io')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const api = config.GG_KEY

const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const expressServer = app.listen( config.PORT, () =>  {
  logger.info(`Server is running on ${config.PORT}`)
})

const io = new Server(expressServer, {
    cors:{
        origin: process.env.NODE_ENV === "production" ? "https://your-production-domain.com" : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', (socket) => {
    socket.on('chat-message', (text) => {
        console.log(text)
        model.generateContent(text).then(botRep => {
            socket.emit('bot-reply', botRep.response.text())
        }).catch(error => {
            next(error)
        })
    })
})