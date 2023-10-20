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
        height: '90%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 5,
      },
      Text:{
        marginLeft: 25,
        marginTop: 10,
      },
      input: {
        margin: 12,
        padding: 10,
        width: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F0EFFF',
        marginLeft: 18
      },
      inputMessage:{
        margin: 12,
        padding: 10,
        width: 300,
        borderRadius: 10,
        backgroundColor: '#F0EFFF',
        marginLeft: 18,        
      },
      ButtonDesign:{
        width: 100,
        height: 48,
        borderRadius: 10,  
        overflow: 'hidden',
        backgroundColor: '#4A79E5',
        alignItems: 'center',
        marginBottom: 60,
        marginLeft: 120,
        marginTop: 20,
      },
      buttonText:{
        color: 'white',
        marginTop: 15,
        fontWeight: 'bold',
      }
});
