import React from 'react';
import { StyleSheet, View, Text, Image} from "react-native";

const QrCodeImage = require('../../assets/images/qrcode.png');


const ViewTicketTransaction = ({navigation}) => {
    return (
    <View style={styles.container}>
        <View style={styles.TicketContainer}>
        </View>
        <View style={styles.TicketDetails}>
            <Text style={styles.CompanyTitle}>COMPANY NAME</Text> 

            <View style={styles.Details}>
            <Text style={styles.NameDetails}>Name: </Text>
            <Text style={styles.VesselDetails}>Vessel: </Text>
            <Text style={styles.RouteDetails}>Route: </Text>
            <Text style={styles.SailDetails}>Sail Date: </Text>
            <Text style={styles.AccomDetails}>Accom: </Text>
            <Text style={styles.SeatDetails}>Seat/Bed #: </Text>
            <Text style={styles.SexDetails}>Sex/Age: </Text>
            </View>

            <Text style={styles.DateDetails}>Date issued:</Text>

            <View style={styles.AdditionalDetails}>
            <Text style={styles.FareDetails}>Fare: </Text>
            <Text style={styles.TicketTypeDetails}>Ticket Type: </Text>
            <Text style={styles.DiscountDetails}>Discount: </Text>
            <Text style={styles.AppDetails}>App Transac Fee: </Text>
            <Text style={styles.TotalDetails}>Total: </Text>
            <Text style={styles.PaidDetails}>Paid: </Text>
            </View>

        </View>
        <View style={styles.TicketQrCode}>
        <Text style={styles.QrCode}>Scan Qr Code:</Text>
          <Image source ={QrCodeImage} style={styles.image}/> 
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
    TicketContainer:{
        backgroundColor: '#4A79E5',
        width: '90%',
        height: '6%',
      },
      TicketDetails:{
        backgroundColor: 'white',
        width: '90%',
        height: '55%',
      },
      TicketQrCode:{
        borderTopColor: 'black',
        borderTopWidth: 4,
        borderStyle: 'dotted',
        backgroundColor: 'white',
        width: '90%',
        height: '35%',
        alignItems:'center',
        overflow: 'hidden',
      backgroundColor: 'white',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 6,  
      },
      CompanyTitle:{
        transform: [{ rotate: '90deg'}],
        marginTop: 40,
        fontWeight: 'bold',
        marginLeft: 220,
        fontSize: 16,
        paddingBottom: 50,
      },
      Details:{
          transform: [{ rotate: '90deg'}],
          margin: 3,
      },
      NameDetails:{
        fontWeight: 'bold',
        bottom: 30,
      },
      VesselDetails:{
        fontWeight: 'bold',
        bottom: 20,
      },
      RouteDetails:{
        fontWeight: 'bold',
        bottom: 10,
      },
      SailDetails:{
        fontWeight: 'bold',
      },
      AccomDetails:{
        fontWeight: 'bold',
        top: 10,
      },
      SeatDetails:{
        fontWeight: 'bold',
        top: 20,
      },
      SexDetails:{
        fontWeight: 'bold',
        top: 30,
      },
      DateDetails:{
        transform: [{ rotate: '90deg'}],
        fontWeight: 'bold',
        marginLeft: 220,
        fontSize: 13,
        paddingBottom: 40,
      },
      AdditionalDetails:{
        transform: [{ rotate: '90deg'}],
      },
      FareDetails:{
        fontWeight: 'bold',
        bottom: 30,
      },
      TicketTypeDetails:{
        fontWeight: 'bold',
        bottom: 20,
      },
      DiscountDetails:{
        fontWeight: 'bold',
        bottom: 10,
      },
      AppDetails:{
        fontWeight: 'bold',
      },
      TotalDetails:{
        fontWeight: 'bold',
        top: 10,
      },
      PaidDetails:{
        color:'red',
        fontWeight: 'bold',
        top: 30,
      },
      QrCode:{
        transform: [{ rotate: '90deg'}],
        marginTop: 50,
        marginLeft: 210,
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 50,
      },
      image:{
        bottom: 100,
      }
});

export default ViewTicketTransaction;