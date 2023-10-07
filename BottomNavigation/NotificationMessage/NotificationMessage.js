import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";


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
         Refund processing. Contact [Contact Information] for assistance hello. 
         </Text>

         <View style={styles.rebookContainer}>
            <Text style={styles.TitleText}>Do you want to re-book or cancel your</Text>
            <Text style={styles.TicketText}>ticket?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.cancelDesign} >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rebookDesign} >
                <Text style={styles.rebookText}>Rebook</Text>
            </TouchableOpacity>
            </View>
        </View>


        </View>
        
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
    companyName:{
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 20,
        fontSize: 20,
    },
    reasonTitle:{
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 15,
    },
    Content:{
        marginTop: 20,
        marginLeft: 20,
        fontSize: 18,
        marginBottom: 30,
    },
    ButtonDesign:{
        width: 120,
        height: 48,
        borderRadius: 10,  
        overflow: 'hidden',
        backgroundColor: 'red',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 220,
        marginBottom: 10,
      },
      buttonText:{
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
      },
      TicketContainer:{
        backgroundColor: 'white',
        width: 340,
        height: '70%',
        borderRadius: 15,
        borderColor: 'white',
        marginBottom: 140,
      },
      TitleText:{
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
      },
      TicketText:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      rebookContainer:{
        backgroundColor: '#F0EFFF',
        width: 300,
        height: '30%',
        borderRadius: 15,
        borderColor: 'white',
        marginLeft: 18,
        alignItems: 'center',
      },
      cancelDesign:{
        width: 100,
        height: 40,
        borderRadius: 10,  
        overflow: 'hidden',
        backgroundColor: 'red',
        alignItems: 'center',
        marginRight:10,
      },
      cancelText:{
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
      },
      rebookDesign:{
        width: 100,
        height: 40,
        borderRadius: 10,  
        overflow: 'hidden',
        backgroundColor: '#4A79E5',
        alignItems: 'center',
      },
      rebookText:{
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
      },
});

export default NotificationMessage;