import React from 'react';
import { StyleSheet, Text, View, RecyclerViewBackedScrollView } from 'react-native';
import Board from "./Board"
export default class App extends React.Component {
  render(){
    return (
      <Board/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
