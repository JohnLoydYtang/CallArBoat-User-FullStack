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
    profileContainer:{
      marginBottom: 50,
      marginRight: 240,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 75,
      marginTop: 50,
    },
    name:{
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20,
      marginLeft: 330,
      width: 200,
      marginTop: 50,
    },
    number:{
      color: 'white',
      fontSize: 15,
      marginLeft: 330,
      width: 200,
    },
     detailsContainer: {
      width: 400,
      borderTopWidth: 1,
      borderTopColor: 'white',
    },
    details:{
      color: 'white',
      padding: 10,
      fontSize: 18,
      marginLeft: 15,
    },
    logout:{
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20,
      marginLeft: 15,
      marginTop: 350,
      marginBottom: 30,
    }
  });