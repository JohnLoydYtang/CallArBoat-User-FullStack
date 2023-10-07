import React, { useState } from 'react';
import { StatusBar, StyleSheet, KeyboardAvoidingView, TextInput, Text, TouchableOpacity} from "react-native";

const SignUp = ({navigation, route}) => {
const [Name, onChangeText] = React.useState('');
const [number, onChangeNumber] = React.useState('');
const [Username, onChangeUsername] = React.useState('');
const [password, onChangePassword] = React.useState('');

    return (
          <KeyboardAvoidingView   keyboardVerticalOffset={100} style={styles.container}>
        <Text style={styles.Common}>Sign Up</Text>

       <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={Name}
            placeholder="Name"
        />

        <TextInput
            style={styles.input}
            onChangeText={number => onChangeNumber(number)}
            value={number}
            placeholder="Phone Number"
            keyboardType="phone-pad"
        />

        <TextInput
            style={styles.input}
            onChangeText={text => onChangeUsername(text)}
            value={Username}
            placeholder="Username"
        />

        <TextInput
            style={styles.inputPass}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry
        />

    <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('Verification')}>
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
  }
});
  
export default SignUp;