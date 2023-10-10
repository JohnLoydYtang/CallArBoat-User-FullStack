import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image} from "react-native";
import { Picker } from '@react-native-picker/picker';


const History = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('Latest');

  const Transaction = [
    { name: 'Bohol', description: 'Economy', date: '2022-01-01' },
    { name: 'Notification 2', description: 'Economy', date: '2022-01-02' },
    { name: 'Notification 3', description: 'Economy', date: '2022-01-03' },
    { name: 'Notification 3', description: 'Economy', date: '2022-01-03' },
    { name: 'Notification 3', description: 'Economy', date: '2022-01-03' },
    { name: 'Notification 3', description: 'Economy', date: '2022-01-03' },
    { name: 'Notification 3', description: 'Economy', date: '2022-01-03' },

    // Add more notifications as needed
  ];
    return (
    <View style={styles.container}>

    <View style={styles.dropdownContainer}>
      <Picker
      prompt='Filter Date'
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Latest" value="Latest" />
        <Picker.Item label="Old" value="Old" />
      </Picker>
      </View>

      <ScrollView style={styles.scrollView}>
      {Transaction.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.Transaction}
          onPress={() => navigation.navigate('TicketTransaction')}
        >
          <View style={styles.TransactionContent}>
            <Image
              source={require('../assets/images/default-profile-picture.png')}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.TransactionName}>{item.name}</Text>
              <Text style={styles.TransactionDesc}>{item.description}</Text>
              <Text style={styles.dateText}>Date: {item.date}</Text>
              {item.scanned ? <Text style={styles.scannedText}>Scanned</Text> : <Text style={styles.notScannedText}>Not Scanned</Text>} 
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
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdownContainer:{
      width: 130, 
      marginTop: 10,
      marginLeft: 200, 
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
    },
    scrollView: {
      width: '90%',
      padding: 10,
    },
    Transaction: {
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    TransactionName: {
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
    TransactionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    TransactionDesc:{
      fontSize: 15,
    },
    scannedText: {
      backgroundColor: '#D1EED6',
      color: 'green',
      fontSize: 14,
      alignSelf:'center',
      marginRight: 30,
      padding: 8,
      borderRadius: 10,
    },
    notScannedText: {
      backgroundColor: '#FFCFD3',
      padding: 8,
      borderRadius: 10,
      color: 'red',
      fontSize: 14,
      alignSelf:'center',
      marginRight: 30,
    },
});

export default History;