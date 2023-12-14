import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { useRoute } from '@react-navigation/native';
import { doc, deleteDoc, updateDoc, addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from '../../firebaseConfig';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/TicketTransaction/TicketTransactionStyle';

const TicketTransaction = ({navigation}) => {
        const [showPrompt, setShowPrompt] = useState(false);
        const [isCancelled, setIsCancelled] = useState(false);
        const [isLoading, setIsLoading] = React.useState(false);

        const route = useRoute();
        const { item, medallionImage, medallionPrice, total, paymentId, vatAmount, totalWithoutVat, PaymentImage } = route.params;
      
        const date = item.Date.toDate();
        const dateString = date.toLocaleDateString();

        const updateDocument = async (collectionName, documentId, updateData) => {
          try {
            const documentRef = doc(db, collectionName, documentId);
            await updateDoc(documentRef, updateData);
            console.log('Document successfully updated!');
          } catch (error) {
            console.error('Error updating document: ', error);
          }
        };
        
        const updatePayment = async (collectionName, documentId, updateData) => {
          try {
            const documentRef = doc(db, collectionName, documentId);
            await updateDoc(documentRef, updateData);
            console.log('Payment document successfully updated!');
          } catch (error) {
            console.error('Error updating payment document: ', error);
          }
        };

        const handleNormalCancel = () => {
          setShowPrompt(false);
        };

        const handleCancel = () => {
          setShowPrompt(true);
        };

        const handleConfirmCancel = async () => {
          try {
            setIsCancelled(true);
        
            // Delay for 5 seconds for cancel picture
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
                    
            // Update documents in 'Medallion-BookedTicket' and 'Payments' collections
            await updateDocument('Medallion-BookedTicket', item.id, { status: 'cancelled by user' });
            await updatePayment('Payments', paymentId, { status: 'cancelled by user' });
        
            // Add Notification with status "cancelled by user"
            await addDoc(collection(db, 'Notifications'), {
              type: 'cancellation',
              status: 'cancelled by user',
              headerApprove: "Ticket User Cancellation",
              message: `The user ${item.Name} has cancelled the ticket voluntarily.`,
              disclaimer: 'Show your Payment Image to the staff to verify.',
              timestamp: serverTimestamp(),
              medallionBookedId: item.id, // You'll need to replace this with the actual user ID
              paymentId: paymentId,
              userID: item.user,
              PaymentImage: PaymentImage,
            });
        
              // Delay for 2 seconds before closing the modal and navigating back
              await new Promise(resolve => setTimeout(resolve, 2000));
              console.log('success');
              setShowPrompt(false);
              navigation.goBack();
              setIsLoading(false);

            } catch (error) {
              console.error('Error during cancellation: ', error);
            }
          };
          
        useEffect(() => {
          let timeoutId;
        
          if (isCancelled) {
            timeoutId = setTimeout(() => {
              setShowPrompt(false);
            }, 5000); // Delay for 3 second before closing the modal
          }
          return () => {
            clearTimeout(timeoutId);
          };
        }, [isCancelled]);

        const dateIssued = item.dateIssued.toDate();
        const dateIssuedString = dateIssued.toLocaleDateString();    

    return (
    <View style={styles.container}>
        
        <TouchableOpacity style={styles.rebookDesign} onPress={() => navigation.navigate('RebookTicket', { item})}>
                <Text style={styles.rebookText}>Re-book</Text>
        </TouchableOpacity>           
        
      <View style={styles.TicketContainer}>
      {medallionImage ? 
            <Image source={{uri: medallionImage}} style={styles.image}/> : 
            <Text>No image</Text>
       }     
            <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Vessel #: <Text style={{textDecorationLine: 'underline'}}>{item.vesselId}</Text> </Text>
            <Text style={styles.textStyle}>Date issued: <Text style={{textDecorationLine: 'underline'}}>{dateIssuedString}</Text> </Text>
            <Text style={styles.textStyle}>Name: <Text style={{textDecorationLine: 'underline'}}>{item.Name}</Text></Text>
            <Text style={styles.textStyle}>Vessel: <Text style={{textDecorationLine: 'underline'}}>{item.vesselName}</Text></Text>
            <Text style={styles.textStyle}>Route: <Text style={{textDecorationLine: 'underline'}}>{item.routeName}</Text></Text>
            <Text style={styles.textStyle}>Sail Date: <Text style={{textDecorationLine: 'underline'}}>{dateString}</Text></Text>
            <Text style={styles.textStyle}>Accom: <Text style={{textDecorationLine: 'underline'}}>{item.AccomType}</Text></Text>
            <Text style={styles.textStyle}>Sex/Age: <Text style={{textDecorationLine: 'underline'}}>{item.Gender}</Text> / <Text style={{textDecorationLine: 'underline'}}>{item.Age}</Text></Text>
            <Text style={styles.textStyle}>Ticket Type: <Text style={{textDecorationLine: 'underline'}}>{item.TicketType}</Text></Text>
            <Text style={styles.textStyle}>Fare: <Text style={{textDecorationLine: 'underline'}}>₱{medallionPrice}</Text></Text>
            <Text style={styles.textStyle}>Discount: <Text style={{textDecorationLine: 'underline'}}>{item.Discount}%</Text></Text>  
            <Text style={styles.textStyle}>VAT:  <Text style={{textDecorationLine: 'underline'}}>₱{vatAmount?.toFixed(2)}</Text></Text>          
            <Text style={styles.textStyle}>Total:  <Text style={{textDecorationLine: 'underline'}}>₱{totalWithoutVat?.toFixed(2)}</Text></Text>
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
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCancel} disabled={isLoading}>
            {isLoading ? <ActivityIndicator size="medium" color="white" /> : <Text style={styles.confirmText}>Confirm</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            <TouchableOpacity style={styles.viewDesign} onPress={() => navigation.navigate('ViewTicketTransaction', { item, medallionImage, medallionPrice, total, vatAmount, totalWithoutVat })} >
                <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
      </View>
    </View>
    );
};

export default TicketTransaction;