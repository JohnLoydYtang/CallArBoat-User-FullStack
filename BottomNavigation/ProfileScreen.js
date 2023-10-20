import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

//CSS
import styles from '../assets/css/BottomNavigationStyle/ProfileScreenStyle';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      logout(); // Call the logout function from AuthContext
      navigation.navigate('SignIn'); // Navigate to SignIn screen
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('AccountInformation')}>
            <Image source={require('../assets/images/default-profile-picture.png')} style={styles.imageContainer} />
            <View style={styles.overlay}>
              <Text style={styles.name}>John Loyd Ytang Trial</Text>
              <Text style={styles.number}>09287505435</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Please log in to view profile</Text>
      )}
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

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>↪️ Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
