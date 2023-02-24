import axios from 'axios';
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Form = () => {

    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState("");

    const Create = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/notes/new', {
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
        <>
        <h2>Lets add in our notes!</h2>
        {errors.map((err, index) => <p key={index} className="tabs">{err}</p>)}
        <form onSubmit={Create} className="form-group">
            
            <label>Note Title: </label>
            <input className="form-control" type="text" onChange={e => setTitle(e.target.value)} value={title} />

            <label> Description: </label>
            <input className="form-control" type="text" onChange={e => setDescription(e.target.value)} value={description} />

            <button onClick={Create} className='btn btn-warning'>Create</button>
            |
            <Link to={"/"} className="tabs">
                <button  className='btn btn-warning'>Cancel</button>
            </Link>
        </form>
        </>
    );
}

export default Form;