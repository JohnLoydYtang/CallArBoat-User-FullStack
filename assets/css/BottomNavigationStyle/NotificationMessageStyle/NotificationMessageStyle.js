import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    companyName:{
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    reasonTitle:{
        fontWeight: 'bold',
        marginLeft: 30,
        fontSize: 15,
        marginTop:10,
    },
    Content:{
        marginLeft: 20,
        fontSize: 18,
        padding:20,
    },
      TicketContainer:{
        backgroundColor: 'white',
        width: 340,
        height: '60%',
        borderRadius: 15,
        borderColor: 'white',
        marginBottom: 240,
      },
      TitleText:{
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
      },
      TicketText:{
        fontSize: 15,
        fontWeight: 'bold',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
      },
      closeButtonText: {
        color: 'white',
      },
});