import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Image } from "react-native";
import axios from "axios";
import { Card } from "react-native-shadow-cards";
import {Leopard, LeopardErrors } from "@picovoice/leopard-react-native";

export default function SpeechScreen({ navigation, route }) {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, getMessage] = React.useState("");
  const ACCESS_KEY=''

  async function startRecording(){
    setRecording(1)
    getMessage("ON")
  }


  async function stopRecording(){
    setRecording(0);
    getMessage("OFF")
    speech2text()
  }

  async function speech2text(){
    try {
      const leo = await Leopard.create(ACCESS_KEY)
      transcript = await leo.processFile(require("../../../assets/TEST_SPEECH_2.wav"))
      getMessage(transcript)
    }
    catch (err){
      if (err instanceof LeopardErrors){
        getMessage("Error")
      }
    }
  }
  return (
    <View>
      <Text style={styles.header}>SPEECH SCREEN</Text>

      <Card style={{ padding: 10, margin: 10, backgroundColor: "#d4e4f4" }}>
        <View style={{ backgroundColor: "white", padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Image
              style={{ width: 50, height: 50, backgroundColor: "transparent" }}
              source={require("../../../assets/schedule.png")}
            />
            <Image
              style={{ width: 50, height: 50, backgroundColor: "transparent" }}
              source={require("../../../assets/mail.png")}
            />
          </View>
        </View>
      </Card>
      
      <Card style={{ padding: 10, margin: 10, backgroundColor: "#d4e4f4" }}>
        <Button
          mode="contained"
          icon="record"
          title="update"
          color="green"
          accessibilityLabel="Learn more about this green button"
        />
      </Card>

      <Card style={{ padding: 10, margin: 10, backgroundColor: "#d4e4f4" }}>
      <Text style={styles.text}>
        Note: All audio is processed locally. We do not use a cloud service for automatic speech recognition.
      </Text>
        <Button
          title={recording ? "Record" : "Stop"}
          mode="contained"
          color="green"
          //onPress={() => Alert.alert("Testing 1,2,3")}
          onPress={recording ? stopRecording : startRecording}
        />
        <Text styles={styles.text}>
          Transcript: {message}
        </Text>

      </Card>
    </View>
  );
}

const options = {
  sampleRate: 160000,
  channels: 1,
  bitsPerSample: 16
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

  header2: {
    color: "hsl(205.2,88.7%,41.6%)",
    fontWeight: "bold",
    fontSize: 20,
  },
  header3: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    padding: 1,
    color: "#565656",
    fontSize: 14,
  },
});
