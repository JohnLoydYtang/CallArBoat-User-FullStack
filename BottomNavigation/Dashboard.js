import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { firestore } from '../firebaseConfig'; // Replace '../firebase' with the path to your Firebase configuration file

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
  const { isAuthenticated, user } = useContext(AuthContext);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);

    if (isAuthenticated && user) {
      // Fetch user data or perform any other actions for authenticated users
      const userRef = firestore.collection('Passengers').doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log('User data:', userData);
          setUserName(userData.name);
        } else {
          console.log('User document does not exist');
        }
      }).catch((error) => {
        console.log('Error retrieving user data:', error);
      });
    }
  }, [isAuthenticated, user]);
  

  return (
    <View style={styles.screenContainer}>
      <View style={styles.imagecontainer}>
        <Image source={dashboardImage} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text1}>Good Morning,</Text>
          {isAuthenticated && <Text style={styles.text2}>{userName}</Text>}
        </View>
      </View>
      <View style={styles.overlay}>
        <View style={styles.TicketContainer}>
        </View>
      </View>
      <View style={styles.overlay}>
      <Text style={styles.Recent}>Recent Trip</Text>
      <ScrollView horizontal>
          <View style={styles.card}>
            <Text>Card 1</Text>
          </View>
          <View style={styles.card}>
            <Text>Card 2</Text>
          </View>
          <View style={styles.card}>
            <Text>Card 3</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);

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
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false,  tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'md-home' : 'md-home-outline'} size={26} style={{ marginBottom: -3 }} />
      )}}
    />
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
