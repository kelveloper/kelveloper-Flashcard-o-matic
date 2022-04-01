import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readDeck, updateDeck } from "../utils/api";

export default function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const history = useHistory();


    useEffect(() => {
        readDeck(deckId).then((res) => {
            setDeck(res);
        })
    }, [deckId])


    const handleForm = ({ target }) => {
        setDeck({ ...deck, [target.name]: target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updateDeck(deck, abortController.signal).then((res) => {
            history.push(`/decks/${res.id}`);
        })
    }

    const handleCancel = (e) => {
        (e).preventDefault()
        history.goBack()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label" >Name</label>
            <input id="name" name="name" placeholder="Rendering in React" className="form-control mb-2" type="text" onChange={handleForm} value={deck.name || ""} required></input>
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" style={{ height: "100px" }} id="description" name="description" onChange={handleForm} value={deck.description || ""} required></textarea>
            <button className="btn btn-secondary mt-3 mr-3" onClick={handleCancel}>Cancel</button>
            <button className="btn btn-primary mt-3" type="submit">Submit</button>
        </form>
    )
}