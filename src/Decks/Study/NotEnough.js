import React from "react";
import { Link } from "react-router-dom";

function NotEnough({ deckId, cardCount }) {
    return (
        <div className="notEnough">
            <h2>Not enough cards.</h2>
            <p>
                You need at least 3 cards to study. There are {cardCount} cards in this deck.
            </p>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                <span className="oi oi-plus" /> Add Cards
            </Link>
        </div>
    )
}

export default NotEnough;