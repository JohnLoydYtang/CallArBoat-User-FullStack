import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from "react-native";


const Notifications = ({navigation}) => {
  const notifications = [
    'Notification of Travel cancellation on 06/23/2023 from Roble Inc.',
    'Notification 2',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',
    'Notification 3',

    // Add more notifications as needed
  ];
    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.ButtonDesign} >
          <Text style={styles.buttonText}>Mark all as read</Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollView}>
        {notifications.map((notification, index) => (
          <TouchableOpacity key={index} style={styles.notification} onPress={() => navigation.navigate('NotificationMessage')}>
            <Text style={styles.notificationText}>
              {notification}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ButtonDesign:{
      width: 120,
      height: 48,
      borderRadius: 10,  
      overflow: 'hidden',
      backgroundColor: '#4A79E5',
      alignItems: 'center',
      marginTop: 8,
      marginLeft: 220,
    },
    buttonText:{
      color: 'white',
      marginTop: 15,
      fontWeight: 'bold',
    },
    scrollView: {
      width: '90%',
      padding: 10,
    },
    notification: {
      marginBottom: 10,
      padding: 30,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    notificationText: {
      fontSize: 16,
    },
});

export default Notifications;