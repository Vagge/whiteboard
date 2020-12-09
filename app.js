const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', function(socket) {
    console.log("user connected");
    socket.on('drawClick', function(data) {
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
  });

const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');
const whiteboardRoute = require('./routes/whiteboards');
const bodyParser = require('body-parser');
require('dotenv/config')
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use('/posts', postsRoute);
app.use('/whiteboard', whiteboardRoute);
app.set("view engine", "ejs"); 
mongoose.connect('mongodb+srv://Vagge:vagge@cluster0.3pt4a.mongodb.net/WhiteBoard?retryWrites=true&w=majority', { useNewUrlParser: true },()=>
{
    console.log("connected");
});

server.listen(3000);