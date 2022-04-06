import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

export default function CardEdit() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    async function getCardDeck() {
      const cardResponse = await readCard(cardId, abortController.signal);
      const deckResponse = await readDeck(deckId, abortController.signal);
      setCard(cardResponse);
      setDeck(deckResponse);
    }
    getCardDeck();
    return () => abortController.abort();
  }, [deckId, cardId, setDeck]);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await updateCard({ ...card });
    history.push(`/decks/${deckId}`);
    return response;
  }

  function breadCrumb() {
    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home mr-1"></span>
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Edit Card {cardId}</li>
      </ol>
    );
  }

  return (
    <div>
      {breadCrumb()}
      <h2>Edit Card</h2>
      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deckId={deckId}
        cardInput={card}
      />
    </div>
  );
}
