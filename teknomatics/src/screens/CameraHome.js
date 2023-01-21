import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import RNFS from 'react-native-fs'
const CameraHome = ({navigation}) => {
  console.log(RNFS)
  return (
    <View style={styles.container}>
      <Button onPress={()=>navigation.navigate("Camera")} title="Record a Video" color={Colors.black.default} />
    </View>
  );
};

export default CameraHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20
  },
});
