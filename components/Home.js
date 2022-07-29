import React from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { UserContext } from "../context/user-context";
import Navbar from "./Navbar";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Button from "./Button";

export default class Home extends React.Component {
  static contextType = UserContext

  constructor() {
    super();

    this.state = {
      imageHash: Date.now(),
      pomodoroStatus: PomodoroStatus.stopped
    };

    this.onRandPress = this.onRandPress.bind(this);
    this.onBtnPress = this.onBtnPress.bind(this);
  }

  onDashboardPress() {
  }

  onRandPress() {
    this.setState({
      imageHash: Date.now(),
    });
  }

  onBtnPress(process) {
    if (process === PomodoroProcess.start) {
      //TODO handle button
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Navbar
          onDashboardPress={this.onDashboardPress}
          onRandPress={this.onRandPress}
        />
        <View style={styles.content}>
          <CountdownCircleTimer
            isPlaying={true}
            duration={7}
            colors={['#004777']}
            colorsTime={[7]}
          >
            {({ remainingTime }) => <Text style={styles.remaining}>{remainingTime}</Text>}
          </CountdownCircleTimer>
          {(() => {
            if (this.state.pomodoroStatus === PomodoroStatus.stopped)
              return <Button text={"Start"} onPress={() => this.onBtnPress(PomodoroProcess.start)} />;
            else if (this.state.pomodoroStatus === PomodoroStatus.paused) {
              return (
                <>
                  <Button text={"Resume"} onPress={() => this.onBtnPress(PomodoroProcess.resume)} />
                  <Button text={"Stop"} onPress={() => this.onBtnPress(PomodoroProcess.stop)} />
                </>
              );
            } else return <Button text={"Pause"} onPress={() => this.onBtnPress(PomodoroProcess.pause)} />
          })()}
        </View>
        <Image
          source={{ uri: `https://picsum.photos/${Dimensions.get('window').width}/${Dimensions.get('window').height}?${this.state.imageHash}` }}
          style={styles.background}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  background: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    opacity: 0.6,
    zIndex: -1
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  remaining: {
    fontSize: 26
  }
});

const PomodoroStatus = {
  "stopped": 0,
  "paused": 1,
  "work": 2,
  "break": 3
};

const PomodoroProcess = {
  "start": 0,
  "resume": 1,
  "stop": 2,
  "pause": 3
};