import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

function ViewDecks() {
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then((res) => {
      setDeck(res);
      setCards(res.cards);
    })
  }, [deckId])

  function handleDeckDelete(id) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      history.go(0);
      deleteDeck(id)
    }
  }

  function handleCardDelete(id) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      history.go(0);
      deleteCard(id)
    }
  }



  return (
   <>
   <div className="view-decks">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="media mb-2">
        <div className="media-body">
          <h1>{deck.name}</h1>
          <p>{deck.description}</p>
          <Link to={{ pathname: `/decks/${deckId}/edit` }}><button className="btn btn-secondary m-2"><span className="oi oi-pencil" /> Edit</button>
          </Link>
          <Link to={{ pathname: `/decks/${deckId}/study` }}><button className="btn btn-primary m-2"><span className="oi oi-book" /> Study</button></Link>
          <Link to={{ pathname: `/decks/${deckId}/cards/new` }}> <button className="btn btn-primary m-2"><span className="oi oi-plus" /> Add Cards</button>
          </Link>
          <button onClick={(() => { handleDeckDelete(deck.id) })} className="btn btn-danger mb-2 float-right"><span className="oi oi-trash" /> </button>
        </div>
      </div>

        {cards.map((card) => (

          <div key={card.id} className="row">
            <div className="col-sm-8">
              <div className="card mb-3" >
                <div className="card-body">
                  <h5 className="card-title">{card.id}</h5>
                  <p className="card-text">{card.front}</p>
                  <p className="card-text">{card.back}</p>

                  <button onClick={(() => { handleCardDelete(card.id) })} className="btn btn-danger m-2 float-right"><span className="oi oi-trash" /></button>
                  <Link to={{ pathname: `/decks/${deckId}/cards/${card.id}/edit` }}><button className="btn btn-secondary m-2"><span className="oi oi-pencil" /> Edit</button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
</>
  );
}

export default ViewDecks;