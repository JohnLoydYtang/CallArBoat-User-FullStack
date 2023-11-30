import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity} from "react-native";
import { useRoute } from '@react-navigation/native';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/NotificationMessageStyle/NotificationMessageStyle';

const NotificationMessage = () => {
    const route = useRoute();
    const notification = route.params?.notification;
    console.log('Notification passed', notification);
    return (    
    <View style={styles.container}>
        <View style={styles.TicketContainer}>
         <Text style={styles.companyName}>{notification.headerApprove}</Text>
         <Text style={styles.reasonTitle}>Date: {notification.timestamp.toDate().toLocaleDateString()}</Text>
         <Text style={styles.Content}>
            {notification.message}
         </Text>
        </View>       
    </View>
    );
};

export default NotificationMessage;