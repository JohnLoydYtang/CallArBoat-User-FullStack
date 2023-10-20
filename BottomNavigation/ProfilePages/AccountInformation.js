import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/ProfilePages/AcountInformationStyle';

const AccountInformation = ({ navigation }) => {
    const [Name, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [Username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [selectedImage, setSelectedImage] = useState(null);

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
            placeholder="John Loyd (Temp get from database)"
        />
        </View>

        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="phone" size={39} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={number => onChangeNumber(number)}
            value={number}
            placeholder="(Temp get from database)"
            keyboardType="phone-pad"
        />
        </View>
 
        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="pencil" size={39} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeUsername(text)}
            value={Username}
            placeholder="(Temp get from database)"
        />
        </View>

        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="lock" size={45} color="#000"/>
        <TextInput
            style={styles.inputPass}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="(Temp get from database)"
            secureTextEntry
        />
        </View>

        <TouchableOpacity style={styles.ButtonDesign} >
          <Text style={styles.buttonText}>UPDATE User Account Information</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
export default AccountInformation;
