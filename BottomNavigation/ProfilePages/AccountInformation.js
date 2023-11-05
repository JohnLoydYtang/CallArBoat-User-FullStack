import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Assuming you have already set up the Firebase Firestore connection

//CSS
import styles from '../../assets/css/BottomNavigationStyle/ProfilePages/AcountInformationStyle';

const AccountInformation = ({ navigation }) => {
    const [Name, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [Username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const route = useRoute();
    const { item } = route.params;
    const maskedPassword = item.password.replace(/./g, '*');

    const updateUserAccount = async () => {
      try {
        const passengerRef = doc(db, 'Passengers', item.id); // Assuming 'item.id' is the ID of the user document in the Passengers collection
    
        await updateDoc(passengerRef, {
          name: Name,
          phoneNumber: number,
          username: Username,
          password: password,
        });
    
        alert('User account information updated successfully!');
        navigation.navigate('Profile'); // Replace 'ProfileScreen' with the actual name of your ProfileScreen component
      } catch (error) {
        console.error('Error updating user account information:', error);
        alert('An error occurred while updating user account information. Please try again later.');
      }
    };

    const openImagePickerAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access media library is required!');
          return;
        }
      
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
      
        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
              const selectedAsset = result.assets[0];
              setSelectedImage(selectedAsset.uri);
            } else {
              alert('You did not select any image.');
            }
          } else {
            alert('Image selection was canceled.');
          }
          
      };      
  
    useEffect(() => {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access media library is required!');
        }
      })();
    }, []);
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.profilePicture} />
          ) : (
            <Image source={require('../../assets/images/default-profile-picture.png')} style={styles.profilePicture} />
          )}
        </TouchableOpacity>
        
        <View style={styles.overlay}>
         <View style={styles.TicketContainer}>
         </View>
        </View>
        
        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="user" size={45} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={Name}
            placeholder={item.name}
        />
        </View>

        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="phone" size={39} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={number => onChangeNumber(number)}
            value={number}
            placeholder={item.phoneNumber}
            keyboardType="phone-pad"
        />
        </View>
 
        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="pencil" size={39} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeUsername(text)}
            value={Username}
            placeholder={item.username}
        />
        </View>

        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="lock" size={45} color="#000"/>
        <TextInput
            style={styles.inputPass}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder={maskedPassword}
            secureTextEntry
        />
        </View>

        <TouchableOpacity style={styles.ButtonDesign} onPress={updateUserAccount}>
          <Text style={styles.buttonText}>UPDATE User Account Information</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
export default AccountInformation;