import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck, listDecks } from "../utils/api";

/* Completed Design needed */

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function LoadDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    LoadDecks();
  }, []);

//delete button
  function handleDelete(event) {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      history.push("/");
      deleteDeck(event);
    }
  }

  return (
    <>
    <div>
      <Link to={"/decks/new"}><button className="btn btn-secondary m-2"><span className="oi oi-plus" /> Create Deck</button></Link>
      {decks.map((deck) => (
        <div key={deck.id} className="row">
          <div className="col-sm-6">
            <div className="card mb-3" >
              <div className="card-body">
              <div className='d-flex justify-content-between'>
                <h5>{deck.name}</h5>
                <p>{`${deck.cards.length} cards`}</p>
              </div>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}`}><button className="btn btn-secondary m-2"><span className="oi oi-eye" /> View</button></Link>
                <Link to={`/decks/${deck.id}/study`}><button className="btn btn-primary m-2"><span className="oi oi-book" /> Study</button></Link>
                <Link to="/"><button onClick={() => handleDelete(deck.id)} className="btn btn-danger m-2 float-right"><span className="oi oi-trash" /></button></Link>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
    </>
  )

}

export default Home;