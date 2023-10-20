import { StyleSheet } from 'react-native';

export default StyleSheet.create({    
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    LineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 200,
      marginTop: 20,
      marginBottom: 5,
    },
    Lineinput:{
      width: 40,
      height: 40,
      fontSize: 24,
      textAlign: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#4A79E5',
    },
    imageContainer: {
      marginBottom: 20,
      marginTop: 25,
  },
    ButtonDesign:{
      width: 200,
      height: 48,
      borderRadius: 10,  
      marginTop: 40, 
      overflow: 'hidden',
      backgroundColor: '#4A79E5',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 6,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      top: 10,
      fontSize: 19,
    },
    text2: {
      color: '#4A79E5',
      marginTop: 20,
      fontWeight: 'bold',
    },
    TextCommon: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
    },
  });