import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";



const Details = (props) => {

    const { id } = useParams();
    const navigate = useNavigate()
    const { removeFromDom } = props;
    const [note, setNote] = useState();
    
    const deleteItem = (noteID) => {
        axios.delete(`http://localhost:8000/api/notes/delete/${noteID}`)
            .then(response => {
                console.log("This item was removed: ", response)
                removeFromDom(noteID)
            })
            .catch((err) => {
                console.log("This is our catch error: ", err)
            })
            navigate('/')
            console.log("This is called Asynchronous code")
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/notes/${id}`)
            .then(response => {
                console.log("This is our GET request: ", response)
                setNote(response.data.results)
            })
            .catch((err) => {
                console.log("This is our catch error: ", err)
            })
            console.log("This is called Asynchronous code")
    }, [id])

    return (
        <div>
            {
                (note || (note === ""))?
                <ul>
                    <li>Author: {note.author}</li>
                    <li>Description: {note.description}</li>
                    <Link to={"/"} className="tabs">
                        <button  className='btn btn-outline-light'>Back</button>
                    </Link>
                    |
                    <Link to={`/note/${note._id}/edit`} className="tabs">
                        <button className='btn btn-outline-warning'>Edit</button>
                    </Link>
                    |
                    <button onClick={() => {deleteItem(note._id)}} className='btn btn-outline-danger'>Delete</button>
                </ul>:
                <h1>Something went wrong.</h1>
            }
        </div>
    )
}

export default Details;