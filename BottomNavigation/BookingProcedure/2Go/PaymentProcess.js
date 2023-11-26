import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity , Pressable, Button, Image, ScrollView} from 'react-native';
import { AuthContext } from '../../../AuthContext';
import {db} from '../../../firebaseConfig';
import axios from 'axios';
import { collection, getDocs  } from 'firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';

//CSS
import styles from '../../../assets/css/BottomNavigationStyle/BookingProcedureStyle/PaymentProcessStyle';

const PaymentProcess = ({navigation}) => {
  const route = useRoute();
  console.log("route ", route);
  const selectedDateString = route.params?.Date;
  const selectedDate = new Date(selectedDateString);  
  const name = route.params?.Name;
  const age = route.params?.Age;
  const gender = route.params?.Gender;
  const selectedValueAccom = route.params?.AccomType;
  const selectedValueTicket = route.params?.TicketType;
  const { Discount } = route.params;
  const { item } = route.params;
  console.log('item', item);
  const { companyItem} = route.params;
  console.log('companyItem', companyItem);

  
  const { isAuthenticated } = useContext(AuthContext);
  const [paymentMethods, setPaymentMethods] = useState([]);

    console.log('isAuthenticated:', isAuthenticated);

    useEffect(() => {
      fetchPaymentMethods();
    }, []);
  
    const fetchPaymentMethods = async () => {
      try {
        const options = {
          method: 'POST',
          url: 'https://api.paymongo.com/v1/payment_methods',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Bearer YOUR_API_SECRET_KEY'
          }
        };
  
        const response = await axios.request(options);
        const { data } = response.data;
        setPaymentMethods(data);
      } catch (error) {
        console.error('Failed to fetch payment methods', error);
      }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.TitleTextStyle}>Ticket Details:</Text>           
            <View style={styles.MultipleTextStyle}>     
            <Text style={styles.InputTextStyle}>Company Name: <Text style={{textDecorationLine: 'underline'}}>{companyItem.companyName}</Text></Text> 
            <Text style={styles.InputTextStyle}>Name: <Text style={{textDecorationLine: 'underline'}}>{name}</Text></Text>
                <Text style={styles.InputTextStyle}>Vessel:</Text>
                <Text style={styles.InputTextStyle}>Route: <Text style={{textDecorationLine: 'underline'}}>{item.route_name}</Text></Text>
                <Text style={styles.InputTextStyle}>Sail Date: <Text style={{textDecorationLine: 'underline'}}>{selectedDate.toLocaleDateString()}</Text></Text>
                <Text style={styles.InputTextStyle}>Accom: <Text style={{textDecorationLine: 'underline'}}>{selectedValueAccom}</Text></Text>
                <Text style={styles.InputTextStyle}>Sex/Age: <Text style={{textDecorationLine: 'underline'}}>{gender}</Text> / <Text style={{textDecorationLine: 'underline'}}>{age}</Text></Text>
                <Text style={styles.InputTextStyle}>Ticket Type: <Text style={{textDecorationLine: 'underline'}}>{selectedValueTicket}</Text></Text>
                <Text style={styles.InputTextStyle}>Fare: <Text style={{textDecorationLine: 'underline'}}>₱{item.Price}</Text></Text>
                <Text style={styles.InputTextStyle}>Discount: <Text style={{textDecorationLine: 'underline'}}>{Discount}%</Text></Text>
                <Text style={styles.InputTextStyle}>App Transac Fee: </Text>
                <Text style={styles.InputTextStyle}><Text style={{color:'red'}}>Total:</Text></Text>    
            </View>


            <Text style={styles.PaymentTextStyle}>Payment Method:</Text>

            <View>
                {paymentMethods.map((paymentMethod) => {
                    if (paymentMethod.attributes.logo && (paymentMethod.attributes.name === 'GCASH' || paymentMethod.attributes.name === 'Paymaya')) {
                    return (
                        <Image
                        key={paymentMethod.id}
                        source={{ uri: paymentMethod.attributes.logo }}
                        style={{ width: 100, height: 100 }}
                        />
                    );
                    }
                    return null;
                })}
            </View>

        </View>
    );
};

export default PaymentProcess;
