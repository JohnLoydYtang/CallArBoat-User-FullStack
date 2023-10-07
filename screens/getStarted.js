import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';

const getImage = require('../assets/images/getstarted.png');

const GetStarted = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={getImage}/>
        <Text style={styles.textDesign}>   EASY BOOK AND {'\n'}RESERVE OF TICKETS</Text>
      </View>
      <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    flex: 1,
    paddingBottom: 190,
  },
  textDesign: {
    position: 'absolute',
    paddingTop: 250,
    fontWeight: 'bold',
    fontSize: 25,
    left: 16,
  },
  ButtonDesign:{
    position: 'absolute',      
    bottom: '17%',
    width: 211,
    height: 48,
    borderRadius: 100,  
    overflow: 'hidden',
      backgroundColor: '#4A79E5',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    top: 10,
    fontSize: 19,
  },
});

export default GetStarted;