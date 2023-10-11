import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Image, View, SafeAreaView } from 'react-native';

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

const LogoImage = require('./assets/images/LOGO.png');

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

const App = () =>  {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FlashScreen" component={FlashScreen} options={{headerShown: false}} />
        <Stack.Screen name="GetStarted" component={GetStarted} options={{headerShown: false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: "         Let's Sign Up",}}  />     
        <Stack.Screen name="Verification" component={Verification} options={{ headerTitle: '',}}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
        <Stack.Screen name="AccountInformation" component={AccountInformation} options={{ headerTitle: "      Account Information",}} />
        <Stack.Screen name="Report" component={Report} options={{ headerTitle: "                Reports",}} />
        <Stack.Screen name="NotificationMessage" component={NotificationMessage} options={{headerTitle: "            Notifications",}} />
        <Stack.Screen name="TicketTransaction" component={TicketTransaction} options={{headerTitle: "            Ticket Details",}} />
        <Stack.Screen name="ViewTicketTransaction" component={ViewTicketTransaction} options={{headerTitle: "            View Ticket",}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagecontainer: {
    flex: 1,
    paddingTop: '50%',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 18,
  },
});

export default App;
