import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A79E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputContainer:{
    flexDirection: 'row',
    borderColor: '#000',
  },
  icon: {
    padding: 10,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'black',
    marginBottom: 50,
    marginTop: 100,
  },
  TicketContainer:{
    backgroundColor: 'white',
    width: 400,
    height: '110%',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 275,
    zIndex: -1,
  },
  input: {
    margin: 12,
    padding: 10,
    width: 240,
    borderRadius: 10,
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
  inputPass: {
      margin: 12,
      padding: 10,
      width: 240,
      borderRadius: 10,
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
      marginBottom: 60, 
    },
    ButtonDesign:{
      width: 300,
      height: 48,
      borderRadius: 10,  
      overflow: 'hidden',
      backgroundColor: '#4A79E5',
      alignItems: 'center',
      marginBottom: 60,
    },
    buttonText:{
      color: 'white',
      marginTop: 15,
      fontWeight: 'bold',
    }
});

export default AccountInformation;
