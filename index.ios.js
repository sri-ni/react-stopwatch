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
      timeElapsed: null  
    }
  },
  render: function() {
    return <View style={[styles.container, this.border('#44ee77')]}>
      <View style={[styles.header, this.border('#7744ee')]}>
        <View style={[styles.timerWrap, this.border('#99dd77')]}>
          <Text>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonsWrap, this.border('#77dd99')]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer, this.border('#ee7744')]}>
        <Text>
          This is for the laps.
        </Text>
      </View>
    </View>
  },
  startStopButton: function() {
    return <TouchableHighlight underlayColor="gray" onPress={this.handleStartPress}>
      <Text>
        Start
      </Text>
    </TouchableHighlight>
  },
  handleStartPress: function() {
    console.log('start button pressed');
    var startTime = new Date();

    setInterval(() => {
      this.setState({
        timeElapsed: new Date() - startTime
      });
    }, 30);
  },
  lapButton: function() {
    return <View>
      <Text>
        Lap
      </Text>
    </View>
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
    flex: 1
  },
  timerWrap: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsWrap: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

// fat arrow syntax
AppRegistry.registerComponent('stopwatch', () => StopWatch);