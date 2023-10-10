import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal} from "react-native";


const TicketTransaction = ({navigation}) => {
        const [showPrompt, setShowPrompt] = useState(false);
        const [isCancelled, setIsCancelled] = useState(false);

        const handleCancel = () => {
          setShowPrompt(true);
        };

        const handleConfirmCancel = () => {
          setIsCancelled(true);
          setTimeout(() => {
            setShowPrompt(false);
          }, 5000); //Delay for 5 seconds for cancel picture

          setTimeout(() => {
            navigation.goBack();
          }, 2000); // Delay for 1 seconds before closing the modal and navigating back 
        };

        useEffect(() => {
          let timeoutId;
        
          if (isCancelled) {
            timeoutId = setTimeout(() => {
              setShowPrompt(false);
            }, 10000); // Delay for 10 second before closing the modal
          }
          return () => {
            clearTimeout(timeoutId);
          };
        }, [isCancelled]);
        
    return (
    <View style={styles.container}>
      <View style={styles.TicketContainer}>
      <Image source={require('../../assets/images/default-profile-picture.png')} style={styles.image}/>
      <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Name:</Text>
            <Text style={styles.textStyle}>Vessel:</Text>
            <Text style={styles.textStyle}>Route:</Text>
            <Text style={styles.textStyle}>Sail Date:</Text>
            <Text style={styles.textStyle}>Accom:</Text>
            <Text style={styles.textStyle}>Seat/Bed#:</Text>
            <Text style={styles.textStyle}>Sex/Age:</Text>
            <Text style={styles.textStyle}>Ticket Type:</Text>
            <Text style={styles.textStyle}>Fare</Text>
            <Text style={styles.textStyle}>Discount</Text>
            <Text style={styles.textStyle}>App Transac Fee:</Text>
            <Text style={styles.textStyle}>Total:</Text>
            <Text style={styles.paidStyle}>Paid:</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      
            <TouchableOpacity style={styles.cancelDesign} onPress={handleCancel} >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

      <Modal visible={showPrompt} transparent>
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>Are you sure you want to cancel?</Text>
          <Text style={styles.descriptionText}>Refund will be at the office but without the {'\n'}                    app transaction fee.</Text>
          {isCancelled && <Image source={require('../../assets/images/cancelled.png')} style={styles.cancelledImage} />}
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.newCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCancel}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            <TouchableOpacity style={styles.viewDesign} >
                <Text style={styles.viewText}>View</Text>
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
      height: '80%',
      borderRadius: 15,
    },
    image:{
      height: 130,
      width: 130,
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 50,
      marginBottom: 10,
    },
    textContainer:{
      marginLeft: 20,
      padding: 10,
    },
    textStyle:{
      fontWeight: 'bold',
      paddingBottom: 4,
      fontSize: 15,
    },
    paidStyle:{
      color: 'red',
      fontWeight: 'bold',
      fontSize: 15,
      marginTop: 10,
    },
    cancelDesign:{
      width: 130,
      height: 50,
      borderRadius: 5,  
      backgroundColor: 'red',
      alignItems: 'center',
      marginRight:10,
      marginTop: 30,
      marginBottom: 10,
    },
    cancelText:{
      color: 'white',
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 20,
    },
    viewDesign:{
      width: 130,
      height: 50,
      borderRadius: 5,  
      backgroundColor: '#4A79E5',
      alignItems: 'center',
      marginTop: 30,
    },
    viewText:{
      color: 'white',
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    promptContainer: {
      backgroundColor: 'white',
      padding: 10,
      width: '90%',
      borderRadius: 10,
      alignItems: 'center',
      marginTop: '80%',
      marginLeft: 19,
      borderColor: 'black',
      borderWidth: 1,
    },
    promptText: {
      fontWeight:'bold',
      fontSize: 18
    },
    descriptionText:{
      fontSize: 14
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    cancelButton: {
      width: 100,
      height: 40,
      borderRadius: 5,  
      backgroundColor: 'red',
      alignItems: 'center',
      marginRight:10,

    },
    newCancelText: {
      color: 'white',
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 15,
    },
    confirmButton: {
      width: 100,
      height: 40,
      borderRadius: 5,  
      backgroundColor: '#4A79E5',
      alignItems: 'center',
    },
    confirmText: {
      color: 'white',
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 15,
    },
    cancelledImage: {
      marginTop: 10,
      width: 100,
      height: 100,
    }
});

export default TicketTransaction;