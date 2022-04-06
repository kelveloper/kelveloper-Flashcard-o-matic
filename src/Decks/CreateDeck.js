import React, { useState } from "react";
import { useHistory } from "react-router";
import { createDeck } from "../utils/api";


export default function CreateDeck() {
    const [deck, setDeck] = useState([]);
    const history = useHistory();


    const handleForm = ({ target }) => {
        setDeck({ ...deck, [target.name]: target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        createDeck(deck, abortController.singal).then(() => {
            history.push("/");
        })
    }


    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/">
                            <span className="oi oi-home mr-1" />
                            Home
                        </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label">Name</label>
                <input id="name" name="name" placeholder="Deck Name" className="form-control mb-2" type="text" onChange={handleForm} required></input>
                <label htmlFor="description" className="form-label">Description</label>
                <textarea placeholder="Brief Description of Deck" className="form-control" style={{ height: "100px" }} id="description" name="description" onChange={handleForm} required></textarea>
                <button className="btn btn-primary mt-3" type="submit">Submit</button>
            </form>
        </>
    )
}