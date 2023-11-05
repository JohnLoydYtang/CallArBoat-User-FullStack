import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { AuthContext } from '../../../AuthContext';
import {db} from '../../../firebaseConfig';

//CSS
import styles from '../../../assets/css/BottomNavigationStyle/BookingProcedureStyle/SearchTravelStyle';
import { collection, getDocs  } from 'firebase/firestore';

const MedallionSearchTravel = ({navigation}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [Medallion, setMedallion] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('isAuthenticated:', isAuthenticated);

  const travelRef = collection(db, 'Medallion')

  useEffect(() => {
    getDocs(travelRef)
      .then((snapshot) => {
        let Medallion = []
        snapshot.docs.forEach((doc) => {
          Medallion.push({ ...doc.data(), id:doc.id })
        })
        setMedallion(Medallion);
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
        <View style={styles.container}>
          <Text style={styles.FromText}>From Cebu to Bohol:</Text>
          <ScrollView style={styles.scrollView}>
          {console.log('Medallion:', Medallion)}
            {Medallion.map((item, index) => (
              <TouchableOpacity key={index} style={styles.DestinationDetails} onPress={() => navigation.navigate('BookTicketFillup', {item: item})}>                
                <View style={styles.DestinationDetailsContent}>
                {item.image ? <Image source={{uri: item.image}} style={styles.image}/> : null}

                  <View style={styles.textContainer}>

                  <View style={styles.rowContainer}>
                        <Text style={styles.departureText}>Departure</Text>
                        <Text style={styles.arrivalText}>Arrival</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.departureStyle}>{item.Departure}</Text>
                        <Text style={styles.arrivalStyle}>{item.Arrival}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.portText}>Port</Text>
                        <Text style={styles.personText}>/Person</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.portStyle}>{item.Port}</Text>
                        <Text style={styles.personStyle}>{item.Price}</Text>
                    </View>

                  </View>       
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );      
};

export default MedallionSearchTravel;
