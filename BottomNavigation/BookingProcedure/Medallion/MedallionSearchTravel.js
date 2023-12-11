import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../../AuthContext';
import {db} from '../../../firebaseConfig';
import { useRoute } from '@react-navigation/native';

//CSS
import styles from '../../../assets/css/BottomNavigationStyle/BookingProcedureStyle/SearchTravelStyle';
import { collection, getDocs  } from 'firebase/firestore';

const MedallionSearchTravel = ({navigation}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [Vessel_Route, setMedallion] = useState([]);
  const [Vessel, setVessel] = useState([]);
  const [TravelFare, setFare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Vessel_Schedule, setVesselSchedule] = useState([]);
  const route = useRoute();
  const { companyItem } = route.params;

  const travelRef = collection(db, 'Vessel_Route');
  const vesselRef = collection(db, 'Vessel');
  const scheduleRef = collection(db, 'Vessel_Schedule');
  const fareRef = collection(db, 'Travel_Fare');

  useEffect(() => {
   const fetchData = async () => {
     try {
       const travelSnapshot = await getDocs(travelRef);
       const vesselSnapshot = await getDocs(vesselRef);
       const scheduleSnapshot = await getDocs(scheduleRef);
       const fareSnapshot = await getDocs(fareRef);

       let Vessel_Route = [];
       let Vessel = [];
       let Vessel_Schedule = [];
       let Travel_Fare = [];

       travelSnapshot.docs.forEach((doc) => {
         Vessel_Route.push({ ...doc.data(), id: doc.id });
       });
  
       vesselSnapshot.docs.forEach((doc) => {
         Vessel.push({ ...doc.data(), id: doc.id });
       });

       scheduleSnapshot.docs.forEach((doc) => {
        Vessel_Schedule.push({ ...doc.data(), id: doc.id});
        console.log('schedule', Vessel_Schedule);
       })
       
       fareSnapshot.docs.forEach((doc) => {
        Travel_Fare.push({ ...doc.data(), id: doc.id});
        console.log('fare', Travel_Fare);
       });


       setMedallion(Vessel_Route);
       setVessel(Vessel);
       setVesselSchedule(Vessel_Schedule);
       setFare(Travel_Fare); // Corrected variable name
       setLoading(false);
     } catch (err) {
       console.log(err.message);
       setLoading(false);
     }
   };
  
   fetchData();
  }, []);
  

  if (loading) {
    return (    
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>);
  }

  const showAlert = () => {
    Alert.alert(
      "Alert Title",
      "Vessel capacity is 0.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  
    return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
          {Vessel_Route.map((item, index) => {
            const vessel = Vessel.find(v => v.vessel_id === item.vessel_id);
            const schedule = Vessel_Schedule.find(s => s.vessel_id === item.vessel_id);
            const fare = TravelFare.find(f => f.vessel_id === item.vessel_id); 
            // Check if either vessel_business or vessel_economy is greater than 0
            const shouldRenderComponent = vessel && (vessel.vessel_business > 0 || vessel.vessel_economy > 0);

            if (!shouldRenderComponent) {
              // Skip rendering the entire component if both vessel_business and vessel_economy are 0
              return null;
            }
            console.log('fare', fare);
            return (
              <TouchableOpacity key={index} style={styles.DestinationDetails}  onPress={() => navigation.navigate('BookTicketFillup', {
                item: item, 
                companyItem: companyItem,
                vesselBusiness: vessel ? vessel.vessel_business : 'N/A',
                vesselEconomy: vessel ? vessel.vessel_economy : 'N/A',
                travelFareBusiness: fare ? fare.business: 'N/A',
                travelFareEconomy: fare ? fare.economy: 'N/A',
              })}
             >               
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
                        <Text style={styles.personStyle}>₱{item.fare_price}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.businessText}>Business</Text>
                        <Text style={styles.personText}>Economy</Text>
                    </View>
                    <View style={styles.rowContainer}>
                      {vessel.vessel_business === 0 ? showAlert() : 
                        <Text style={styles.businessStyle}>Cap: {vessel ? vessel.vessel_business : 'N/A'} {`\n`}₱ {fare ? fare.business: 'N/A'}</Text>
                      }
                      {vessel.vessel_economy === 0 ? showAlert() : 
                        <Text style={styles.personStyle}>Cap: {vessel ? vessel.vessel_economy : 'N/A'} {`\n`}₱ {fare ? fare.economy: 'N/A'}</Text>
                      }
                    </View>
                    <View style={styles.rowContainer}>
                    <Text style={styles.businessText}>Scheduled Days: {`\n`}{schedule && schedule.days.join('\n')}</Text>
                    </View>                 
                  </View>      
                </View>
              </TouchableOpacity>
            )
          })}
          </ScrollView>
        </View>
      );      
};

export default MedallionSearchTravel;
