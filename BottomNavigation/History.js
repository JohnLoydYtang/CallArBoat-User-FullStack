import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, ActivityIndicator, RefreshControl } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../AuthContext';
import {db} from '../firebaseConfig';
import { collection, getDocs, where, query, orderBy  } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from '@firebase/auth';

//CSS
import styles from '../assets/css/BottomNavigationStyle/HistoryStyle';

const History = ({navigation}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [Transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Medallion, setMedallion] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [Payment, setPayment] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const NotifRef = collection(db, 'Medallion-BookedTicket');
        const VesselRef = collection(db, 'Vessel_Route');
        const totalRef = collection(db, 'Payments');

        const q = query(NotifRef, where('user', '==', userId));

        getDocs(q)
          .then((snapshot) => {
            let Transaction = []
            snapshot.docs.forEach((doc) => {
              Transaction.push({ ...doc.data(), id: doc.id })
            })
            setTransaction(Transaction);
            setLoading(false);
            if (Transaction.length === 0) {
              console.log('No matching documents found in Firestore');
            }
          })
          .catch(err => {
            console.log(err.message)
            setLoading(false);
          })

        //Fetch image from medallion
        getDocs(VesselRef)
          .then((snapshot) => {
            let Medallion = []
            snapshot.docs.forEach((doc) => {
              const data = doc.data();
              Medallion.push({ id: doc.id, image: data.image, Price: data.fare_price })
            })
            setMedallion(Medallion);
          })
          .catch(err => {
            console.log('Error fetching Medallion:', err.message)  // Log any error messages
          })
      //fetch total from Payments
      getDocs(totalRef)
        .then((snapshot) => {
          let Payment = []
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            Payment.push({id: doc.id, paymentId: data.paymentId ,total:data.Total})
          })
          console.log('payment', Payment);
          setPayment(Payment);
        })
        .catch(err => {
          console.log('error payment', err.message)
        })
      } else {
        console.log('User not logged in');
        setLoading(false);
      }
    })

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };
  

  if (loading) {
    return (    
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>);
  }
  //END OF DISPLAY

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {console.log('transaction', Transaction)}  
          {Transaction.length === 0 ? 
     <Text style={styles.textHistory}>History is empty!</Text> 
     :     
       Transaction.reverse().map((item, index) => {
          // Find the corresponding Medallion document
          const medallion = Medallion.find(m => m.id === item.vesselId);
          let payment;
          if (Array.isArray(Payment)) {
           payment = Payment.find(p => p.paymentId === item.paymentId);
           console.log(payment);
          } else {
           console.log('Payment is not an array');
          }          
         
          // If the Medallion document exists, use its image
          const medallionImage = medallion?.image;
          const medallionPrice = medallion?.Price;
          const total = payment?.total;

          const date = item.dateIssued.toDate();
          // Format the Date object as a string
          const dateString = date.toLocaleDateString();
          return (
            <TouchableOpacity key={index} style={styles.Transaction} onPress={() => navigation.navigate('TicketTransaction', {item, medallionImage, medallionPrice, total })}>
              <View style={styles.TransactionContent}>
              {medallionImage ? 
            <Image source={{uri: medallionImage}} style={styles.image}/> : 
            <Text>No image</Text>
               }
                <View style={styles.textContainer}>
                  <Text style={styles.TransactionName}>{item.Destination} to {item.Location}</Text>
                  <Text style={styles.TransactionDesc}>{item.AccomType}</Text>
                  <Text style={styles.dateText}>Date issued: {dateString}</Text>
                  {item.status === 'Approved' ? 
                    <Text style={styles.approvedText}>{item.status}</Text> 
                    : 
                    item.status === 'Cancelled' ? 
                    <Text style={styles.cancelledText}>{item.status}</Text> 
                    : 
                    <Text style={styles.pendingText}>{item.status}</Text>
                    }  
                  </View>
              </View>
            </TouchableOpacity>
          )
        })}
     </ScrollView>
    </View>
  );
};

export default History;