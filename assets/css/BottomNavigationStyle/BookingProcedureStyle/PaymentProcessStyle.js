import { StyleSheet } from 'react-native';

export default StyleSheet.create({    
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    TitleTextStyle:{
      fontWeight:'bold',
      fontSize: 20,
      marginBottom: 30,
    },
    MultipleTextStyle:{
      paddingBottom:50,   
      marginRight: 150,
    },
    InputTextStyle:{
      fontWeight:'bold',
      paddingBottom: 5,
      fontSize: 17,
    },
    PaymentTextStyle:{
      fontWeight:'bold',
      fontSize: 20,
      marginRight: 130,
      paddingBottom: 20,
    },
    dropdownContainer:{
      backgroundColor: 'white',
      height: 60,
      width: 135, 
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,   
      marginTop: 5,
    },
    PickerTextStyle:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,  
      marginBottom: 10,
      width: 280,
      height: 60,
      overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,  
        fontWeight: 'bold',
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputTextStyle:{
      marginRight: 10,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    ButtonDesign:{
      width: 211,
      height: 48,
      borderRadius: 10,  
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
      marginTop: 20,
      marginBottom: 30,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      top: 10,
      fontSize: 19,
    },
  });
  