import { StyleSheet } from 'react-native';

export default StyleSheet.create({    
    screenContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4A79E5',
    },
    imagecontainer: {
      marginBottom: 300,
    },
    dropdownContainer:{
      backgroundColor: 'white',
      height: 60,
      width: 180, 
      borderRadius:50,
      marginLeft:'40%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text1:{
      color: 'white',
      fontSize: 15,
      right: 120,
    },
    text2:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
      marginBottom: 100,
      right: 50,
    },
    TicketContainer:{
      backgroundColor: 'white',
      width: 290,
      height: 120,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'white',
      marginBottom: 60,
    },
    Recent:{
      fontWeight: 'bold',
      fontSize: 25,
      color: 'white',
      marginTop: '118%',
      right: 80,
    },
    card: {
      width: 200,
      height: 200,
      margin: 10,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },
    singleitem:{
      marginLeft:30,
      marginTop:6,
    }
  });
  