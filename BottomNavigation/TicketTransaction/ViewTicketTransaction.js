import React from 'react';
import { View, Text, Image} from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/TicketTransaction/ViewTicketTransactionStyle';

const QrCodeImage = require('../../assets/images/qrcode.png');


const ViewTicketTransaction = ({navigation}) => {
    const route = useRoute();
    const { item, medallionPrice, companyItem, total } = route.params;
    console.log('Item: ', item);
            
    const date = item.Date.toDate();
    const dateString = date.toLocaleDateString();

    const dateIssued = item.dateIssued.toDate();
    const dateIssuedString = dateIssued.toLocaleDateString();
    console.log('image qr', item.qrCodeURL);

    return (
    <View style={styles.container}>
        <View style={styles.TicketContainer}>
        </View>
        <View style={styles.TicketDetails}>

            <Text style={styles.CompanyTitle}>COMPANY NAME: <Text style={{textDecorationLine: 'underline'}}>{item.companyName}</Text></Text> 
            <View style={styles.Details}>
            <Text style={styles.NameDetails}>Name: <Text style={{textDecorationLine: 'underline'}}>{item.Name}</Text> </Text>
            <Text style={styles.VesselDetails}>Vessel: <Text style={{textDecorationLine: 'underline'}}>{item.vesselName}</Text></Text>
            <Text style={styles.RouteDetails}>Route: <Text style={{textDecorationLine: 'underline'}}>{item.routeName}</Text></Text>
            <Text style={styles.SailDetails}>Sail Date: <Text style={{textDecorationLine: 'underline'}}>{dateString}</Text> </Text>
            <Text style={styles.AccomDetails}>Accom: <Text style={{textDecorationLine: 'underline'}}>{item.AccomType}</Text></Text>
            <Text style={styles.SexDetails}>Sex/Age: <Text style={{textDecorationLine: 'underline'}}>{item.Gender}</Text> / <Text style={{textDecorationLine: 'underline'}}>{item.Age}</Text></Text>
            </View>

            <Text style={styles.DateDetails}>Date issued: <Text style={{textDecorationLine: 'underline'}}>{dateIssuedString}</Text> </Text>

            <View style={styles.AdditionalDetails}>
            <Text style={styles.FareDetails}>Fare: ₱<Text style={{textDecorationLine: 'underline'}}>{medallionPrice}</Text></Text>
            <Text style={styles.TicketTypeDetails}>Ticket Type: <Text style={{textDecorationLine: 'underline'}}>{item.TicketType}</Text> </Text>
            <Text style={styles.DiscountDetails}>Discount: <Text style={{textDecorationLine: 'underline'}}>{item.Discount}%</Text></Text>
            <Text style={styles.AppDetails}>Status:  <Text style={{textDecorationLine: 'underline'}}>{item.status}</Text></Text>
            <Text style={styles.TotalDetails}>Total: <Text style={{textDecorationLine: 'underline'}}>₱{total?.toFixed(2)}</Text></Text>
            <Text style={styles.PaidDetails}>Paid: <Text style={{color:'red'}}>Fully Paid</Text></Text>
            </View>

        </View>
        <View style={styles.TicketQrCode}>
            <Text style={styles.QrCode}>Scan Qr Code:</Text>
            {item.qrCodeURL ? 
                <Image source={{uri: item.qrCodeURL}} style={styles.qrImage}/>
                : 
                <Text style={styles.textQr}>Wait for approval / {'\n'}This is cancelled Ticket</Text>
            }
            </View>
    </View>
    );
};

export default ViewTicketTransaction;