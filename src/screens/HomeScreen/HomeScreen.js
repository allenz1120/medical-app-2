import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { Card } from "react-native-shadow-cards";

export default function HomeScreen(props) {
  return (
    <View>
      <Text style={styles.header}>Welcome!</Text>
      <Card style={{ padding: 10, margin: 10 }}>
        <Text></Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    padding: 10,
    color: "hsl(205.2,88.7%,41.6%)",
    fontWeight: "bold",
    fontSize: 30,
  },
});
