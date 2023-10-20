import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity} from "react-native";
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/Report/ReportStyle';

const Report = ({navigation}) => {
    const [Name, onChangeText] = React.useState('');
    const [Message, onChangeMessage] = React.useState('');
    const [nameError, setNameError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [error, setError] = useState('');

    const handleReport = async () => {
        setNameError('');
        setMessageError('');
        setError('');
    
        if (Name.trim() === '') {
          setNameError('                      Please subject of the report');
          return;
        }
    
        if (Message.trim() === '') {
          setMessageError('                      Message cannot be empty!');
          return;
        }
    
        try {
            const auth = getAuth(); // Initialize the auth object
            const user = auth.currentUser; // Get the current user
        
            if (user) {
              const usersCollection = collection(db, 'Reports');
        
              // Add a new document with a generated ID
              await setDoc(doc(usersCollection), {
                reportID: user.uid, // Store the user's ID in the document
                rep_message: Name,
                subject_rep: Message,
              });
        
              // Navigate to the verification screen or any other screen
              navigation.navigate('Profile');
            } else {
              setError('                             User not authenticated');
            }
          } catch (error) {
            console.log(error);
            setMessageError('                      Error sending report');
          }
        };

    return (
    <View style={styles.container}>
        <View style={styles.TicketContainer}>

            <Text style={styles.Text}>Subject for report:</Text>
            {error !== '' && <Text style={styles.error}>{error}</Text>}
            {nameError !== '' && <Text style={styles.error}>{nameError}</Text>}
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                value={Name}
                placeholder=" "
            />
            
            {messageError !== '' && <Text style={styles.error}>{messageError}</Text>}
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

        <TouchableOpacity style={styles.ButtonDesign} onPress={handleReport}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
};

export default Report;