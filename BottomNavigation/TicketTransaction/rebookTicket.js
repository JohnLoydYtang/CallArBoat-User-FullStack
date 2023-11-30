import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity , Pressable, Button, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from '@firebase/auth';
import { getFirestore, collection, doc, Timestamp, firestore, updateDoc,serverTimestamp } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRoute } from '@react-navigation/native';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/BookingProcedureStyle/BookTicketFillupStyle';

const RebookTicket = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedValueAccom, setSelectedValueAccom] = useState(null); // Set initial state to null
  const [selectedValueTicket, setSelectedValueTicket] = useState('Regular');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const uniqueId = Date.now();

  const route = useRoute();
  const { item } = route.params;
  console.log('Item:', item);

  const uploadImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, '/Medallion-BookedTicket/' + 'Valid-Id' + '-' + uniqueId);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // You can use this to monitor the progress of the upload if you want
        }, 
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
    };
   
    const handleTicketFillup = async () => {
        setError('');
      
        if ((image || '').trim() === '') {
          setError('Please upload image ');
          return;
        }
      
        try {
          setIsLoading(true);
      
          const auth = getAuth();
          const user = auth.currentUser;
      
          if (user) {
            const imageUrl = await uploadImage(image);
            const usersCollection = collection(db, 'Medallion-BookedTicket');
      
            // Assuming item.id is the ID of the document you want to update
            const docRef = doc(usersCollection, item.id);
      
            // Use the document ID to update the specific document
            await updateDoc(docRef, {
              Date: selectedDate,
              dateIssued: serverTimestamp(),
              ImageUrl: imageUrl,
              status: "pending", // update the status field with the value "pending"
            });
      
            console.log('Success Updating Data');
            navigation.goBack(); // Navigate back to the previous screen
          } else {
            setError('User not authenticated');
          }
        } catch (error) {
          console.log(error);
          setMessageError('Error Booking');
        } finally {
          setIsLoading(false);
        }
      };
      
        
   const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
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
            <Text style={styles.Text}>  Update your ticket details:{'\n'}<Text style={{color:'red'}}> (Only the date and Image can be changed)</Text></Text>
            {error !== '' && <Text style={styles.error}>{error}</Text>}
              <View style={styles.textInputStyle}>
              <Text style={styles.promptText}>Sail Date:</Text>
                <Pressable onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar" size={30} marginLeft={130} top={20} color="black" />
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
                ) }
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Location:</Text>
                    <TextInput
                      value={item.Location}
                      editable={false}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Destination:</Text>
                    <TextInput
                      value={item.Destination}
                      editable={false}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputName}>Name:</Text>
                  <TextInput
                    value={item.Name}
                    editable={false}
                  />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.textInputStyle}>
                  <Text style={styles.inputTextStyle}>Age:</Text>
                    <TextInput
                      value={item.Age}
                      editable={false}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                <Text style={styles.inputTextStyle}>Gender:</Text>
                    <TextInput
                      value={item.Gender}
                      editable={false}
                    />
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                  <Text style={styles.inputTextStyle}>Accom Type:</Text>
                    <TextInput
                      value={item.AccomType}
                      editable={false}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                <Text style={styles.inputTextStyle}>Ticket Type:</Text>
                    <TextInput
                      value={item.TicketType}
                      editable={false}
                    />
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.PickerTextStyle}>
                  <Text style={styles.inputUploadStyle}>Upload ID:</Text>
                  <Button title="Upload" onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ marginLeft: 10, width: 200, height: 200 }} />}
                </View>
              </View>

          <TouchableOpacity style={styles.ButtonDesign} onPress={handleTicketFillup} disabled={isLoading}>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="medium" color="white" />
            </View>
            ) : (            
              <Text style={styles.buttonText}>Update Ticket</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      );      
};

export default RebookTicket;