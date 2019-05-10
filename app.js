require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const config = require('./api/config/database');
const { addTodo, updateTodo, deleteTodo, getTodos } = require('./api/controllers/todoController');

mongoose.Promise = global.Promise;
mongoose
  .connect(
    config.database, 
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB error', err));

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

io.sockets.on('connection', (socket) => {
  socket.on('newTodo', (req, callback) => {
    addTodo(req, callback);
    getTodos(io);
  });

  socket.on('updateTodo', (req, callback) => {
    updateTodo(req, callback);
    getTodos(io);
  });

  socket.on('deleteTodo', (req, callback) => {
    deleteTodo(req, callback);
    getTodos(io);
  });

  setInterval(() => {
    getTodos(io);
  }, 1500);
});

server.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Server error:', err);
  }

  console.log(`Server open:`, process.env.PORT);
});