import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SearchTravel = ({navigation}) => {

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
          <View style={styles.TicketContainer}></View>
          <Text style={styles.ResultText}>Results</Text>
          <ScrollView style={styles.scrollView}>
            {DestinationDetails.map((item, index) => (
              <TouchableOpacity key={index}style={styles.DestinationDetails} onPress={() => navigation.navigate('ViewTicketTransaction')}>
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TicketContainer:{
    backgroundColor: '#4A79E5',
    width: '90%',
    height: '20%',
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  ResultText:{
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 270
  },
  scrollView: {
    width: '90%',
    padding: 10,
  },
  DestinationDetails: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#E2E1F2',
  },
  departureStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontSize: 20,
  },
  image:{
    height: 100,
    width: 100
  },
  textContainer:{
    marginLeft: 20,
  },
  DestinationDetailsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  arrivalStyle:{
    fontSize: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  departureText:{
    marginRight: 50,
  },
  departureStyle:{
    color:'#3A78F2',
    marginRight: 50,
    marginLeft: 6,
  },
  arrivalStyle:{
    color:'#3A78F2',
    marginRight: 30,
  },
  portText:{
    marginRight: 60,
    marginLeft: 18,
  },
  portStyle:{
    color:'#3A78F2',
    marginRight: 70,
    marginLeft: 28
  },
  personStyle:{
    color:'#5CB85C',
    marginRight: 30,
  }
});

export default SearchTravel;
