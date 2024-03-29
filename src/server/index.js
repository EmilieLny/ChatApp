let app = require('http').createServer();
let io = module.exports.io = require('socket.io')(app);


const PORT = process.env.PORT || 5000;

const SocketManager = require('./SocketManager');

io.on('connection', SocketManager);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
