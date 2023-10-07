import React from 'react';
import { StatusBar, KeyboardAvoidingView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity} from "react-native";


const BookTicket = ({navigation}) => {
    return (
    <View style={styles.container}>
     <Text >Book Ticket</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default BookTicket;