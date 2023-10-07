import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { StatusBar, KeyboardAvoidingView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity} from "react-native";

const getLogo = require('../assets/images/Logo1.png');

const SignIn = ({navigation}) => {
    const [value, onChangeText] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
      };
    
    return (
    <KeyboardAvoidingView   keyboardVerticalOffset={100} style={styles.container}>
        <View style={styles.imageContainer}>
            <Image source={getLogo}/>
        </View>

        <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            value={value}
            placeholder="Username"
        />

        <TextInput
            style={styles.inputPass}
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry
        />

        <CheckBox
        containerStyle={styles.checkboxContainer}
            title="REMEMBER ME"
            checked={rememberMe}
            onPress={handleRememberMe}
        />


    <TouchableOpacity style={styles.ButtonDesign} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>

    <TouchableOpacity>
            <Text style={styles.text1}>Forgot Your Password?</Text>
    </TouchableOpacity>

    <Text style={styles.commontext}>DON'T HAVE AN ACCOUNT?</Text>
      
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.text2}>SIGN UP</Text>
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
    imageContainer: {
      marginTop: 80,
    },
    input: {
      margin: 12,
      padding: 10,
      width: 240,
      marginTop: 35,
      marginBottom: 20,
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
      marginLeft: 180,
      bottom: 18,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      right:  30,
      width: 200,
      backgroundColor: 'white',
      borderWidth: 0,
    },
  });
  
export default SignIn;
