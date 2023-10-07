import React, { useState, useRef } from 'react';
import { StatusBar, StyleSheet, KeyboardAvoidingView, Image, Text, TouchableOpacity, View, TextInput} from "react-native";

const getVerification = require('../assets/images/verification.png');

const Verification = ({ navigation }) => {
    const [code, setCode] = useState('');
  const codeInputs = useRef([]);

  const handleCodeChange = (index, value) => {
    const newCode = code.split('');
    newCode[index] = value;
    setCode(newCode.join(''));

    if (value && index < codeInputs.current.length - 1) {
      codeInputs.current[index + 1].focus();
    }
  };
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container}>

        <View style={styles.imageContainer}>
            <Image source={getVerification}/>
        </View>

            <Text style={styles.TextCommon}>Verification Code</Text>
            <Text> Please Enter code sent {'\n'} to 09287505435temp</Text>

            <View style={styles.LineContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (codeInputs.current[index] = ref)}
            style={styles.Lineinput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleCodeChange(index, value)}
          />
        ))}
      </View>
        
            <StatusBar style="auto" />

            <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.text2}>Resend Code</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 20,
    marginBottom: 5,
  },
  Lineinput:{
    width: 40,
    height: 40,
    fontSize: 24,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4A79E5',
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: 25,
},
  ButtonDesign:{
    width: 200,
    height: 48,
    borderRadius: 10,  
    marginTop: 40, 
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
  text2: {
    color: '#4A79E5',
    marginTop: 20,
    fontWeight: 'bold',
  },
  TextCommon: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
});
  
export default Verification;