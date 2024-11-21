import { useState, useEffect } from "react"
import axios from "axios"

export const Todos = () => {
    const [todos, settodos] = useState([]);
    useEffect(() => {
        const fetchTodo = async () => {
            const res = await axios.get("http://localhost:3000/todos")
            const data = res.data;
            settodos(data.todos)
        }
        fetchTodo()
    }, [todos])

    const markAsCompleted = async (todo) => {
        if (todo.completed == false) {
            const res = await axios.put("http://localhost:3000/completed", { id: todo.id })
            if (!res)
                alert("Error occured.")
            // else
            // alert(`${todo.title} marked as completed`)
        } else {
            alert(`${todo.title} already marked as completed.`)
        }
        return
    }

    const deleteTodo = async (todo) => {
        // NOTE : Data in delete request in axios needs to be sent inside a data key.
        await axios.delete("http://localhost:3000/delete", { data: { id: todo.id } })
        // alert("Todo deleted.")
        return
    }

    return <div style={styles.gridContainer}>
        {todos.map((todo) => (
            <div key={todo.id} style={styles.gridItem}>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <hr />
                <button
                    onClick={() => markAsCompleted(todo)}
                    style={styles.button}
                >
                    {todo.completed ? "Completed" : "Mark as completed"}
                </button><br />
                <button
                    onClick={() => deleteTodo(todo)}
                    style={styles.button}
                >
                    Delete
                </button>
            </div>
        ))}
    </div>
}

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 3fr)', // 6 columns
        gap: '20px', // Spacing between grid items

    },
    gridItem: {
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: 'black',
        textAlign: 'center',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 15px',
        margin: '0px 10px 5px 10px',
        backgroundColor: 'grey',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    p: {
        fontSize: "10 px"
    }
}