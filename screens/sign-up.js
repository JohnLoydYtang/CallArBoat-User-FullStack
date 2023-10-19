import { db } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, Modal, View} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({ navigation, route }) => {
  const [name, onChangeText] = useState('');
  const [number, onChangeNumber] = useState('');
  const [username, onChangeUsername] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = async () => {
    setNameError('');
    setNumberError('');
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setError('');

    if (name.trim() === '') {
      setNameError('Please input your name');
      return;
    }

    if (number.trim() === '') {
      setNumberError('Please input your phone number');
      return;
    }
    if (number.trim().length !== 11) {
      setNumberError('Please enter a valid phone number');
      return;
    }

    if (username.trim() === '') {
      setUsernameError('Please input your username');
      return;
    }

    if (email.trim() === '') {
      setEmailError('Please input your email');
      return;
    }
    
    if (!email.trim().includes('@') || !email.trim().includes('.com')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    if (password.trim() === '') {
      setPasswordError('Please input your password');
      return;
    }
    if (password.trim().length < 6) {
      setPasswordError('Password should be at least 6 characters');
      return;
    }


    try {
      const auth = getAuth(); // Initialize the auth object

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Access the 'users' collection
      const usersCollection = collection(db, 'Passengers');

      // Add a new document with a generated ID
      await setDoc(doc(usersCollection), {
        userID: userCredential.user.uid, // Store the user's ID in the document
        name: name,
        phoneNumber: number,
        username: username,
        email: email,
        password: password,
      });

      // Navigate to the verification screen or any other screen
      navigation.navigate('Verification', { phoneNumber: number });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('Email is already in use');
      } else {
        console.error('Error saving data:', error);
      }
    }
  };

    return (
          <KeyboardAvoidingView   keyboardVerticalOffset={100} style={styles.container}>
        <Text style={styles.Common}>Sign Up</Text>

        {nameError !== '' && <Text style={styles.error}>{nameError}</Text>}
       <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={name}
            placeholder="Name"
        />

        {numberError !== '' && <Text style={styles.error}>{numberError}</Text>}
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <TextInput
            style={styles.input}
            onChangeText={number => onChangeNumber(number)}
            value={number}
            placeholder="Phone Number"
            keyboardType="phone-pad"
        />

        {usernameError !== '' && <Text style={styles.error}>{usernameError}</Text>}
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeUsername(text)}
            value={username}
            placeholder="Username"
        />
        
        {emailError !== '' && <Text style={styles.error}>{emailError}</Text>}
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <TextInput
            style={styles.input}
            onChangeText={text => onChangeEmail(text)}
            value={email}
            placeholder="Email"
        />

        {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <TextInput
            style={styles.inputPass}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry
        />

    <TouchableOpacity style={styles.ButtonDesign} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

    <Text style={styles.commontext}>ALREADY HAVE AN ACCOUNT?</Text>
    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.text2}>SIGN IN</Text>
    </TouchableOpacity>

    <StatusBar style="auto"/>
      </KeyboardAvoidingView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    },
  ButtonDesign:{
    width: 180,
    height: 48,
    borderRadius: 10,  
    marginTop: 20, 
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
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    top: 10,
    fontSize: 19,
  },
  text1: {
    fontSize: 13,
    marginTop: 30,
  },
  commontext:{
    right:30,
    marginTop: 40,
  },
  text2: {
    color: '#4A79E5',
    marginLeft: 200,
    bottom: 18,
  },
  Common: {
    marginBottom: 25,
    fontSize: 30,
    fontWeight: 'bold',
  },
  error:{
    color:'red',
  },
  successText:{
    color:'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      alignItems: 'center',
  },
  modalText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
  },
  modalButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      top: 10,
  },
  modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
});
  
export default SignUp;