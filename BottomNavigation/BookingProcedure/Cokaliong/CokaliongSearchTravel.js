import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { AuthContext } from '../../../AuthContext';
import {db} from '../../../firebaseConfig';
import { useRoute } from '@react-navigation/native';

//CSS
import styles from '../../../assets/css/BottomNavigationStyle/BookingProcedureStyle/SearchTravelStyle';
import { collection, getDocs  } from 'firebase/firestore';

const CokaliongSearchTravel = ({navigation}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [Vessel_Route, setMedallion] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { companyItem } = route.params;
  console.log('companyItem:', companyItem);

  console.log('isAuthenticated:', isAuthenticated);

  const travelRef = collection(db, 'Vessel_Route')

  useEffect(() => {
    getDocs(travelRef)
      .then((snapshot) => {
        let Vessel_Route = []
        snapshot.docs.forEach((doc) => {
          Vessel_Route.push({ ...doc.data(), id:doc.id })
        })
        setMedallion(Vessel_Route);
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
          <ScrollView style={styles.scrollView}>
          {console.log('Vessel_Route:', Vessel_Route)}
            {Vessel_Route.map((item, index) => (
              <TouchableOpacity key={index} style={styles.DestinationDetails} onPress={() => navigation.navigate('BookTicketFillup', {item: item, companyItem: companyItem})}>                
                <View style={styles.DestinationDetailsContent}>
                {item.image ? <Image source={{uri: item.image}} style={styles.image}/> : null}

                  <View style={styles.textContainer}>

                  <View style={styles.rowContainer}>
                        <Text style={styles.departureText}>Destination</Text>
                        <Text style={styles.arrivalText}>Location</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.departureStyle}>{item.route_destination}</Text>
                        <Text style={styles.arrivalStyle}>{item.route_location}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.portText}>Name</Text>
                        <Text style={styles.personText}>/Person</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.portStyle}>{item.route_name}</Text>
                        <Text style={styles.personStyle}>₱{item.Price}</Text>
                    </View>

                  </View>       
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );      
};

export default CokaliongSearchTravel;
