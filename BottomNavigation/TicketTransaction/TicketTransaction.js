import React from 'react';
import { StatusBar, KeyboardAvoidingView, StyleSheet, TextInput, View, Image, Text, TouchableOpacity} from "react-native";


const TicketTransaction = ({navigation}) => {
    return (
    <View style={styles.container}>
     <Text >Ticket Transaction</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0EFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default TicketTransaction;