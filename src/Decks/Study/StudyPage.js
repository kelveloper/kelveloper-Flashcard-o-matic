import React from "react";
import { Link } from "react-router-dom";

function StudyPage({ deckId, name, children }) {
    return (
        <main className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" /> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        <Link to={`/decks${deckId}`}>{name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
            </nav>
            <h1>Study: {name}</h1>
            {children}
        </main>
    )
}

export default StudyPage;