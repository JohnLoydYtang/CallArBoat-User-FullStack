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
    textHistory:{
      fontSize:20,
      fontWeight:'bold',
      marginTop:250,
      marginLeft:90
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
    approvedText: {
      backgroundColor: '#D1EED6',
      color: 'green',
      fontSize: 14,
      alignSelf:'center',
      marginRight: 200,
      padding: 8,
      borderRadius: 10,
    },
    pendingText: {
      backgroundColor: '#4895ef',
      padding: 8,
      borderRadius: 10,
      color: 'white',
      fontSize: 14,
      alignSelf:'center',
      marginRight: '75%',
    },
    cancelledText: {
      backgroundColor: 'red',
      padding: 8,
      borderRadius: 10,
      color: 'white',
      fontSize: 14,
      alignSelf:'center',
      marginRight: '70%',
    },
});
