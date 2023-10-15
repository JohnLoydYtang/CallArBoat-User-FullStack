import React from 'react';
import { StyleSheet, View, TouchableOpacity} from "react-native";


const ViewTicketTransaction = ({navigation}) => {
    return (
    <View style={styles.container}>
        <View style={styles.TicketContainer}>
          
        </View>
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
    TicketContainer:{
        backgroundColor: '#4A79E5',
        width: 1000,
        height: '100',
      },
});

export default ViewTicketTransaction;