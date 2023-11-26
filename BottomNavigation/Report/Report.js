import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity} from "react-native";
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Alert } from 'react-native';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/Report/ReportStyle';

const Report = ({navigation}) => {
    const [message, onChangeText] = React.useState('');
    const [Title, onChangeMessage] = React.useState('');
    const [messageError, setMessageError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [error, setError] = useState('');

    const handleReport = async () => {
        setMessageError('');
        setTitleError('');
        setError('');
    
        if (message.trim() === '') {
          setMessageError('                      Please subject of the report');
          return;
        }
    
        if (Title.trim() === '') {
          setTitleError('                      Message cannot be empty!');
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
                rep_message: message,
                subject_rep: Title,
              }).then(() => {
                // After the document is added, show an alert
                Alert.alert(
                  "Document Added",
                  "Document has been added successfully.",
                  [
                    {
                      text: "OK",
                      onPress: () => console.log("OK Pressed"),
                    },
                  ]
                );
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
            {messageError !== '' && <Text style={styles.error}>{messageError}</Text>}
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                value={message}
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
            value={Title}
            />

        <TouchableOpacity style={styles.ButtonDesign} onPress={handleReport}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
};

export default Report;