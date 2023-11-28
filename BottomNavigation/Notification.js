import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from "react-native";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {db} from './../firebaseConfig';
//CSS
import styles from '../assets/css/BottomNavigationStyle/NotificationStyle';

const Notifications = ({navigation}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  console.log('isAuthenticated:', isAuthenticated);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userId = user.uid;
        console.log('user', userId);
        const fetchNotifications = async () => {
          try {
            const notificationsCol = collection(db, 'Notifications');
            const q = query(notificationsCol, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const notifications = querySnapshot.docs.map(doc => doc.data());
            setNotifications(notifications);
          } catch (error) {
            console.error("Error fetching notifications: ", error);
          }
        };
        fetchNotifications();
      } else {
        console.log('User not logged in');
        setLoading(false);
      }
    });
   
    // Cleanup function to unsubscribe from auth state changes
    return () => unsubscribe();
   }, []);
   
   return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.ButtonDesign} >
          <Text style={styles.buttonText}>Mark all as read</Text>
        </TouchableOpacity>
 
        <ScrollView style={styles.scrollView}>
        {notifications.length === 0 ? 
     <Text style={styles.textNotif}>No New Notifications!</Text> 
     : 
       notifications.map((notification, index) => (
        <TouchableOpacity key={index} style={styles.notification} onPress={() => navigation.navigate('NotificationMessage')}>
          <Text style={styles.notificationText}>
            {notification.message}
          </Text>
        </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    ); 
};

export default Notifications;