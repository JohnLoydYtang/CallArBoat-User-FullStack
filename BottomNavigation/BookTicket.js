import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

//CSS
import styles from '../assets/css/BottomNavigationStyle/BookTicketStyle';

const BookTicket = ({navigation}) => {
  // Array of data representing each card
  const cardData = [
    { id: 1, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 2, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 3, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 4, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 5, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 6, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 7, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 8, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 9, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    { id: 10, image: require('../assets/images/default-profile-picture.png'), name: 'Company Name' },
    // Add more card data as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {chunkArray(cardData, 2).map((row, index) => (
          <View key={index} style={styles.cardRow}>
            {row.map((card) => (
              <TouchableOpacity key={card.id} style={styles.touchable} onPress={() => navigation.navigate('SearchTravel')}>
                <View style={styles.square}>
                  <Image source={card.image} style={styles.image} />
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

// Function to split the array into chunks of specified size
const chunkArray = (array, size) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

export default BookTicket;
