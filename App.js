import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigationRef } from './rootNavigation';
import { AuthProvider } from './AuthContext';
import { getAuth, signInWithCredential, PhoneAuthProvider } from 'firebase/auth';

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
import MedallionSearchTravel from './BottomNavigation/BookingProcedure/Medallion/MedallionSearchTravel';
import BookTicketFillup from './BottomNavigation/BookingProcedure/Medallion/BookTicketFillup';
import PaymentProcess from './BottomNavigation/BookingProcedure/Medallion/PaymentProcess';

//CSS
import styles from './assets/css/AppStyle';
import ForgotPassword from './screens/forgotPassword';
import RebookTicket from './BottomNavigation/TicketTransaction/rebookTicket';

const LogoImage = require('./assets/images/LOGO.png');

const FlashScreen = ({ navigation, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const delay = 4000;

  useEffect(() => {
    setIsLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // If the `isAuthenticated` prop is undefined, set it to `false`.
      if (isAuthenticated === undefined) {
        setIsAuthenticated(false);
      }

      if (!isLoading && isAuthenticated) {
        navigation.navigate('Dashboard', { isAuthenticated });
      } else if (!isLoading && !isAuthenticated) {
        navigation.navigate('GetStarted');
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image source={LogoImage} style={styles.image} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};


const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const auth = getAuth(); // Initialize the auth object
  
  useEffect(() => {
    auth.useDeviceLanguage();
  }, []);  

useEffect(() => {
  checkLoginStatus();
}, []);

  useEffect(() => {
    console.log('isLoggedIn state:', isLoggedIn);
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      console.log('Value from AsyncStorage:', value);
      if (value !== null && value === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (    
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <Stack.Navigator>
          {/* <Stack.Screen name="FlashScreen" component={FlashScreen} options={{ headerShown: false }} /> */}
          <Stack.Screen name="FlashScreen" component={FlashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: "         Let's Sign Up" }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerTitle: "         Forgot Password" }} />
          <Stack.Screen name="Verification" component={Verification} options={{ headerTitle: '' }} />

          {/* BottomNavigation */}
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
          <Stack.Screen name="AccountInformation" component={AccountInformation} options={{ headerTitle: "      Account Information" }} />
          <Stack.Screen name="Report" component={Report} options={{ headerTitle: "                Reports" }} />
          <Stack.Screen name="NotificationMessage" component={NotificationMessage} options={{ headerTitle: "            Notifications" }} />
          <Stack.Screen name="TicketTransaction" component={TicketTransaction} options={{ headerTitle: "            Ticket Details" }} />
          <Stack.Screen name="ViewTicketTransaction" component={ViewTicketTransaction} options={{ headerTitle: "            View Ticket" }} />
          <Stack.Screen name="RebookTicket" component={RebookTicket} options={{ headerTitle: "            Rebook Ticket" }} />
          <Stack.Screen name="Medallion" component={MedallionSearchTravel} options={{ headerTitle: "              Medallion" }} />
          <Stack.Screen name="BookTicketFillup" component={BookTicketFillup} options={{ headerTitle: "            Book Ticket" }} />
          <Stack.Screen name="PaymentProcess" component={PaymentProcess} options={{ headerTitle: "        Payment Process" }} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
