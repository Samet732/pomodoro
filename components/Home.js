import React from "react";
import { Dimensions, Image, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { UserContext } from "../context/user-context";
import Navbar from "./Navbar";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Button from "./Button";
import Dashboard from "./Dashboard";
import Settings from "./Settings";

export default class Home extends React.Component {
  static contextType = UserContext

  constructor() {
    super();

    this.state = {
      imageHash: Date.now(),
      pomodoroStatus: PomodoroStatus.stopped,
      passingTime: 0,
      countdownKey: 0,
      dashboardVisibility: false,
      dashboardKey: 0,
      settingsVisibility: false,
    };

    this.onRandPress = this.onRandPress.bind(this);
    this.onBtnPress = this.onBtnPress.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onDashboardPress = this.onDashboardPress.bind(this);
    this.onSettingPress = this.onSettingPress.bind(this);
  }

  onDashboardPress() {
    this.setState({
      dashboardVisibility: true
    });
  }

  onRandPress() {
    this.setState({
      imageHash: Date.now(),
    });
  }

  onSettingPress() {
    this.setState({
      settingsVisibility: true
    });
  }

  onComplete(totalElapsedTime) {
    let history = this.context.user.history;
    if (this.context.user.current === "work")
      history = [...this.context.user.history, { date: Date.now(), time: totalElapsedTime }];
  
    this.setState({
      pomodoroStatus: PomodoroStatus.stopped,
      passingTime: 0,
      countdownKey: this.state.countdownKey + 1,
      dashboardKey: this.state.dashboardKey + 1
    });
    this.context.dispatch({
      type: 'POMODORO_STOP',
      payload: {
        current: this.context.user.current === "work" ? "break" : "work",
        history: history
      }
    });
  }

  onBtnPress(process) {
    switch (process) {
      case PomodoroProcess.start:
        if (this.context.user.current === "work")
          this.setState({ pomodoroStatus: PomodoroStatus.work });
        else this.setState({ pomodoroStatus: PomodoroStatus.break });
        break;
      case PomodoroProcess.pause:
        this.setState({ pomodoroStatus: PomodoroStatus.paused });
        break;
      case PomodoroProcess.stop:
        this.onComplete(this.state.passingTime);
        break;
      case PomodoroProcess.resume:
        if (this.context.user.current === "work")
          this.setState({ pomodoroStatus: PomodoroStatus.work });
        else this.setState({ pomodoroStatus: PomodoroStatus.break });
        break;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Navbar
          onSettingPress={this.onSettingPress}
          onDashboardPress={this.onDashboardPress}
          onRandPress={this.onRandPress}
        />
        <View style={styles.content}>
          <CountdownCircleTimer
          size={225}
            key={this.state.countdownKey}
            isPlaying={
              this.state.pomodoroStatus === PomodoroStatus.work || this.state.pomodoroStatus === PomodoroStatus.break
                ? true : false
            }
            duration={this.context.user.current === "work" ? this.context.user.work : this.context.user.break}
            colors={['#004777']}
            onComplete={this.onComplete}
            onUpdate={() => this.setState({ passingTime: this.state.passingTime + 1 })}
          >
            {({ remainingTime }) => {
              let minutes = Math.floor(remainingTime / 60).toString();
              let seconds = (remainingTime % 60).toString();

              if (minutes.length === 1)
                minutes = '0' + minutes;
              if (seconds.length === 1)
                seconds = '0' + seconds;

              return <>
                <Text style={styles.remaining}>{`${minutes}:${seconds}`}</Text>
                <Text style={styles.info}>{this.context.user.current}</Text>
              </>;
            }}
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
        <Dashboard 
          key={this.state.dashboardKey}
          visible={this.state.dashboardVisibility} 
          setVisible={visible => this.setState({ dashboardVisibility: visible })} 
        />
        <Settings
          visible={this.state.settingsVisibility}
          setVisible={visible => this.setState({ settingsVisibility: visible })}
        />
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
  },

  info: {
    bottom: 30,
    fontSize: 18,
    fontWeight: "300",
    color: '#404040',
    position: 'absolute'
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