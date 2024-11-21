const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_STRING)
const TodoSchema = new mongoose.Schema({
    title: { type: String, default: "Default title" },
    description: { type: String, default: "Default description" },
    completed: { type: Boolean, default: false }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = {
    Todo
}