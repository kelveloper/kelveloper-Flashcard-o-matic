import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";
import StudyPage from "./StudyPage";
import NotEnough from "./NotEnough";

export default function Study() {
    //The path to this screen should include the deckId
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ cards: [] });
    const [cardNum, setCardNum] = useState(1);
    const history = useHistory();

    useEffect(() => {
    async function GetDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    GetDeck();
  }, [deckId]);
  
    const cardCount = deck.cards.length;
    const nextCard = () => {
        if (cardNum === cardCount) {
            const returnHome = !window.confirm(
                "Restart cards?\n\nClick 'cancel' to return to the home page."
            );
            return returnHome ? history.push("/") : setCardNum(1)
        }
        setCardNum((prevState) => Math.min(cardCount, prevState + 1))
    }

    const cardTitle = `Card ${cardNum} of ${cardCount}`;
    const card = deck.cards[cardNum - 1];

    if (cardCount <= 2) {
        return (
            <StudyPage name={deck.name} deckId={deckId}>
                <NotEnough cardCount={cardCount} deckId={deckId} />
            </StudyPage>

        )
    }
    return (
        <StudyPage name={deck.name} deckId={deckId}>
            <StudyCard card={card} title={cardTitle}>
                <button type="button" className="btn btn-primary m-2" onClick={nextCard}>
                    Next
                </button>
            </StudyCard>
        </StudyPage>
    )

}