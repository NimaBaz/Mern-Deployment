import axios from 'axios';
import { Link } from "react-router-dom";
import ItemList from "../components/ItemList";
import React, { useEffect, useState } from "react";



const Main = () => {

    const [note, setNote] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/notes')
            .then(response => {
                console.log("This is our GET request: ", response)

                response.data.results.sort(function(a, b) {
                    let nameA = a.title.toLowerCase()
                    let nameB = b.title.toLowerCase()

                    if (nameA > nameB) {
                        return 1
                    }
                    else {
                        return -1
                    }
                })

                setNote(response.data.results)
                setLoaded(true)
            })
            .catch((err) => {
                console.log("This is our catch error: ", err)
            })
            console.log("This is called Asynchronous code")
    }, [])

    const removeFromDom = noteID => {
        setNote(note.filter(notes => notes._id !== noteID));
    }

    const sortByOldest = () => {
        axios.get('http://localhost:8000/api/notes')
            .then(response => {
                console.log("This is our GET request: ", response)

                response.data.results.sort(function(a, b) {
                    if (a > b) {
                        return -1
                    }
                    else {
                        return 1
                    }
                })

                setNote(response.data.results)
                setLoaded(true)

            })
    }

    const sortByNewest = () => {
        axios.get('http://localhost:8000/api/notes')
            .then(response => {
                console.log("This is our GET request: ", response)

                response.data.results.sort(function(a, b) {
                    if (a > b) {
                        return 1
                    }
                    else {
                        return -1
                    }
                })

                setNote(response.data.results)
                setLoaded(true)

            })
    }

    return (
        <div className="main">
            <h3>Leave a note</h3>

            <div className="btns">
                <button  onClick={sortByOldest} className='btn btn-warning'>Sort By Oldest</button>
                <button onClick={sortByNewest} className='btn btn-warning'>Sort By Newest</button>
            </div>

            {loaded && <ItemList note={note} removeFromDom={removeFromDom} />}

            <Link to={`/note`} className="btns">
                <button className='btn btn-warning'>Write Note</button>
            </Link>

        </div>
    );
};

export default Main;