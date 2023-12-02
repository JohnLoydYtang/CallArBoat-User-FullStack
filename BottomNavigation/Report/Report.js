import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity} from "react-native";
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc, serverTimestamp  } from 'firebase/firestore';
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
              
              const docRef = doc(usersCollection);
              const reportID = docRef.id;

              // Add a new document with a generated ID
              await setDoc(doc(usersCollection), {
                reportID: reportID,
                userID: user.uid, // Store the user's ID in the document
                rep_message: message,
                subject_rep: Title,
                reportDate: serverTimestamp() // Add the reportDate field
              }).then(() => {
                // After the document is added, show an alert
                Alert.alert(
                  "Report Successfully Sent",
                  "Report has been added successfully.",
                  [
                    {
                      text: "OK",
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
            {messageError !== '' && <Text style={{color:'red'}}>{messageError}</Text>}
            <TextInput
              style={styles.input}
              onChangeText={text => onChangeText(text)}
              value={message}
              placeholder=" "
            />
            <Text style={styles.Text}>Content:</Text>
            {titleError !== '' && <Text style={{color:'red'}}>{titleError}</Text>}
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