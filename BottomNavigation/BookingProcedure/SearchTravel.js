import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/BookingProcedureStyle/SearchTravelStyle';

const SearchTravel = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('Bohol');

    const DestinationDetails = [
      { departure: '8:00 AM', arrive: '2:00 PM', port: '3', person: '₱250.00' },
      { departure: '10:00 AM', arrive: '2:00 PM', port: '3', person: '₱250.00' },
      { departure: '8:00 AM', arrive: '2:00 PM', port: '3', person: '₱250.00' },
      { departure: '8:00 AM', arrive: '2:00 PM', port: '3', person: '₱250.00' },
      { departure: '8:00 AM', arrive: '2:00 PM', port: '3', person: '₱250.00' },
      { departure: '8:00 AM', arrive: '2:00 PM', port: '3', person: '₱250.00' },
      { departure: '8:00 AM', arrive: '2:00 PM', port: '3', person: '₱250.00' },
  
      // Add more notifications as needed
    ];
    return (
        <View style={styles.container}>
          <View style={styles.TicketContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.FromText}>From</Text>
                <Text style={styles.ToText}>To</Text>
              </View>

              <View style={styles.rowContainer}>
                <Text style={styles.CebuText}>CEB</Text>
                <Icon name="arrow-right" size={30} color="white" />
                <View style={styles.dropdownContainer}>
                <Picker selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                  <Picker.Item label="BOH" value="Bohol" style={styles.textStyle}/>
                  <Picker.Item label="MAN" value="Manila" style={styles.textStyle} />
                </Picker>
                </View>
              </View>
              
              <View style={styles.rowContainer}>
                <Text style={styles.AnotherCebuStyle}>Cebu</Text>
                <Text style={styles.SelectedValueStyle}>{selectedValue}</Text>
              </View>


          </View>
          <Text style={styles.ResultText}>Results</Text>
          <ScrollView style={styles.scrollView}>
            {DestinationDetails.map((item, index) => (
              <TouchableOpacity key={index}style={styles.DestinationDetails} onPress={() => navigation.navigate('BookTicketFillup')}>
                <View style={styles.DestinationDetailsContent}>
                  <Image source={require('../../assets/images/default-profile-picture.png')} style={styles.image}/>

                  <View style={styles.textContainer}>

                   <View style={styles.rowContainer}>
                        <Text style={styles.departureText}>Departure</Text>
                        <Text style={styles.arrivalText}>Arrival</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.departureStyle}>{item.departure}</Text>
                        <Text style={styles.arrivalStyle}>{item.arrive}</Text>
                    </View>

                    <View style={styles.rowContainer}>
                        <Text style={styles.portText}>Port</Text>
                        <Text style={styles.personText}>/Person</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.portStyle}>{item.port}</Text>
                        <Text style={styles.personStyle}>{item.person}</Text>
                    </View>

                  </View>
                  
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      );      
};

export default SearchTravel;
