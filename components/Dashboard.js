import React, { useContext } from "react";
import { Dimensions, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../context/user-context";
import { getLastWeekFocusTime, getTotalFocusTime, getTodayFocusTime } from "../tools/calculate-focus-time";

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
        <ScrollView 
          style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#e6e6e6' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.focusTime}>
            <View style={styles.block}>
              <Text>Total Focus Time</Text>
              <Text  style={styles.hour}>{getTotalFocusTime(user.history)}</Text>
            </View>
            <View style={styles.block}>
              <Text>This Week</Text>
              <Text style={styles.hour}>{getLastWeekFocusTime(user.history)}</Text>
            </View>
            <View style={styles.block}>
              <Text>Today</Text>
              <Text style={styles.hour}>{getTodayFocusTime(user.history)}</Text>
            </View>
          </View>
        </ScrollView>
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
  },
  focusTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 20,
    paddingHorizontal: 40,
    marginTop: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 5
  },

  block: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  hour: {
    fontSize: 22,
    marginTop: 5,
    color: '#ff3333'
  }
});