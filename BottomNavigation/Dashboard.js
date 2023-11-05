import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';
import { auth } from '../firebaseConfig'; // Replace '../firebase' with the path to your Firebase configuration file

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
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user !== null);
      if (user) {
        setUserName(user.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.imagecontainer}>
        <Image source={dashboardImage} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text1}>Good Day,</Text>
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
