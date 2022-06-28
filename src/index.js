const http = require('http')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const socketio = require('socket.io')()

require('./config/mongo')

const WebSockets = require('./utils/WebSockets')

const indexRouter = require('./routes/index.route')
const userRouter = require('./routes/user.route')
const chatRoomRouter = require('./routes/chatRoom.route')
const deleteRouter = require('./routes/delete.route')
const { decode } = require('./middlewares/jwt.js')

const app = express();

const PORT = process.env.PORT || 3000;
app.set('port', PORT)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/room', decode, chatRoomRouter)
app.use('/delete', deleteRouter)


app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

const server = http.createServer(app);

global.io = socketio.listen(server)
global.io.on('connection', WebSockets.connection)

server.listen(PORT);
server.on("listening", () => {
    console.log(`Listening on port ${PORT}...`)
});