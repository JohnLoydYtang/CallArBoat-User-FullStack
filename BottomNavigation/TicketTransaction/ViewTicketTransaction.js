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
        backgroundColor: 'white',
        width: 340,
        height: '90%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 5,
      },
});

export default ViewTicketTransaction;