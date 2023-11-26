import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, Modal, View} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Alert } from 'react-native';

import styles from '../assets/css/screensStyle/sign-upStyle';

const ForgotPassword = ({ navigation }) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const auth = getAuth();
 
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Success',
          'Password reset email sent',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ]
        );
      })
      .catch((error) => {
        console.error('Error sending password reset email: ', error);
        setError(error.message);
      });
   };
       
return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container}>
    {error !== '' && <Text style={styles.error}>{error}</Text>}
    <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
    />
    <TouchableOpacity style={styles.ButtonDesign} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send Email</Text>
    </TouchableOpacity>
    <Text style={styles.commontext}>ALREADY HAVE AN ACCOUNT?</Text>
    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.text2}>SIGN IN</Text>
    </TouchableOpacity>
    <StatusBar style="auto"/>
    </KeyboardAvoidingView>
);
}

export default ForgotPassword;
   
