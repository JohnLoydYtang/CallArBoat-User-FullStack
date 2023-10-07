import React from 'react';
import { StatusBar, KeyboardAvoidingView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity} from "react-native";


const Report = ({navigation}) => {
    const [Name, onChangeText] = React.useState('');
    const [Message, onChangeMessage] = React.useState('');

    return (
    <View style={styles.container}>
        <View style={styles.TicketContainer}>
            <Text style={styles.Text}>Subject for report:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                value={Name}
                placeholder=" "
            />
            
            <Text style={styles.Text}>Message:</Text>
            <TextInput
            style={styles.inputMessage}
            editable
            multiline
            numberOfLines={5}
            maxLength={200}
            onChangeText={text => onChangeMessage(text)}
            value={Message}
            />

        <TouchableOpacity style={styles.ButtonDesign} >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TicketContainer:{
        backgroundColor: 'white',
        width: 340,
        height: '90%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 5,
      },
      Text:{
        marginLeft: 25,
        marginTop: 10,
      },
      input: {
        margin: 12,
        padding: 10,
        width: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F0EFFF',
        marginLeft: 18
      },
      inputMessage:{
        margin: 12,
        padding: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: '#F0EFFF',
        marginLeft: 18,        
      },
      ButtonDesign:{
        width: 100,
        height: 48,
        borderRadius: 10,  
        overflow: 'hidden',
        backgroundColor: '#4A79E5',
        alignItems: 'center',
        marginBottom: 60,
        marginLeft: 120,
        marginTop: 20,
      },
      buttonText:{
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
      }
});

export default Report;