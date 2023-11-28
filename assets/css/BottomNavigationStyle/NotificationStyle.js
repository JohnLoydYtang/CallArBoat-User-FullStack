import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ButtonDesign:{
      width: 120,
      height: 48,
      borderRadius: 10,  
      overflow: 'hidden',
      backgroundColor: '#4A79E5',
      alignItems: 'center',
      marginTop: 8,
      marginLeft: 220,
    },
    buttonText:{
      color: 'white',
      marginTop: 15,
      fontWeight: 'bold',
    },
    scrollView: {
      width: '90%',
      padding: 10,
    },
    notification: {
      marginBottom: 10,
      padding: 30,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    notificationText: {
      fontSize: 16,
    },
    textNotif:{
      fontSize:20,
      fontWeight:'bold',
      marginTop:200,
      marginLeft:70
    }
});