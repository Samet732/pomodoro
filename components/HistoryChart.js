import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getLastWeekFocusTime } from "../tools/calculate-focus-time";

export default function HistoryChart({ history }) {
  const week = getLastWeekFocusTime(history);
  const data = {
    labels: (() => {
      const weekdays = [];
      week.forEach(val => weekdays.push(new Date(val.date).toString().substring(4, 10)));
      weekdays.reverse();
      return weekdays;
    })(),
    datasets: [
      {
        data: (() => {
          const arr = [];
          week.forEach(val => {
            const hours = val.time / 3600;
            arr.push(Math.floor(hours) + parseFloat((hours % 1).toString().substring(0, 3)));
          });
          arr.reverse();
          return arr;
        })(),

      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>History</Text>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 60}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 71, 119, ${opacity})`,
          barPercentage: 0.7,
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff"
        }}
        yAxisSuffix="h"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 5
  }
});