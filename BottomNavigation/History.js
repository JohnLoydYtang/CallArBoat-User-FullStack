import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";


const History = ({navigation}) => {
    return (
    <View style={styles.container}>
     <Text >History</Text>
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

export default History;