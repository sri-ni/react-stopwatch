var formatTime = require('minutes-seconds-milliseconds');
var React = require('react-native');
var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight
} = React;

var StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function() {
    return <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.timerWrap]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonsWrap]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer]}>
        {this.laps()}
      </View>
    </View>
  },
  laps: function() {
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          #{index + 1} : {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight underlayColor="gray" onPress={this.handleStartPress} style={[styles.button, style]}>
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  handleLapPress: function() {
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap]) 
    });
  },
  handleStartPress: function() {
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({
        running: false
      })
      return;
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  },
  lapButton: function() {
    return <TouchableHighlight underlayColor='gray' onPress={this.handleLapPress} style={styles.button}>
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },
  border: function(color) {
    return {
      borderColor: color,
      borderWidth: 5
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1,
    backgroundColor: '#dfdfdf'
  },
  timerWrap: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  buttonsWrap: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#efefef'
  },
  timer: {
    color: '#575757',
    fontSize: 50
  },
  button: {
    backgroundColor: '#f7f7f7',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#999',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#78BB45'
  },
  stopButton: {
    borderColor: '#BB7845'
  },
  lap: {
    borderWidth: 1,
    borderColor: '#efefef',
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 5
  },
  lapText: {
    fontSize: 25
  }
})

// fat arrow syntax
AppRegistry.registerComponent('stopwatch', () => StopWatch);