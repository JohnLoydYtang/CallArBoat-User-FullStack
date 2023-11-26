import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Assuming you have already set up the Firebase Firestore connection
import { getStorage, ref, uploadString, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, fetchSignInMethodsForEmail, updateEmail, reauthenticateWithCredential, sendEmailVerification, EmailAuthProvider } from 'firebase/auth';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/ProfilePages/AcountInformationStyle';

const AccountInformation = ({ navigation }) => {
    const [Name, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [newEmail, onChangeNewEmail] = React.useState('');
    const [Username, onChangeUsername] = React.useState('');
    const [Password, onChangePassword] = React.useState('');
    const [Email, onChangeEmail] = React.useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const route = useRoute();
    const { item } = route.params;

    const storage = getStorage();


    const updateUserAccount = async () => {
      setError('');
    
      if (Name.trim() === '') {
        setError('Please input name');
        return;
      }
      if (number.trim() === '') {
        setError('Please input Phone Number');
        return;
      }
      if (Username.trim() === '') {
        setError('Please input username');
        return;
      }
      if (Email.trim() === '') {
        setError('Please input your email');
        return;
      }
      
      if (!emailRegex.test(Email.trim())) {
        setError('Please enter a valid email address');
        return;
      }
      if (Password.trim() === '') {
        setPasswordError('Please input your password');
        return;
      }
      if (Password.trim().length < 6) {
        setPasswordError('Password should be at least 6 characters');
        return;
      }

      try {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log('user', user);
        const email = Email.trim();
   
        // Check if the email is already in use
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length > 0) {
          setError('Email is already in use');
          return;
        }
        
        const passengerRef = doc(db, 'Passengers', item.id);
      
        // Upload the selected image to Firebase Storage
        if (selectedImage) {
          const fileExtension = selectedImage.split('.').pop();
          const fileName = `${item.name}.${fileExtension}`; // Use the user's name in the file name
          const storageRef = ref(storage, `Profile/${fileName}`);
          const downloadURL = await uploadImage(selectedImage, storageRef);
      
          // Update the profilePicture field with the download URL
          await updateDoc(passengerRef, {
            profilePicture: downloadURL,
          });
        }

        // Update other user account information
        await updateDoc(passengerRef, {
          name: Name,
          phoneNumber: number,
          username: Username,
          // email: Email,
        });

        const credential = EmailAuthProvider.credential(auth.currentUser.email,Password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updateEmail(auth.currentUser, newEmail);

        alert('Profile updated successfully.');

        navigation.navigate('Profile');
      } catch (error) {
        // if (error.code === 'auth/operation-not-allowed') {
        //   alert('Please check your email for verification. Once verified, your profile will be updated successfully.');
        // } else 
        if (error.code === 'auth/too-many-requests') {
          alert('Too many requests. Please try again later.');
        } else {
          console.error('Error updating user account information:', error);
          alert('An error occurred while updating user account information. Please try again later.');
        }
      }
    };      
    
    const uploadImage = async (imageUri, storageRef) => {
      const response = await fetch(imageUri);
      const blob = await response.blob();
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
          ) : item.profilePicture ? (
            <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
          ) : (
            <Image source={require('../../assets/images/default-profile-picture.png')} style={styles.profilePicture} />
          )}
        </TouchableOpacity>
        <View style={styles.overlay}>
         <View style={styles.TicketContainer}>
         </View>
        </View>
        {error !== '' && <Text style={{color:'red', fontWeight:'bold'}}>{error}</Text>}

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
        <Icon style={styles.icon} name="envelope" size={39} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeEmail(text)}
            value={Email}
            placeholder={item.email}
        />
        </View>

        {/* <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="envelope" size={39} color="#000"/>
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeNewEmail(text)}
            value={newEmail}
            placeholder="New Email"r
        />
        </View> */}

        <View style={styles.TextInputContainer}>
        <Icon style={styles.icon} name="lock" size={39} color="#000" />
        <TextInput
          style={styles.input}
          onChangeText={text => onChangePassword(text)}
          value={Password}
          placeholder="Current Password"
          secureTextEntry={true}
        />
      </View>
        <TouchableOpacity style={styles.ButtonDesign} onPress={updateUserAccount}>
          <Text style={styles.buttonText}>UPDATE User Account Information</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
export default AccountInformation;