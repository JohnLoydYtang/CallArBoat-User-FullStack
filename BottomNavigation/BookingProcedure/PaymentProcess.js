import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity , Pressable, Button, Image, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Linking } from 'react-native';
import axios from 'axios';

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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleTextStyle:{
    fontWeight:'bold',
    fontSize: 20,
    marginBottom: 30,
  },
  MultipleTextStyle:{
    paddingBottom:50,   
    marginRight: 150,
  },
  InputTextStyle:{
    fontWeight:'bold',
    paddingBottom: 5,
    fontSize: 17,
  },
  PaymentTextStyle:{
    fontWeight:'bold',
    fontSize: 20,
    marginRight: 130,
    paddingBottom: 20,
  },
  dropdownContainer:{
    backgroundColor: 'white',
    height: 60,
    width: 135, 
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,   
    marginTop: 5,
  },
  PickerTextStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,  
    marginBottom: 10,
    width: 280,
    height: 60,
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
      fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTextStyle:{
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  ButtonDesign:{
    width: 211,
    height: 48,
    borderRadius: 10,  
    overflow: 'hidden',
      backgroundColor: '#4A79E5',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    top: 10,
    fontSize: 19,
  },
});

export default PaymentProcess;
