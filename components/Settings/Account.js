import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Dimensions, Button, Alert } from 'react-native';
import { UserContext } from '../../context/user-context';

export default function Account() {
  const { user, dispatch } = useContext(UserContext);
  const [nickname, setNickname] = useState(nickname);

  const save = () => {
    dispatch({
      type: 'ACCOUNT_UPDATE',
      payload: {
        nickname: nickname
      }
    });

    alert('Saved');
  };

  return (
    <View style={styles.container}>
      <Text>Nickname</Text>
      <TextInput
        defaultValue={user.nickname}
        style={styles.input}
        onChangeText={nick => setNickname(nick)}
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