import React, { createContext, useState } from "react";

export const FlashcardsContext = createContext();

export function FlashcardsProvider({ children }) {
  const [decks, setDecks] = useState([]);

  const addDeck = (title) => {
    setDecks(prev => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        title,
        cards: [],
      }
    ]);
  };

  const addCardToDeck = (deckId, card) => {
    setDecks(prev =>
      prev.map(deck =>
        deck.id === deckId
          ? { ...deck, cards: [...deck.cards, card] }
          : deck
      )
    );
  };

  const deleteDeck = (deckId) => {
    setDecks(prev => prev.filter(deck => deck.id !== deckId));
  };

  const deleteCardFromDeck = (deckId, cardIndex) => {
    setDecks(prev =>
      prev.map(deck =>
        deck.id === deckId
          ? { ...deck, cards: deck.cards.filter((c, i) => i !== cardIndex) }
          : deck
      )
    );
  };

  const editCardInDeck = (deckId, cardIndex, newCard) => {
    setDecks(prev =>
      prev.map(deck =>
        deck.id === deckId
          ? {
              ...deck,
              cards: deck.cards.map((card, idx) =>
                idx === cardIndex ? newCard : card
              )
            }
          : deck
      )
    );
  };

  return (
    <FlashcardsContext.Provider
      value={{
        decks,
        addDeck,
        deleteDeck,
        addCardToDeck,
        deleteCardFromDeck,
        editCardInDeck,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
}
