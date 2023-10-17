import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity , Pressable, Button, Image, ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const BookTicketFillup = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // Add showDatePicker state variable
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedValue, setSelectedValue] = useState('Male');
  const [selectedValueAccom, setSelectedValueAccom] = useState('Economy');
  const [selectedValueTicket, setSelectedValueTicket] = useState('Regular');
  const [image, setImage] = useState(null);
  

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setSelectedDate(currentDate);
    setShowDatePicker(false); // Hide the date picker after selecting a date
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleAgeChange = (text) => {
    setAge(text);
  };

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const handleDestinationChange = (text) => {
    setDestination(text);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.Text}>Fill up your ticket details:</Text>

              <View style={styles.textInputStyle}>
              <Text style={styles.promptText}>Date:</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar" size={30} marginLeft={150} top={20} color="black" />
                  <TextInput
                    value={selectedDate.toDateString()} // Display the selected date in the TextInput
                    editable={false} // Disable direct editing of the TextInput
                    style={styles.dateInput} // Add the style here
                  />
                </Pressable>
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Location:</Text>
                    <TextInput
                      placeholder="Input your Location                                     "
                      value={location}
                      onChangeText={handleLocationChange}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Destination:</Text>
                    <TextInput
                      placeholder="Input your Destination                                         "
                      value={destination}
                      onChangeText={handleDestinationChange}
                    />
                </View>
              </View>
              
              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputName}>Name:</Text>
                  <TextInput
                    placeholder="Input your name                                         "
                    value={name}
                    onChangeText={handleNameChange}
                  />
                </View>
              </View>
                
              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Age:</Text>
                    <TextInput
                      placeholder="Input your age                                         "
                      value={age}
                      onChangeText={handleAgeChange}
                      keyboardType="numeric"
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                <Text style={styles.inputTextStyle}>Gender:</Text>
                  <View style={styles.dropdownContainer}>
                  <Picker selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                    <Picker.Item label="MALE" value="Male"/>
                    <Picker.Item label="FEMALE" value="Female"/>
                  </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                  <Text style={styles.inputTextStyle}>Accom Type:</Text>
                    <View style={styles.dropdownContainer}>
                      <Picker selectedValue={selectedValueAccom} onValueChange={(itemValue) => setSelectedValueAccom(itemValue)}>
                        <Picker.Item label="BUSINESS" value="Business"/>
                        <Picker.Item label="ECONOMY" value="Economy"/>
                      </Picker>
                    </View>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                <Text style={styles.inputTextStyle}>Ticket Type:</Text>
                  <View style={styles.dropdownContainer}>
                    <Picker selectedValue={selectedValueTicket} onValueChange={(itemValue) => setSelectedValueTicket(itemValue)}>
                    <Picker.Item label="REGULAR" value="Regular"/>
                      <Picker.Item label="STUDENT" value="Student"/>
                      <Picker.Item label="SENIOR" value="Senior"/>
                      <Picker.Item label="DISABLED" value="Disabled"/>
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                  <Text style={styles.inputUploadStyle}>Upload ID:</Text>
                  <Button title="Upload" onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ marginLeft: 10, width: 200, height: 200 }} />}
                </View>
              </View>

              <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('PaymentProcess')}>
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
        </ScrollView>
      );      
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text:{
    marginBottom: '5%',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
  textInputStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
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
  },
  promptText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dateInput: {
    marginBottom: 25, 
  },
  dropdownContainer:{
    backgroundColor: 'white',
    height: 60,
    width: 150, 
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
  promptText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,  
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputName:{
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    top: 10,
    fontSize: 19,
  },
  inputUploadStyle:{
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});

export default BookTicketFillup;
