import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//BOTTOM NAVIGATION
import BookTicket from './BookTicket';
import ProfileScreen from './ProfileScreen';
import History from './History';
import Notifications from './Notification';
//END OF BOTTOM NAVIGATION

const dashboardImage = require('../assets/images/dashboard.png');

const HomeScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.imagecontainer}>
        <Image source={dashboardImage} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.text1}>Good Morning,</Text>
          <Text style={styles.text2}>Mr TempDatabaseGet</Text>
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
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="History" component={History} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name={focused ? 'md-time' : 'md-time-outline'} size={26} style={{ marginBottom: -3 }} />
      )
    }} 
  />
      <Tab.Screen name="Ticket" component={BookTicket} options={{ tabBarIcon: ({ focused }) => (
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

const styles = {
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A79E5',
  },
  imagecontainer: {
    marginBottom: 300,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1:{
    color: 'white',
    fontSize: 15,
    right: 95,
  },
  text2:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 100,
    right: 50,
  },
  TicketContainer:{
    backgroundColor: 'white',
    width: 290,
    height: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 60,
  },
  Recent:{
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    marginTop: '118%',
    right: 80,
  },
  card: {
    width: 200,
    height: 200,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
};

export default Dashboard;
