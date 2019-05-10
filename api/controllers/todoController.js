const Todos = require('../models/todoModel');

async function addTodo(req, callback) {
  const newTodo = new Todos(req);

  await newTodo
    .save()
    .then((res) => {
      console.log('Data saved:', res);
      return callback(true);
    })
    .catch((err) => {
      console.log('Saving err:', err);
      return callback(false);
    });
}

async function updateTodo(req, callback) {
  const { id, name, description } = req;
  await Todos
    .findByIdAndUpdate(id, { name, description })
    .then((res) => {
      console.log('Data saved:', res);
      return callback(true);
    })
    .catch((err) => {
      console.log('Saving err:', err);
      return callback(false);
    });
}

async function deleteTodo(req, callback) {
  const id = req;
  await Todos
    .findById(id)
    .then((res) => {
      res
        .remove()
        .then(() => {
          return callback(true);
        });
    })
    .catch((err) => {
      console.log('Saving err:', err);
      return callback(false);
    })
}

async function getTodos(io) {
  await Todos
    .find()
    .sort({ _id: -1 })
    .then((res) => io.sockets.emit('loadTodos', res))
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
}
