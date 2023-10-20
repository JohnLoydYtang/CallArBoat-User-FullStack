import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image} from "react-native";
import { Picker } from '@react-native-picker/picker';

//CSS
import styles from '../assets/css/BottomNavigationStyle/HistoryStyle';

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

export default History;