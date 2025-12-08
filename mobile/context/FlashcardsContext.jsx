import React, { createContext, useState, useEffect } from "react";
import { flashcardAPI } from "../services/api";
import { useAuthStore } from "./AuthStore";

export const FlashcardsContext = createContext();

export function FlashcardsProvider({ children }) {
  const { user } = useAuthStore();
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch decks when user logs in
  useEffect(() => {
    if (user?._id) {
      fetchDecks();
    } else {
      setDecks([]);
    }
  }, [user?._id]);

  // Fetch all decks from backend
  const fetchDecks = async () => {
    if (!user?._id) return;

    try {
      setIsLoading(true);
      const response = await flashcardAPI.getDecks(user._id);
      if (response.success) {
        setDecks(response.decks);
      }
    } catch (error) {
      console.log("Error fetching decks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDeck = async (title) => {
    if (!user?._id) {
      console.log("No user logged in");
      return;
    }

    try {
      const response = await flashcardAPI.createDeck(user._id, title);
      if (response.success) {
        setDecks(prev => [response.deck, ...prev]);
      }
    } catch (error) {
      console.log("Error adding deck:", error);
    }
  };

  const addCardToDeck = async (deckId, card) => {
    if (!user?._id) {
      console.log("No user logged in");
      return;
    }

    try {
      const response = await flashcardAPI.addCard(
        deckId,
        user._id,
        card.question,
        card.answer
      );

      if (response.success) {
        setDecks(prev =>
          prev.map(deck =>
            deck.id === deckId
              ? { ...deck, cards: [...deck.cards, response.card] }
              : deck
          )
        );
      }
    } catch (error) {
      console.log("Error adding card:", error);
    }
  };

  const deleteDeck = async (deckId) => {
    if (!user?._id) {
      console.log("No user logged in");
      return;
    }

    try {
      const response = await flashcardAPI.deleteDeck(deckId, user._id);
      if (response.success) {
        setDecks(prev => prev.filter(deck => deck.id !== deckId));
      }
    } catch (error) {
      console.log("Error deleting deck:", error);
    }
  };

  const deleteCardFromDeck = async (deckId, cardIndex) => {
    if (!user?._id) {
      console.log("No user logged in");
      return;
    }

    try {
      const deck = decks.find(d => d.id === deckId);
      if (!deck || !deck.cards[cardIndex]) return;

      const cardId = deck.cards[cardIndex].id;
      const response = await flashcardAPI.deleteCard(deckId, cardId, user._id);

      if (response.success) {
        setDecks(prev =>
          prev.map(deck =>
            deck.id === deckId
              ? { ...deck, cards: deck.cards.filter((c, i) => i !== cardIndex) }
              : deck
          )
        );
      }
    } catch (error) {
      console.log("Error deleting card:", error);
    }
  };

  const editCardInDeck = async (deckId, cardIndex, newCard) => {
    if (!user?._id) {
      console.log("No user logged in");
      return;
    }

    try {
      const deck = decks.find(d => d.id === deckId);
      if (!deck || !deck.cards[cardIndex]) return;

      const cardId = deck.cards[cardIndex].id;
      const response = await flashcardAPI.updateCard(
        deckId,
        cardId,
        user._id,
        newCard.question,
        newCard.answer
      );

      if (response.success) {
        setDecks(prev =>
          prev.map(deck =>
            deck.id === deckId
              ? {
                ...deck,
                cards: deck.cards.map((card, idx) =>
                  idx === cardIndex ? response.card : card
                )
              }
              : deck
          )
        );
      }
    } catch (error) {
      console.log("Error editing card:", error);
    }
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
        isLoading,
        fetchDecks,
      }}
    >
      {children}
    </FlashcardsContext.Provider>
  );
}
