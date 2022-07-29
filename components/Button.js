import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginTop: 20
  },
  text: {
    fontSize: 22,
    color: '#004777'
  }
});