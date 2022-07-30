import React, { useContext } from "react";
import { Dimensions, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../context/user-context";
import { totalFocusTime } from "../tools/calculate-focus-time";

export default function Dashboard({ visible, setVisible }) {
  const { user } = useContext(UserContext);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"#fff"} hidden={false} barStyle={"dark-content"} />
        <View style={styles.navbar}>
          <View>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.close}>X</Text>
            </TouchableOpacity>
          </View>
          <View><Text style={styles.title}>Dashboard</Text></View>
          <View></View>
        </View>
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <View>
            <View>
              <Text>Total Focus Time</Text>
              <Text>{totalFocusTime(user.history)}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center'
  },
  navbar: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width - 20,
    justifyContent: 'space-between'
  },

  close: {
    fontSize: 28,
    color: '#8c8c8c',
    transform: [
      { scaleX: 1.1 },
      { scaleY: 0.9 }
    ],
  },
  title: {
    fontSize: 20,
  }
});