import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";



const ItemList = (props) => {

    const { removeFromDom } = props;
    
    const deleteItem = (noteID) => {
        axios.delete(`http://localhost:8000/api/notes/delete/${noteID}`)
            .then(response => {
                console.log("This item was removed: ", response)
                removeFromDom(noteID)
            })
            .catch((err) => {
                console.log("This is our catch error: ", err)
            })
            console.log("This is called Asynchronous code")
    }

    return (
        <div className='container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className='tabs'>Note</th>
                            <th scope="col" className='tabs'>Description</th>
                            <th scope="col" className='tabs'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.note.map((notes, idx) =>
                            <tr key={idx}>
                                <td className='tabs'><Link to={`/note/${notes._id}`} className="tabs">{notes.title}</Link></td>
                                <td className='tabs'>{notes.description}</td>
                                <td>
                                    <Link to={`/note/${notes._id}`} className="tabs">
                                        <button className='btn btn-outline-warning'>View</button>
                                    </Link>
                                    |
                                    <Link to={`/note/${notes._id}/edit`} className="tabs">
                                        <button className='btn btn-outline-light'>Edit</button>
                                    </Link>
                                    |
                                    <button onClick={() => {deleteItem(notes._id)}} className='btn btn-outline-danger'>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </div>
    )
}

export default ItemList;

