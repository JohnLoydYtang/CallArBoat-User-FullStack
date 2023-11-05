import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { AuthContext } from '../AuthContext';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

//CSS
import styles from '../assets/css/BottomNavigationStyle/BookTicketStyle';

const BookTicket = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cardData, setCardData] = useState([
    { id: 1, imagePath: '', name: 'Medallion' },
    { id: 2, imagePath: '', name: 'Cokaliong' },
    { id: 3, imagePath: '', name: '2Go' },
    { id: 4, imagePath: '', name: 'FastCat' },
  ]);

  console.log('isAuthenticated:', isAuthenticated);

  useEffect(() => {
    const storage = getStorage();
  
    const fetchImageURLs = async () => {
      const updatedCardData = await Promise.all(
        cardData.map(async (card) => {
          let imageURL = await getDownloadURL(ref(storage, 'Companies/' + card.name + '.jpg')).catch(() => null);
          if (!imageURL) {
            imageURL = await getDownloadURL(ref(storage, 'Companies/' + card.name + '.png')).catch(() => null);
          }
          return { ...card, imagePath: imageURL };
        })
      );
      setCardData(updatedCardData);
    };
  
    fetchImageURLs();
  }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {chunkArray(cardData, 2).map((row, index) => (
          <View key={index} style={styles.cardRow}>
            {row.map((card) => (
              <TouchableOpacity key={card.id} style={styles.touchable}   onPress={() => navigation.navigate(card.name)}>
                <View style={styles.square}>
                  {card.imagePath ? (
                    <Image source={{ uri: card.imagePath }} style={styles.image} />
                  ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="medium" color="gray" />
                  </View>
                  )}
                  <Text style={styles.name}>{card.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const chunkArray = (array, size) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

export default BookTicket;
