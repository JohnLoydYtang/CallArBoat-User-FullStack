import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BookTicketFillup = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text>Fill up your ticket details:</Text>

            <View>
                
            </View>
        </View>
      );      
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookTicketFillup;
