import React, {Profiler, useContext, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {fetchDrawACard, fetchInitShuffleDeck} from '../../api';
import {DEFAULT_CARDS_NUMBER, useCardContext} from '../../context/Provider';
import {compareCards} from "../../utils/cardsComparison";

enum GUESS_VALUES {
  HIGHER,
  LOWER
}

function App() {
  const {
    cardsRemaining,
    setRemainingCard,
    setDeckId,
    deckId,
    updateDeckValue,
    isLoading,
    setIsLoading,
    setDrawCardResponse,
    drawCardResponse,
    nextCardResponse,
    score,
    setScore,
    setNextCardResponse,
  } = useCardContext();
  const [userGuess, setUserGuess] = useState<null | GUESS_VALUES>(null);

  useEffect(() => {
    fetchInitShuffleDeck().then(res => {
      if (res.data) {
        setDeckId(res.data.deck_id)
      }
    })
  }, []);

  useEffect(() => {
    if (deckId && cardsRemaining === DEFAULT_CARDS_NUMBER) {
      fetchDrawACard(deckId).then(res => {
        setDrawCardResponse(res.data.cards[0])
      })
    }
  }, [deckId]);

  const handleUserGuess = (guess: GUESS_VALUES) => {
    let comparisonResult;
    fetchDrawACard(deckId).then(res => {
      setDrawCardResponse(res.data.cards[0]);
      const currentCard = {
        suit: drawCardResponse.suit,
        value: drawCardResponse.value,
      }

      const nextCard = {
        suit: res.data.cards[0].suit,
        value: res.data.cards[0].value,
      }
      const getCardsComparison = compareCards(currentCard, nextCard);

      if (getCardsComparison < 0) {
        comparisonResult = GUESS_VALUES.LOWER
      } else if (getCardsComparison > 0) {
        comparisonResult = GUESS_VALUES.HIGHER
      }
      console.log('COMPARISON RES', guess, comparisonResult)
      comparisonResult === guess ? setScore(prev => prev + 1) : null;

    })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Card Game</Text>
      <Text>Current score {score}</Text>
      <Text>Cards left {cardsRemaining}</Text>
      <View style={styles.imageContainer}>
        <Text>Current card: {drawCardResponse?.code}. Value: {drawCardResponse?.value}. Suit: {drawCardResponse?.suit}</Text>
        {
          drawCardResponse?.image && (
            <Image
              resizeMode={'contain'} style={styles.card}
              source={{uri: drawCardResponse.image}}
            />)
        }
      </View>
      <View style={{ marginTop: 32 }}>
        <Pressable style={[styles.button, styles.buttonHigher]} onPressIn={() => handleUserGuess(GUESS_VALUES.HIGHER)}>
          <Text>The next card will have a higher value</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonLower]} onPressIn={() => handleUserGuess(GUESS_VALUES.LOWER)}>
          <Text>The next card will have a lower value</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  header: {
    fontSize: 32,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 8,
  },
  mainContainer: {
    marginHorizontal: 16,
    paddingTop: 22,
    height: '100%',
  },
  button: {
    marginVertical: 12,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center'
  },
  card: {
    marginTop: 22,
    height: 100,
    width: 80,
  },
  buttonHigher: {
    backgroundColor: 'green'
  },
  buttonLower: {
    backgroundColor: 'tomato'
  }
});

export default App;
