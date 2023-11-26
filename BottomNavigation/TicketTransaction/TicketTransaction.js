import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal} from "react-native";
import { useRoute } from '@react-navigation/native';
import { doc, deleteDoc } from "firebase/firestore";
import {db} from '../../firebaseConfig';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/TicketTransaction/TicketTransactionStyle';

const TicketTransaction = ({navigation}) => {
        const [showPrompt, setShowPrompt] = useState(false);
        const [isCancelled, setIsCancelled] = useState(false);

        const route = useRoute();
        const { item, medallionImage, medallionPrice } = route.params;
        
        const date = item.Date.toDate();
        const dateString = date.toLocaleDateString();

        const deleteDocument = async (collectionName, documentId) => {
          try {
            await deleteDoc(doc(db, collectionName, documentId));
            console.log('Document successfully deleted!');
          } catch (error) {
            console.error('Error removing document: ', error);
          }
         };
          
        const handleNormalCancel = () => {
          setShowPrompt(false);
        };

        const handleCancel = () => {
          setShowPrompt(true);
        };

        const handleConfirmCancel = async () => {
          setIsCancelled(true);
          setTimeout(() => {
            setShowPrompt(false);
          }, 5000); //Delay for 5 seconds for cancel picture
         
          setTimeout(async () => {
            await deleteDocument('Medallion-BookedTicket', item.id);
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
      {medallionImage ? 
            <Image source={{uri: medallionImage}} style={styles.image}/> : 
            <Text>No image</Text>
       }     
            <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Name: <Text style={{textDecorationLine: 'underline'}}>{item.Name}</Text></Text>
            <Text style={styles.textStyle}>Vessel: <Text style={{textDecorationLine: 'underline'}}>{item.vesselName}</Text></Text>
            <Text style={styles.textStyle}>Route: <Text style={{textDecorationLine: 'underline'}}>{item.routeName}</Text></Text>
            <Text style={styles.textStyle}>Sail Date: <Text style={{textDecorationLine: 'underline'}}>{dateString}</Text></Text>
            <Text style={styles.textStyle}>Accom: <Text style={{textDecorationLine: 'underline'}}>{item.AccomType}</Text></Text>
            <Text style={styles.textStyle}>Sex/Age: <Text style={{textDecorationLine: 'underline'}}>{item.Gender}</Text> / <Text style={{textDecorationLine: 'underline'}}>{item.Age}</Text></Text>
            <Text style={styles.textStyle}>Ticket Type: <Text style={{textDecorationLine: 'underline'}}>{item.TicketType}</Text></Text>
            <Text style={styles.textStyle}>Fare: <Text style={{textDecorationLine: 'underline'}}>₱{medallionPrice}</Text></Text>
            <Text style={styles.textStyle}>Discount: <Text style={{textDecorationLine: 'underline'}}>{item.Discount}%</Text></Text>            
            <Text style={styles.textStyle}>App Transac Fee:</Text>
            <Text style={styles.textStyle}>Total:</Text>
            <Text style={styles.paidStyle}>Paid: <Text style={{color:'red'}}>Fully Paid</Text></Text>
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

            <TouchableOpacity style={styles.viewDesign} onPress={() => navigation.navigate('ViewTicketTransaction', { item, medallionImage, medallionPrice })} >
                <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
      </View>
    </View>
    );
};

export default TicketTransaction;