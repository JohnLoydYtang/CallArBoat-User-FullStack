import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
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
  const [loading, setLoading] = useState(true);
  const [Vessel_Schedule, setVesselSchedule] = useState([]);
  const route = useRoute();
  const { companyItem } = route.params;

  const travelRef = collection(db, 'Vessel_Route');
  const vesselRef = collection(db, 'Vessel');
  const scheduleRef = collection(db, 'Vessel_Schedule');

  useEffect(() => {
   const fetchData = async () => {
     try {
       const travelSnapshot = await getDocs(travelRef);
       const vesselSnapshot = await getDocs(vesselRef);
       const scheduleSnapshot = await getDocs(scheduleRef);

       let Vessel_Route = [];
       let Vessel = [];
       let Vessel_Schedule = [];

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
  
       setMedallion(Vessel_Route);
       setVessel(Vessel);
       setVesselSchedule(Vessel_Schedule);
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


    return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
          {Vessel_Route.map((item, index) => {
            const vessel = Vessel.find(v => v.vessel_id === item.vessel_id);
            const schedule = Vessel_Schedule.find(s => s.vessel_id === item.vessel_id);
            return (
              <TouchableOpacity key={index} style={styles.DestinationDetails}  onPress={() => navigation.navigate('BookTicketFillup', {
                item: item, 
                companyItem: companyItem,
                vesselBusiness: vessel ? vessel.vessel_business : 'N/A',
                vesselEconomy: vessel ? vessel.vessel_economy : 'N/A'
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
                      <Text style={styles.businessStyle}>₱{vessel ? vessel.vessel_business : 'N/A'}</Text>
                      <Text style={styles.personStyle}>₱{vessel ? vessel.vessel_economy : 'N/A'}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                    <Text style={styles.businessText}>Scheduled Days: {schedule && schedule.days.join(', ')}</Text>
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
