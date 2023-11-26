
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4A79E5',
      alignItems: 'center',
      justifyContent: 'center',
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
    TextInputContainer:{
      flexDirection: 'row',
      borderColor: '#000',
      top:20,
    },
    icon: {
      padding: 10,
    },
    profilePicture: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 4,
      borderColor: 'black',
      marginTop: 300,
    },
    TicketContainer:{
      backgroundColor: 'white',
      width: 400,
      height: '110%',
      borderRadius: 60,
      borderWidth: 1,
      borderColor: 'white',
      marginTop: 275,
      zIndex: -1,
    },
    input: {
      margin: 12,
      padding: 10,
      width: 240,
      borderRadius: 10,
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
    },
    inputPass: {
        margin: 12,
        padding: 10,
        width: 240,
        borderRadius: 10,
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
        marginBottom: 60, 
      },
      ButtonDesign:{
        width: 300,
        height: 48,
        borderRadius: 10,  
        overflow: 'hidden',
        backgroundColor: '#4A79E5',
        alignItems: 'center',
        marginBottom: 260,
        marginTop:70
      },
      buttonText:{
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
      }
  });