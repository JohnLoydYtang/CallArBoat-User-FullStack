import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from './rootNavigation';
import { AuthProvider } from './AuthContext';

//SCREENS
import GetStarted from './screens/getStarted';
import SignIn from './screens/sign-in';
import SignUp from './screens/sign-up';
import Verification from './screens/verification';
//END OF SCREENS

//BOTTOM NAVIGATION
import Dashboard from './BottomNavigation/Dashboard';
import AccountInformation from './BottomNavigation/ProfilePages/AccountInformation';
import Report from './BottomNavigation/Report/Report';
import NotificationMessage from './BottomNavigation/NotificationMessage/NotificationMessage';
import TicketTransaction from './BottomNavigation/TicketTransaction/TicketTransaction';
import ViewTicketTransaction from './BottomNavigation/TicketTransaction/ViewTicketTransaction';
import SearchTravel from './BottomNavigation/BookingProcedure/SearchTravel';
import BookTicketFillup from './BottomNavigation/BookingProcedure/BookTicketFillup';
import PaymentProcess from './BottomNavigation/BookingProcedure/PaymentProcess';

//CSS
import styles from './assets/css/AppStyle';

const LogoImage = require('./assets/images/LOGO.png');

export const AuthContext = React.createContext();

const FlashScreen = ({ navigation }) => {
  const delay = 4000; 

  setTimeout(() => {
    navigation.navigate('GetStarted');
  }, delay);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source ={LogoImage} style={styles.image}/>  
      </View> 
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== null) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (    
    <NavigationContainer ref={navigationRef}>
        <AuthProvider>
        <Stack.Navigator>
              <Stack.Screen name="FlashScreen" component={FlashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: "         Let's Sign Up" }} />
              <Stack.Screen name="Verification" component={Verification} options={{ headerTitle: '' }} />

              {/* BottomNavigation */}
              <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
              <Stack.Screen name="AccountInformation" component={AccountInformation} options={{ headerTitle: "      Account Information" }} />
              <Stack.Screen name="Report" component={Report} options={{ headerTitle: "                Reports" }} />
              <Stack.Screen name="NotificationMessage" component={NotificationMessage} options={{ headerTitle: "            Notifications" }} />
              <Stack.Screen name="TicketTransaction" component={TicketTransaction} options={{ headerTitle: "            Ticket Details" }} />
              <Stack.Screen name="ViewTicketTransaction" component={ViewTicketTransaction} options={{ headerTitle: "            View Ticket" }} />
              <Stack.Screen name="SearchTravel" component={SearchTravel} options={{ headerTitle: "           Search Travel" }} />
              <Stack.Screen name="BookTicketFillup" component={BookTicketFillup} options={{ headerTitle: "            Book Ticket" }} />
              <Stack.Screen name="PaymentProcess" component={PaymentProcess} options={{ headerTitle: "        Payment Process" }} />
        </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
  );
};

export default App;
