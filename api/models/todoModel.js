const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todos = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  },
  {
    collection: 'todos'
  }
);

module.exports = mongoose.model('todos', Todos);
