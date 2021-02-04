import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Countdown from './Countdown.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCounter: false,
      flag: false,
      reset: false,
    }
  }


  toggleCounter = () => {
    this.setState(prevState => ({
      flag: !prevState.flag,
    }))
  }

  toggleReset = () => {
    this.setState(prevState => ({
      reset: !prevState.reset
    }))
  }

  render() {
    if (this.state.reset) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Timer</Text>
          {this.setState(prevState => ({
            reset: !prevState.reset,
            flag: false,
          }))}
          {this.state.flag && <Button title="Stop" onPress={this.toggleCounter} />}
          {!this.state.flag && <Button title="Start" onPress={this.toggleCounter} />}
          <Button title="Reset" onPress={this.toggleReset}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Timer</Text>
          {<Countdown flag={this.state.flag} reset={this.state.reset} />}
          {this.state.flag && <Button title="Stop" onPress={this.toggleCounter} />}
          {!this.state.flag && <Button title="Start" onPress={this.toggleCounter} />}
          <Button title="Reset" onPress={this.toggleReset}/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 72,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
