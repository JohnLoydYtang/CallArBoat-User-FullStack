import { StyleSheet } from 'react-native';

export default StyleSheet.create({   
    container: {
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdownContainer:{
      width: 130, 
      marginTop: 10,
      marginLeft: 200, 
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
    },
    scrollView: {
      width: '90%',
      padding: 10,
    },
    Transaction: {
      marginBottom: 10,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    TransactionName: {
      fontSize: 16,
      fontWeight: 'bold',
      fontSize: 20,
    },
    image:{
      height: 100,
      width: 100
    },
    textContainer:{
      marginLeft: 20,
    },
    TransactionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    TransactionDesc:{
      fontSize: 15,
    },
    scannedText: {
      backgroundColor: '#D1EED6',
      color: 'green',
      fontSize: 14,
      alignSelf:'center',
      marginRight: 30,
      padding: 8,
      borderRadius: 10,
    },
    notScannedText: {
      backgroundColor: '#FFCFD3',
      padding: 8,
      borderRadius: 10,
      color: 'red',
      fontSize: 14,
      alignSelf:'center',
      marginRight: 30,
    },
});
