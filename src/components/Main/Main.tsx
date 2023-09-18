import React, {Profiler, useContext, useEffect} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fetchDrawACard, fetchInitShuffleDeck} from '../../api';
import {DEFAULT_CARDS_NUMBER, useCardContext} from '../../context/Provider';

function App() {
  const { cardsRemaining, setRemainingCard, setDeckId, deckId, updateDeckValue, isLoading, setIsLoading, setDrawCardResponse, drawCardResponse } = useCardContext();

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Card Game</Text>
      <Text>DeckId {deckId}</Text>
      <Text>Cards left {cardsRemaining}</Text>
      <View style={styles.imageContainer}>
        <Text>Current card:</Text>
        <Image resizeMode={'contain'} style={styles.card} source={{
          uri: drawCardResponse.image,
        }}/>
      </View>
      <View>
        <Pressable style={styles.button} onPressIn={() => console.log('Draw a card')}>
          <Text>Draw a Card</Text>
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
  }
});

export default App;
