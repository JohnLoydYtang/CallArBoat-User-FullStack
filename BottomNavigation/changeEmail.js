import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TextInput, Text, TouchableOpacity} from "react-native";
import { getAuth, updateEmail, sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential,fetchSignInMethodsForEmail, verifyBeforeUpdateEmail } from 'firebase/auth';

// CSS
import styles from '../assets/css/screensStyle/sign-upStyle';

const ChangeEmail = ({ navigation }) => {
  const [newEmail, onChangeNewEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChangeEmail = async () => {
    setEmailError('');
    setPasswordError('');

    if (newEmail.trim() === '') {
      setEmailError('Please input your new email');
      return;
    }

    if (!newEmail.trim().includes('@') || !newEmail.trim().includes('.com')) {
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

      // Get the current user
      const user = auth.currentUser;

      console.log('user', user);
      
      if (user) {
        // Re-authenticate the user with their current password
        const credential = EmailAuthProvider.credential(user.email, password, EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD);
        await reauthenticateWithCredential(user, credential);
      
        // Continue with the rest of your code after re-authentication
      } else {
        console.error('User is not signed in.');
      }

      if (user) {
        await verifyBeforeUpdateEmail(user, newEmail);
        console.log('Email verification sent. Please check your new email for verification.');
      } else {
        console.error('User is not signed in.');
      }
   
      // Check if the new email is already in use
      const signInMethods = await fetchSignInMethodsForEmail(newEmail);
      if (signInMethods.length > 0) {
        setEmailError('Email is already in use');
        return;
      }
      // Update the email
      await updateEmail(user, newEmail);
      console.log('Email updated successfully.');
      alert('Email updated successfully. Please check your new email for verification.');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('Email is already in use');
      } else if (error.code === 'auth/operation-not-allowed') {
        setEmailError('Please verify the new email before changing email.');
      } else if (error.code === 'auth/invalid-login-credentials') {
        setPasswordError('Wrong Password');
      } else if (error.message && error.message.includes("Cannot create property '_canInitEmulator' on string")) {
        console.warn('Firebase Emulator-related error:', error);
      } else {
        console.error('Error saving data:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container}>
      <Text style={{color:'red',fontWeight:'bold'}}>Check your provided email, it will send a verification email!</Text>
      {emailError !== '' && <Text style={styles.error}>{emailError}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeNewEmail(text)}
        value={newEmail}
        placeholder="New Email"
      />
      {passwordError !== '' && <Text style={styles.error}>{passwordError}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={text => onChangePassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.ButtonDesign} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Change Email</Text>
      </TouchableOpacity>
      <StatusBar style="auto"/>
    </KeyboardAvoidingView>
  );
};

export default ChangeEmail;
