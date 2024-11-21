import axios from "axios";
import { useState } from "react";


export const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return <div>
        <input type="text" onChange={(e) => {
            const value =  e.target.value;
            setTitle(value);
        }} placeholder="title" /><br /><br />
        <input type="text" onChange={(e) => {
            const value = e.target.value;
            setDescription(value);
        }} placeholder="description" /><br /><br />


        <button onClick={async () => {
            try {
                const res = await axios.post("http://localhost:3000/todo", {
                    title: title,
                    description: description
                });
                // Handle success
                const json = res.data;
                console.log(res.data.message);
                // Optionally, alert with success message
                // alert(json.message);

            } catch (error) {
                // Handle error response
                if (error.response) {
                    // Server responded with a status other than 2xx
                    alert(error.response.data.message);
                } else {
                    // Something went wrong with the request itself
                    alert("Something went wrong! Please try again.");
                }
            }
        }}>Add a Todo</button>

    </div >
}

