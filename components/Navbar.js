import React, { useContext } from "react";
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { UserContext } from "../context/user-context";

export default function Navbar({ onDashboardPress, onRandPress }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.navbar}>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.group}>
        <TouchableOpacity onPress={onDashboardPress}>
          <Image style={styles.button} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2329/2329087.png' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onRandPress}>
          <Image style={styles.button} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/60/60879.png' }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10
  },

  name: {
    fontSize: 20,
    flex: 10
  },

  button: {
    width: 25,
    height: 25
  },

  group: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});