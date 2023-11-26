import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
import { db, auth } from '../firebaseConfig';
import { collection, doc, getDoc,  getDocs, where, query } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';

//CSS
import styles from '../assets/css/BottomNavigationStyle/ProfileScreenStyle';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [Transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const checkEmailVerification = async () => {
      if (auth.currentUser) {
        const user = auth.currentUser;
        setIsEmailVerified(user.emailVerified);
      }
    };
  
    checkEmailVerification();
  }, []);

  
  console.log('isAuthenticated:', isAuthenticated);

  useEffect(() => {
    fetchData();
    }, []);
    
  const fetchData = () => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const NotifRef = collection(db, 'Passengers');

        const q = query(NotifRef, where('userID', '==', userId));
    
        getDocs(q)
          .then((snapshot) => {
            let Transaction = []
            snapshot.docs.forEach((doc) => {
              Transaction.push({ ...doc.data(), id:doc.id })
            })
            setTransaction(Transaction);
            setLoading(false);
            if (Transaction.length === 0) {
              console.log('No matching documents found in Firestore');
            }
          })
          .catch(err => {
            console.log(err.message)
            setLoading(false);
          })
      } else {
        console.log('User not logged in');
        setLoading(false);
      }
    });

  // Unsubscribe from the listener when the component unmounts
  return () => unsubscribe();
};

const onRefresh = () => {
  setRefreshing(true);
  fetchData();
  setRefreshing(false);
};

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      logout(); // Call the logout function from AuthContext
      navigation.navigate('SignIn'); // Navigate to SignIn screen
    } catch (error) {
      console.log(error);
    }
  };
  
  if (loading) {
    return (    
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>);
  }

  return (
    <ScrollView
    contentContainerStyle={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    <View style={styles.container}>
      {isAuthenticated ? (
        <View style={styles.profileContainer}>
        {console.log('Transaction:', Transaction)}
        {Transaction.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('AccountInformation', {item})}>
              {item.profilePicture ? (
                <Image source={{ uri: item.profilePicture }} style={styles.imageContainer} />
              ) : (
                <Image source={require('../assets/images/default-profile-picture.png')} style={styles.imageContainer} />
              )}
              <View style={styles.overlay}>
                <Text style={styles.name}>{item.username}</Text>
                <Text style={styles.number}>{item.phoneNumber}</Text>
                {isEmailVerified ? (
                  <Text style={styles.emailVerified}>Email is verified</Text>
                ) : (
                  <Text style={styles.emailNotVerified}>Email is not verified</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
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
    </ScrollView>
  );
};

export default ProfileScreen;
