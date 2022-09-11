import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Dimensions } from 'react-native';
import { UserContext } from '../../context/user-context';

export default function Pomodoro() {
  const { user, dispatch } = useContext(UserContext);
  const [pomodoro, setPomodoro] = useState(user.work / 60);
  const [breakTime, setBreakTime] = useState(user.break / 60);

  const save = () => {
    dispatch({
      type: 'POMODORO_UPDATE',
      payload: {
        work: pomodoro * 60,
        break: breakTime * 60
      }
    });

    alert('Saved');
  };
  
  return (
    <View style={styles.container}>
      <Text>Pomodoro Time (m)</Text>
      <TextInput
        defaultValue={pomodoro.toString()}
        style={styles.input}
        onChangeText={time => setPomodoro(time)}
        keyboardType="numeric"
      />
      <Text>Break Time (m)</Text>
      <TextInput
        defaultValue={breakTime.toString()}
        style={styles.input}
        onChangeText={time => setBreakTime(time)}
        keyboardType="numeric"
      />
      <Button
        onPress={save}
        title="Save"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5
  },
});