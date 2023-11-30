import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl} from "react-native";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {db} from './../firebaseConfig';
//CSS
import styles from '../assets/css/BottomNavigationStyle/NotificationStyle';

const Notifications = ({ navigation }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log('isAuthenticated:', isAuthenticated);

  const fetchNotifications = async (userId) => {
    try {
      const notificationsCol = collection(db, 'Notifications');
      const q = query(notificationsCol, where('userID', '==', userId));
      const querySnapshot = await getDocs(q);
      const notifications = querySnapshot.docs.map(doc => doc.data());
      setNotifications(notifications);
  
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userId = user.uid;
        console.log('user', userId);
        fetchNotifications(userId);
      } else {
        console.log('User not logged in');
        setLoading(false);
      }
    });

    // Cleanup function to unsubscribe from auth state changes
    return () => unsubscribe();
  }, []);

  console.log('notifications: ', notifications);

  const onRefresh = () => {
    setRefreshing(true);
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const userId = user.uid;
      fetchNotifications(userId).finally(() => setRefreshing(false));
    } else {
      setRefreshing(false); 
    }
  };

   return (
    <View style={styles.container}>
 
        <ScrollView style={styles.scrollView} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {notifications.length === 0 ? 
     <Text style={styles.textNotif}>No New Notifications!</Text> 
     : 
       notifications.reverse().map((notification, index) => (
        <TouchableOpacity key={index} style={styles.notification} onPress={() => navigation.navigate('NotificationMessage',{ notification: notification })}>
          <Text style={styles.notificationText}>
            <Text style={{fontWeight:'bold',}}>{notification.headerApprove} {'\n'}</Text>
            <Text >Date: {notification.timestamp.toDate().toLocaleDateString()}</Text>
          </Text>
        </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    ); 
};

export default Notifications;