import React from 'react';
import { View, Text, Image} from "react-native";

//CSS
import styles from '../../assets/css/BottomNavigationStyle/TicketTransaction/ViewTicketTransactionStyle';

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

export default ViewTicketTransaction;