import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { AuthContext } from '../AuthContext';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {db} from '../firebaseConfig';
import { collection, getDocs  } from 'firebase/firestore';

//CSS
import styles from '../assets/css/BottomNavigationStyle/BookTicketStyle';

const BookTicket = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [travelAgencies, setTravelAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('isAuthenticated:', isAuthenticated);

  const travelRef = collection(db, 'Travel_agencies')

  useEffect(() => {
    getDocs(travelRef)
      .then((snapshot) => {
        let TravelAgencies = []
        snapshot.docs.forEach((doc) => {
          TravelAgencies.push({ ...doc.data(), id:doc.id })
        })
        setTravelAgencies(TravelAgencies);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message)
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (    
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>);
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        {console.log('Travel Agencies:', travelAgencies)}
        {chunkArray(travelAgencies, 2).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.cardRow}>
            {row.map((companyItem, cardIndex) => (
              <TouchableOpacity
                key={cardIndex}
                style={styles.touchable}
                onPress={() => navigation.navigate(companyItem.companyName,{ companyItem: companyItem })}
              >
                <View style={styles.square}>
                  {companyItem.profile ? (
                    <Image source={{ uri: companyItem.profile }} style={styles.image} />
                  ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <ActivityIndicator size="medium" color="gray" />
                    </View>
                  )}
                  <Text style={styles.name}>{companyItem.companyName}</Text>
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
