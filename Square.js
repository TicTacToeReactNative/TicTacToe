import React from 'react';
import { StyleSheet, Text, View, Dimensions, RecyclerViewBackedScrollView, Button } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Square extends React.Component {

  press = () => {
    let{id, pressSquare} = this.props
    return pressSquare(id)
  }
  
  render(){
    let {value} = this.props
    return (
      <View style={styles.container}>
        <Button onPress = {this.press} title = {value.toString()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    height: screenWidth * 0.9/3,
    borderWidth: 1,
    borderColor: 'black'
  },
});
