import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal} from "react-native";

//CSS
import styles from '../../assets/css/BottomNavigationStyle/TicketTransaction/TicketTransactionStyle';

const TicketTransaction = ({navigation}) => {
        const [showPrompt, setShowPrompt] = useState(false);
        const [isCancelled, setIsCancelled] = useState(false);
        
        const handleNormalCancel = () => {
          setShowPrompt(false);
        };

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
      
            <TouchableOpacity style={styles.cancelDesign} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

      <Modal visible={showPrompt} transparent>
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>Are you sure you want to cancel?</Text>
          <Text style={styles.descriptionText}>Refund will be at the office but without the {'\n'}                    app transaction fee.</Text>
          {isCancelled && <Image source={require('../../assets/images/cancelled.png')} style={styles.cancelledImage} />}
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleNormalCancel}>
              <Text style={styles.newCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCancel}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            <TouchableOpacity style={styles.viewDesign} onPress={() => navigation.navigate('ViewTicketTransaction')} >
                <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
      </View>
    </View>
    );
};

export default TicketTransaction;