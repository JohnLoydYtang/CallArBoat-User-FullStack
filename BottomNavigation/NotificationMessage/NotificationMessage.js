import React from 'react';
import { View, Text, TouchableOpacity} from "react-native";

//CSS
import styles from '../../assets/css/BottomNavigationStyle/NotificationMessageStyle/NotificationMessageStyle';

const NotificationMessage = ({navigation}) => {
    return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.ButtonDesign} >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <View style={styles.TicketContainer}>
         <Text style={styles.companyName}>Roble Inc.</Text>
         <Text style={styles.reasonTitle}>Travel cancellation Notification</Text>
         <Text style={styles.Content}>
         Content: We regret to inform you that your upcoming travel has been canceled. 
         We apologize for any inconvenience caused. Details: 
         Trip to [Destination] on [Original Departure Date] canceled. 
         Refund processing. Contact [Contact Information] for assistance. 
         </Text>

         <View style={styles.rebookContainer}>
            <Text style={styles.TitleText}>Do you want to re-book or cancel your</Text>
            <Text style={styles.TicketText}>ticket?</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <TouchableOpacity style={styles.cancelDesign} >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rebookDesign} >
                <Text style={styles.rebookText}>Re-book</Text>
            </TouchableOpacity>
            
            </View>
        </View>


        </View>
        
    </View>
    );
};

export default NotificationMessage;