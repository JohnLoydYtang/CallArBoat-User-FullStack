import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('AccountInformation')}>
              <Image source={require('../assets/images/default-profile-picture.png')} style={styles.imageContainer}/>
                <View style={styles.overlay}>
                  <Text style={styles.name}>John Loyd Ytang Trial</Text>
                  <Text style={styles.number}>09287505435</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
        <TouchableOpacity>
            <Text style={styles.details}>🔎 About Us</Text>
        </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.details}>ℹ️ Terms and Condition</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Report')}>
            <Text style={styles.details}>📝 Report an Error</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.logout}>↪️ Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A79E5',
    alignItems: 'center',
    justifyContent: 'center',
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
  profileContainer:{
    marginBottom: 50,
    marginRight: 240,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 75,
    marginTop: 50,
  },
  name:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginLeft: 330,
    width: 200,
    marginTop: 50,
  },
  number:{
    color: 'white',
    fontSize: 15,
    marginLeft: 330,
    width: 200,
  },
   detailsContainer: {
    width: 400,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  details:{
    color: 'white',
    padding: 10,
    fontSize: 18,
    marginLeft: 15,
  },
  logout:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    marginLeft: 15,
    marginTop: 350,
  }
});

export default ProfileScreen;
