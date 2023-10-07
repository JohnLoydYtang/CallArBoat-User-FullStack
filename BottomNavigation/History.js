import React, { useState } from 'react';
import { StyleSheet, View, Text, Button} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const History = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const data = [
    {date: new Date('2023-10-01'), value: 'Event 1'},
    {date: new Date('2023-10-03'), value: 'Event 2'},
    {date: new Date('2023-10-02'), value: 'Event 3'},
  ];

  const sortedData = data.sort((a, b) => a.date - b.date);
  
  const items = sortedData.map((item, index) => ({ label: item.date.toDateString(), value: item.date }));
  
  return (
    <View style={styles.container}>
      <DropDownPicker
  placeholder="Filter by date"
  items={[
    {label: 'Old to Latest', value: 'oldToLatest'},
    {label: 'Latest to Old', value: 'latestToOld'},
  ]}
  defaultValue={selectedDate}
  containerStyle={{ height: 40 }}
  style={{ backgroundColor: '#fafafa' }}
  itemStyle={{
    justifyContent: 'flex-start'
  }}
  dropDownStyle={{ backgroundColor: '#fafafa' }}
  onChangeItem={item => {
    if (item.value === 'oldToLatest') {
      setSortOrder('oldToLatest');
    } else if (item.value === 'latestToOld') {
      setSortOrder('latestToOld');
    }
  }}
/>
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