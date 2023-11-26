import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity , Pressable, Button, Image, ScrollView, Modal, ActivityIndicator} from 'react-native';
import { AuthContext } from '../../../AuthContext';
import {db} from '../../../firebaseConfig';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { storage } from '../../../firebaseConfig';
import { getFirestore, collection, doc, setDoc, Timestamp, firestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from '@firebase/auth';

//CSS
import styles from '../../../assets/css/BottomNavigationStyle/BookingProcedureStyle/PaymentProcessStyle';

const PaymentProcess = ({navigation}) => {
  const route = useRoute();
  const selectedDateString = route.params?.Date;
  const selectedDate = new Date(selectedDateString);  
  const user = route.params?.user;
  const name = route.params?.Name;
  const age = route.params?.Age;
  const gender = route.params?.Gender;
  const selectedValueAccom = route.params?.AccomType;
  const selectedValueTicket = route.params?.TicketType;
  const { Discount } = route.params;
  const { item } = route.params;
  const { companyItem} = route.params;
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState('');
  const uniqueId = Date.now();

  const uploadImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, '/PaymentProof/' + 'Payment-Proof' + '-' + uniqueId);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // You can use this to monitor the progress of the upload if you want
        }, 
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
    };
   
    
    const handlePaymentProcess = async () => {
      setError('');
      
      if ((image || '').trim() === '') {
        setError('Please upload image ');
        return;
      }
      try {
        console.log('Start handlePaymentProcess');
        setIsLoading(true); // Set isLoading to true before starting the data saving process
     
        const auth = getAuth(); // Initialize the auth object
        const user = auth.currentUser; // Get the current user
     
        if (user) {
          console.log('Before uploadImage');
          const imageUrl = await uploadImage(image); // Upload the image and get the URL
          console.log('After uploadImage');

          const usersCollection = collection(db, 'Payments');
        // Add a new document with a generated ID
        console.log('Before setDoc');
        await setDoc(doc(usersCollection), {
          user: user.uid,
          Name: name,
          ImageUrl: imageUrl, // Save the image URL in Firestore
        });
        console.log('After setDoc');
          navigation.navigate('Dashboard'); 
          console.log('Success Saving Data');
          alert('Payment Success.');
        } else {
          console.log('Error:', error);
          setError('User not authenticated');
        }
      } catch (error) {
        console.log(error);
        setMessageError('Error Booking');
      } finally {
        setIsLoading(false); // Set isLoading back to false after the data saving process is complete
      }
     };
     

  const { isAuthenticated } = useContext(AuthContext);
  // const [paymentMethods, setPaymentMethods] = useState([]);

    console.log('isAuthenticated:', isAuthenticated);

    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const imageMapping = {
      'PaymentMethod/gcashlogo.png': 'Gcash.jpg',
      'PaymentMethod/mayalogo.jpg': 'PayMaya.jpg'
     };
      
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const storage = getStorage(); // Assuming getStorage is defined somewhere
          const paymentMethodRef = ref(storage, 'PaymentMethod');
          const paymentMethodQrRef = ref(storage, 'PaymentMethod/paymentmethodQr');
  
          const paymentMethodResult = await listAll(paymentMethodRef);
          const paymentMethodQrResult = await listAll(paymentMethodQrRef);
  
          const paymentMethodImages = await Promise.all(paymentMethodResult.items.map(imageRef => getDownloadURL(imageRef)));
          const paymentMethodQrImages = await Promise.all(paymentMethodQrResult.items.map(imageRef => getDownloadURL(imageRef)));
  
          return [paymentMethodImages, paymentMethodQrImages];
        } catch (error) {
          setError(error); // Handle and set the error state
        }
      };
  
      const loadImages = async () => {
        try {
          const [paymentMethodImages, paymentMethodQrImages] = await fetchImages();
          const images = paymentMethodImages.map((imageUrl, index) => ({
            paymentMethodImageUrl: imageUrl,
            paymentMethodQrImageUrl: paymentMethodQrImages[index]
          }));
          setImages(images);
        } catch (error) {
          setError(error); // Handle and set the error state
        }
      };
  
      loadImages();
    }, []);
  
    const handlePress = (imageUrl) => {
      try {
        const decodedFilename = decodeURIComponent(imageUrl.split('/').pop());   
        // Remove URL parameters from the decoded filename
        const filenameWithoutParams = decodedFilename.split('?')[0];
    
        // Check if the filename exists in the imageMapping object
        if (imageMapping[filenameWithoutParams]) {
          // If it exists, set the selectedImage to the mapped image URL
          setSelectedImage(imageMapping[filenameWithoutParams]);
        } else {
          // If it does not exist, set the selectedImage to the original image URL
          setSelectedImage(imageUrl);
        }
    
        setModalVisible(true);
      } catch (error) {
        setError(error);
      }
    };
  
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    
      console.log('isloading working:?' ,isLoading); // Log the isLoading state
      console.log('docref working?',setDoc); // Log the document reference
      console.log('user workling?',user); // Log the user

    return (
        <View style={styles.container}>
            <Text style={styles.TitleTextStyle}>Ticket Details:</Text>           
            <View style={styles.MultipleTextStyle}>     
            <Text style={styles.InputTextStyle}>Company Name: <Text style={{textDecorationLine: 'underline'}}>{companyItem.companyName}</Text></Text> 
            <Text style={styles.InputTextStyle}>Name: <Text style={{textDecorationLine: 'underline'}}>{name}</Text></Text>
                <Text style={styles.InputTextStyle}>Vessel: <Text style={{textDecorationLine: 'underline'}}>{item.vessel_name}</Text></Text>
                <Text style={styles.InputTextStyle}>Route: <Text style={{textDecorationLine: 'underline'}}>{item.route_name}</Text></Text>
                <Text style={styles.InputTextStyle}>Sail Date: <Text style={{textDecorationLine: 'underline'}}>{selectedDate.toLocaleDateString()}</Text></Text>
                <Text style={styles.InputTextStyle}>Accom: <Text style={{textDecorationLine: 'underline'}}>{selectedValueAccom}</Text></Text>
                <Text style={styles.InputTextStyle}>Sex/Age: <Text style={{textDecorationLine: 'underline'}}>{gender}</Text> / <Text style={{textDecorationLine: 'underline'}}>{age}</Text></Text>
                <Text style={styles.InputTextStyle}>Ticket Type: <Text style={{textDecorationLine: 'underline'}}>{selectedValueTicket}</Text></Text>
                <Text style={styles.InputTextStyle}>Fare: <Text style={{textDecorationLine: 'underline'}}>₱{item.fare_price}</Text></Text>
                <Text style={styles.InputTextStyle}>Discount: <Text style={{textDecorationLine: 'underline'}}>{Discount}%</Text></Text>
                <Text style={styles.InputTextStyle}>App Transac Fee: </Text>
                <Text style={styles.InputTextStyle}><Text style={{color:'red'}}>Total:</Text></Text>    
            </View>

            <Text style={styles.PaymentTextStyle}>Payment Method:</Text>

            <View style={{ flexDirection: 'row' }}>
              {images.map((image, index) => (
                <View key={index}>
                <TouchableOpacity onPress={() => handlePress(image.paymentMethodQrImageUrl)}>
                  <Image
                    source={{ uri: image.paymentMethodQrImageUrl }}
                    style={{ width: 80, height: 80, marginBottom:10, marginRight:10 }}
                  />
                </TouchableOpacity>
                </View>
              ))}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                  // Clear the selected image when modal is closed
                  setSelectedImage(null);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {selectedImage && (
                      <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 320, height: 600 }}
                        onLoad={() => console.log('Image loaded')}
                        onError={(e) => console.log('Image error', e.nativeEvent.error)}
                      />
                    )}
                    <TouchableOpacity
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>


            <View style={styles.PickerTextStyle}>
                  <Text style={styles.inputUploadStyle}>Upload Receipt: </Text>
                  <Button title="Upload" onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ marginLeft: 10, width: 200, height: 200 }} />}
            </View>

            <TouchableOpacity style={styles.ButtonDesign} onPress={handlePaymentProcess} disabled={isLoading}>
            {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="medium" color="white" />
            </View>
            ) : ( 
              <Text style={styles.buttonText}>Done</Text>  
              )}
          </TouchableOpacity>
        </View>
    );
};

export default PaymentProcess;
