import React from 'react';
import { StyleSheet, Text, View, Dimensions, RecyclerViewBackedScrollView, Button } from 'react-native';
import {FlatGrid} from 'react-native-super-grid'
import Square from './Square'
import winningConditions from './winningConditions'

const{height, width} = Dimensions.get('window')

export default class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squareArray: Array(9).fill(0),
      firstPlayerTurn: true,
      firstPlayer: [],
      secondPlayer: [],
      gameOver: false,
      gameCondition: 0
    }
  }

  pressSquare = (id) => {
    let{squareArray, firstPlayerTurn, firstPlayer, secondPlayer, gameOver} = this.state
    if(squareArray[id] != 0 || gameOver){
      return
    }
    let initArray = squareArray
    initArray[id] = firstPlayerTurn ? 1 : 2
    let dummyPlayerArray = firstPlayerTurn ? firstPlayer : secondPlayer
    dummyPlayerArray.push(id)
    if(firstPlayerTurn){
      this.setState({squareArray: initArray, firstPlayer: dummyPlayerArray})
    }
    else {
      this.setState({squareArray: initArray, secondPlayer: dummyPlayerArray})
    }
    this.checkWinner()
  }

  checkWinner = () =>{
    let{firstPlayer, secondPlayer, firstPlayerTurn, squareArray} = this.state
    let player = firstPlayerTurn ? firstPlayer : secondPlayer
    let victory = true
    for(let i = 0; i < winningConditions.length; i++){
      victory = true
      let winningConditionWeAreCurrentlyChecking = winningConditions[i]
      for(let j = 0; j < winningConditionWeAreCurrentlyChecking.length; j++){
        if(!player.includes(winningConditionWeAreCurrentlyChecking[j])){
          victory = false
          break
        }
      }
      if(victory){
        break
      }
    }

    if(victory){
      this.setState({gameOver: true, gameCondition: firstPlayerTurn ? 1 : 2})
    }
    else {
      let isTie = true
      for(let i = 0; i < squareArray.length; i++){
        if(squareArray[i] == 0){
          isTie = false
          break
        }
      }
      this.setState({gameOver: isTie, firstPlayerTurn: !firstPlayerTurn})
    }
  }

  resetGame = () => {
    this.setState({
      squareArray:Array(9).fill(0),
      firstPlayerTurn: true,
      firstPlayer: [],
      secondPlayer: [],
      gameOver: false,
      gameCondition: 0})
  }

  getGameText = () => {
    const{gameOver, gameCondition} = this.state
    if(!gameOver){
      return "Tic Tac Toe"
    }
    if(gameCondition === 0){
      return "Tie"
    }
    else{
      return gameCondition === 1 ? "First Player Won" : "Second Player Won"
    }
  }

  render(){
    let{squareArray, firstPlayerTurn} = this.state
    let grid = squareArray.map((element, i) => {
      return <Square key = {i} id = {i} value = {element} pressSquare = {this.pressSquare} />
    })
    return (
      <View style={styles.container}>
        <FlatGrid 
        itemDimension={width * 0.9/3}
        items={grid}
        style={styles.board}
        staticDimension={width*0.9}
        fixed={true}
        spacing={0}
        scrollEnabled={false}
        renderItem={({item,index}) => (item)}
        />
        <Text style = {styles.gameText}>{this.getGameText()}</Text>
        <Text style = {styles.playerText}>{firstPlayerTurn ? "First Player Turn" : "Second Player Turn"}</Text>
        <View style = {styles.resetButton}>
          <Button title = "Reset" onPress = {this.resetGame} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    position: "absolute",
    top: height * 0.25,
    backgroundColor: 'transparent'
  },
  gameText: {
    position: "absolute",
    top: height * 0.1,
  },
  playerText: {
    position: "absolute",
    top: height * 0.15,
  },
  resetButton: {
    position: "absolute",
    top: height * 0.175,
  }
});
