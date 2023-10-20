import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity , Pressable, Button, Image, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Linking } from 'react-native';
import axios from 'axios';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/BookingProcedureStyle/PaymentProcessStyle';

const PaymentProcess = ({navigation}) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);

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
                <Text style={styles.InputTextStyle}>Name:</Text>
                <Text style={styles.InputTextStyle}>Vessel:</Text>
                <Text style={styles.InputTextStyle}>Route:</Text>
                <Text style={styles.InputTextStyle}>Sail Date:</Text>
                <Text style={styles.InputTextStyle}>Accom:</Text>
                <Text style={styles.InputTextStyle}>Seat/Bed#:</Text>
                <Text style={styles.InputTextStyle}>Sex/Age:</Text>
                <Text style={styles.InputTextStyle}>Ticket Type:</Text>
                <Text style={styles.InputTextStyle}>Fare:</Text>
                <Text style={styles.InputTextStyle}>Discount</Text>
                <Text style={styles.InputTextStyle}>App Transac Fee:</Text>
                <Text style={styles.InputTextStyle}>Total:</Text>
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
