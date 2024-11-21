const express = require("express");
const validation = require("./validation");
const dbSchemas = require("./db/dbSchemas");
const dotenv = require("dotenv");
const cors = require("cors");


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// Body : title(string), description(string)
app.post("/todo", async (req, res) => {
    const isDataClean = validation.createTodo(req.body);
    if (!isDataClean) {
        return res.status(411).json({ message: "You sent wrong inputs..." })
    }
    const title = req.body.title;
    const description = req.body.description;
    try {
        const dbResult = await dbSchemas.Todo.create({ title, description })
        res.status(200).json({ message: "Todo created successfully !" })
    } catch (e) {
        res.status(500).json({ message: "Internal server error..." })
    }
})

app.get("/todo", async (req, res) => {
    const isDataClean = validation.checkId(req.body);
    if (!isDataClean) {
        return res.status(411).json({ message: "You sent wrong inputs..." })
    }
    const todoId = req.body.id;
    try {
        const todo = await dbSchemas.Todo.findOne({ _id: todoId })
        if (todo) {
            return res.status(200).json({ title: todo.title, description: todo.description, completed: todo.completed })
        } else {
            return res.status(200).json({ message: "No todo found !" })
        }
    } catch (e) {
        return res.status(500).json({ message: "Internal server error..." })
    }
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await dbSchemas.Todo.find({})
        if (todos) {
            return res.status(200).json({
                todos: todos.map((todo) => {
                    return { id: todo.id, title: todo.title, description: todo.description, completed: todo.completed }
                })
            })
        } else {
            return res.status(200).json({ message: "No todo found !" })
        }
    } catch (e) {
        return res.status(500).json({ message: "Internal server error..." })
    }
})

app.put("/completed", async (req, res) => {
    const isDataClean = validation.checkId(req.body);
    if (!isDataClean) {
        return res.status(411).json({ message: "You sent wrong inputs..." })
    }
    const todoId = req.body.id;
    try {
        const { completed } = await dbSchemas.Todo.findOne({ _id: todoId })
        if (completed) {
            return res.status(200).json({ message: "The todo is already completed" })
        } else {
            try {
                await dbSchemas.Todo.updateOne({ _id: todoId }, { completed: true })
                return res.status(200).json({ message: "Status updated successfully !" })
            } catch (e) {
                res.status(500).json({ message: "Internal server error..." })
            }
        }
    } catch (e) {
        res.status(500).json({ message: "Internal server error..." })
    }

})

app.delete("/delete", async (req, res) => {
    const isDataClean = validation.checkId(req.body);
    if (!isDataClean) {
        return res.status(411).json({ message: "You sent wrong inputs..." })
    }
    const todoID = req.body.id;
    try {
        const data = await dbSchemas.Todo.deleteOne({ _id: todoID })
        return res.status(200).json({ message: "Todo Deleted successfully" })
    } catch (e) {
        res.status(500).json({ message: "Internal server error..." })
    }
})

app.listen(3000, '0.0.0.0', () => { console.log("The server is on..."); })