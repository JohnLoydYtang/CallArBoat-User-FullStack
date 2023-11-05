import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from "react-native";
import { AuthContext } from '../AuthContext';

//CSS
import styles from '../assets/css/BottomNavigationStyle/NotificationStyle';

const Notifications = ({navigation}) => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log('isAuthenticated:', isAuthenticated);

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

export default Notifications;