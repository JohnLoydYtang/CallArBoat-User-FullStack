import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Modal} from "react-native";
import { useRoute } from '@react-navigation/native';

//CSS
import styles from '../../assets/css/BottomNavigationStyle/NotificationMessageStyle/NotificationMessageStyle';

const NotificationMessage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const route = useRoute();
    const notification = route.params?.notification;
    console.log('Notification passed', notification);

const handlePress = () => {
    setModalVisible(true);
};

    const handleCloseModal = () => {
        setModalVisible(false);
      };
    return (    
    <View style={styles.container}>
        <View style={styles.TicketContainer}>
         <Text style={styles.companyName}>{notification.headerApprove}</Text>
         <Text style={styles.reasonTitle}>Date: {notification.timestamp.toDate().toLocaleDateString()}</Text>
         <Text style={styles.Content}>
            {notification.message}  
         </Text>
        {notification.PaymentImage ? (
       <TouchableOpacity onPress={handlePress}>
         <Image 
           source={{uri: notification.PaymentImage}} 
           style={{height:230, width:300, left:22}}
            />
        </TouchableOpacity>
        ) : (
        <Text>No image</Text>
        )}
         <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.modalContainer}>
            <Image
                source={{ uri: notification.PaymentImage }}
                style={{ height: '40%', width: '100%' }}
            />
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            </View>
        </Modal>
            <Text style={{color:'red',left:10, top:10}}>{notification.disclaimer}</Text>     
        </View>       
    </View>
    );
};

export default NotificationMessage;