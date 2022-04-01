import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Decks/HomeDeck";
import ViewDecks from "../Decks/ViewDeck";
import Study from "../Decks/Study/Study";
import EditDeck from "../Decks/EditDeck";
import CreateDeck from "../Decks/CreateDeck";
import CreateCard from "../Cards/CreateCard";
import CardEdit from "../Cards/EditCard";



function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch >
          <Route exact path="/">
            < Home />
          </Route>
          <Route exact path="/decks/:deckId/study">
            < Study />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>  
          <Route exact path="/decks/:deckId">
            <ViewDecks />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
