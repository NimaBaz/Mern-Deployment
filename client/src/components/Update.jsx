import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";


const Update = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                console.log("This is our GET request: ", response)
                setTitle(response.data.results.title)
                setDescription(response.data.results.description)
            })
            .catch((err) => {
                console.log("This is our catch error: ", err)
            })
            console.log("This is called Asynchronous code")
    }, [id])

    const updateItem = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/notes/update/${id}`, {
            title,
            description
        })
        .then((response) => {
            console.log("This is our GET request: ", response)
            navigate('/')
        })
        .catch(err=>{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key in errorResponse) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        })
        console.log("This is called Asynchronous code")
    }

    return (
        <div>
            <h1>Update your notes!</h1>
            {errors.map((err, index) => <p key={index} className="tabs">{err}</p>)}
            <form onSubmit={updateItem} className="form-group">

                <label>Note Title: </label>
                <input className="form-control" type="text" onChange={e => setTitle(e.target.value)} value={title} />

                <label> Description: </label>
                <input className="form-control" type="text" onChange={e => setDescription(e.target.value)} value={description} />

                <button onClick={updateItem} className='btn btn-warning'>Submit</button>
                <Link to={"/"} className="tabs">
                    <button  className='btn btn-warning'>Cancel</button>
                </Link>
            </form>
        </div>
    );
}

export default Update;