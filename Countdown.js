import React from 'react'
import {StyleSheet, Text, Vibration} from 'react-native'
import PropTypes from 'prop-types'
import { Constants } from 'expo';

const styles = StyleSheet.create({
  text: {fontSize: 72},
})

class Countdown extends React.Component {
  static propTypes = {
    flag: PropTypes.bool.isRequired,
    reset: PropTypes.bool.isRequired
  }
  constructor() {
    super()
    this.state = {
      seconds: 0,
      minutes: 25,
      switch: false,
    }
  }

  shouldComponentUpdate(nextProps) {
    console.log(this.props.flag)
    return this.props.flag;
  }

  componentDidMount() {
    console.log("I am mounted!")
    this.interval = setInterval(this.decrementSeconds, 1000)
  }

  componentWillUnmount() {
    console.log("unmounted")
    clearInterval(this.interval)
  }

  decrementSeconds = () => {
    if (this.state.minutes == 0 && this.state.seconds == 0) {
      if (this.state.switch) {
        this.setState(prevState => ({minutes: 24, seconds: 60, switch: !prevState.switch}))
      } else {
        this.setState(prevState => ({minutes: 4, seconds: 60, switch: !prevState.switch}))
      }
      Vibration.vibrate(500)
    }
    if (this.state.seconds == 0) {
      this.setState(prevState => ({seconds: 60, minutes: prevState.minutes-1}))
    }
    if (this.props.reset) {
      // setup timer to be reset
      this.setState(prevState => ({minutes: 24, seconds: 60}))

    }
    if (this.props.flag) {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  render() {
    if (this.state.seconds < 10) {
      return (
        <Text style={styles.text}>{this.state.minutes}:0{this.state.seconds} </Text>
      )
    } else {
      return (
        <Text style={styles.text}>{this.state.minutes}:{this.state.seconds} </Text>
      )
    }
  }
}

export default Countdown
