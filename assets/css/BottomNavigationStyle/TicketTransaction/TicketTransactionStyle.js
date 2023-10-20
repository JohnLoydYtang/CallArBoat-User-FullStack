import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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