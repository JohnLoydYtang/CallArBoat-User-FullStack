import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';
import { auth } from '../firebaseConfig'; // Replace '../firebase' with the path to your Firebase configuration file
import { getAuth } from '@firebase/auth';
import { collection, doc, getDoc,  getDocs, where, query, onSnapshot  } from 'firebase/firestore';
import { db } from '../firebaseConfig';

//BOTTOM NAVIGATION
import BookTicket from './BookTicket';
import ProfileScreen from './ProfileScreen';
import History from './History';
import Notifications from './Notification';
//END OF BOTTOM NAVIGATION

//CSS
import styles from '../assets/css/BottomNavigationStyle/DashboardStyle';

const dashboardImage = require('../assets/images/dashboard.png');

const HomeScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [Medallion, setMedallion] = useState([]);
  const [singleTicket, setSingleTicket] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const NotifRef = collection(db, 'Passengers');
        const DisplayRef = collection(db, 'Medallion-BookedTicket');
  
        const q = query(NotifRef, where('userID', '==', userId));
  
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          let Transaction = [];
          snapshot.docs.forEach((doc) => {
            Transaction.push({ ...doc.data(), id: doc.id });
          });
          setTransaction(Transaction);
          setLoading(false);
          if (Transaction.length === 0) {
            console.log('No matching documents found in Firestore');
          }
        });
        return () => {
          unsubscribeSnapshot();
          unsubscribe();
        };
      } else {
        console.log('User not logged in');
        setLoading(false);
      }
    });
  };

  const fetchBookedTickets = () => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const DisplayRef = collection(db, 'Medallion-BookedTicket');
   
        const q = query(DisplayRef, where('user', '==', userId));
   
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          let bookedTickets = [];
          snapshot.docs.forEach((doc) => {
            bookedTickets.push({ ...doc.data(), id: doc.id });
          });
          setBookedTickets(bookedTickets);
          setLoading(false);
          if (bookedTickets.length === 0) {
            console.log('No matching documents found in Firestore');
          }
        });
        return () => {
          unsubscribeSnapshot();
          unsubscribe();
        };
      } else {
        console.log('User not logged in');
        setLoading(false);
      }
    });
   };
   useEffect(() => {
    fetchData();
    fetchBookedTickets();
   }, []);
   
  return (
    <View style={styles.screenContainer}>
      <View style={styles.imagecontainer}>
        <Image source={dashboardImage} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text1}>Good Day,</Text>
            {Transaction.map((item, index) => (
            <Text key={index} style={styles.text2}>{item.name}</Text>
            ))}
        </View>
      </View>
      <View style={styles.overlay}>
      <View style={styles.TicketContainer}>
        {bookedTickets.length > 0 && (
          <View style={styles.singleitem}>
            <Text>Name: {bookedTickets[bookedTickets.length - 1].Name}</Text>
            <Text>Destination: {bookedTickets[bookedTickets.length - 1].Destination}</Text>
            <Text>Location: {bookedTickets[bookedTickets.length - 1].Location}</Text>
            <Text>Sail Date: {new Date(bookedTickets[bookedTickets.length - 1].Date.toDate()).toLocaleDateString()}</Text>
            <Text>Status: {bookedTickets[bookedTickets.length - 1].status}</Text>
          </View>
        )}
      </View>
      </View>
      <View style={styles.overlay}>
      <Text style={styles.Recent}>Recent Trip</Text>
      <ScrollView horizontal>
      {bookedTickets.reverse().slice(0, 5).map((ticket, index) => (
      <View style={styles.card} key={index}>
        <Text>Name: {ticket.Name}</Text>
        <Text>Destination: {ticket.Destination}</Text>
        <Text>Location: {ticket.Location}</Text>
        <Text>Sail Date: {new Date(ticket.Date.toDate()).toLocaleDateString()}</Text>
        <Text>Status: {ticket.status}</Text>
      </View>
        ))} 
      </ScrollView>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // You can update the authentication status in the AuthContext here if needed
    });

    return () => unsubscribe();
  }, []);

  console.log('isAuthenticated:', isAuthenticated);

  // Add a console log to log the value of the `isAuthenticated` state after it has been rendered.
  // console.log('isAuthenticated state:', isAuthenticatedState);

  // Add a console log to log the value of the `isAuthenticated` prop when it is first received.
  console.log('isAuthenticated prop:', isAuthenticated);

  // Use a `useEffect` hook to subscribe to changes in the `isAuthenticated` state.

  return (
    <Tab.Navigator initialRouteName="Home">

      <Tab.Screen name="History" component={History} options={{headerTitle: "                   Ticket Transaction", tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'md-time' : 'md-time-outline'} size={26} style={{ marginBottom: -3 }} />
      )
    }} 
  />
        <Tab.Screen name="Ticket" component={BookTicket} options={{ headerTitle: "                        Companies",tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} size={26} style={{ marginBottom: -3 }} />
        )
      }} 
  />
        <Tab.Screen
                name="Home"
                options={{ headerShown: false, tabBarIcon: ({ focused }) => (
                  <Ionicons name={focused ? 'md-home' : 'md-home-outline'} size={26} style={{ marginBottom: -3 }} />
                )}}
              >
                {() => <HomeScreen isAuthenticated={isAuthenticated} />}
        </Tab.Screen>

      <Tab.Screen name="Notifications" component={Notifications} options={{headerTitle: "                        Notifications",  tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={26} style={{ marginBottom: -3 }} />
      )}}
    />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false,  tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'person' : 'person-outline'} size={26} style={{ marginBottom: -3 }} />
      )}}
    />
    </Tab.Navigator>
  );
};

export default Dashboard;