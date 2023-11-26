import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0EFFF',
    },
    cardContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      marginTop: 15,
      
    },
    cardRow: {
      flexDirection: 'row', 
      justifyContent: 'center',
      marginBottom: 10, 
    },
    square: {
      width: 150, 
      height: 200,
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth:1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 10,
      marginRight: 10,
    },
    image: {
      width: 130,
      height: 130,
      borderRadius: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
  });