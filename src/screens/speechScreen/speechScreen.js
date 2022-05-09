import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Image } from "react-native";
import axios from "axios";
import { Card } from "react-native-shadow-cards";
import {Leopard, LeopardErrors } from "@picovoice/leopard-react-native";
import { Audio }from 'expo-av';

export default function SpeechScreen({ navigation, route }) {
  const [recording, setRecording] = React.useState();
  const [message, getMessage] = React.useState("");
  const [rec, recInfo] = React.useState();

  //Need to storge key securly
  const ACCESS_KEY=""
  const MODEL_PATH=("../../../assets/leopard_params.pv")

  /**
   *  Checks device permissions and them start the recording
   */
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Permission granted. Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  /**
   * Stops recordings, saves it, the performs speech to text. The transcript is displayed to the user.
   */
  async function stopRecording() {
    await recording.stopAndUnloadAsync();
    console.log("Stopped recording")
    let updatedRecInfo = rec;
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    
    updatedRecInfo = {
      sound: sound,
      duration: (status.durationMillis),
      file: recording.getURI()
    };

    recInfo(updatedRecInfo);
    setRecording(undefined);
    speech2text()
  }


  async function speech2text(){
    try {
      //console.log(ACCESS_KEY)
      //console.log(MODEL_PATH)
      const leopard = await Leopard.create(ACCESS_KEY, MODEL_PATH)
      console.log("Leopard Created")
      //Audio file must be at least 16ksps
      //transcript = await leo.processFile("../../../assets/TEST_SPEECH_2.wav", "../../../assets/leopard_params.pv")
      //const transcript = await leopard.processFile("/home/tony/Documents/Courses/EC530/medical-app-2/assets/TEST_SPEECH_2.wav")
      const transcript = await leopard.processFile(rec.file)

      getMessage(transcript)
      leopard.delete()
      console.log("Leopard Deleted")

    }
    catch (err){
        getMessage("Error")
        console.log(err)
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
      <Text style={styles.text}>
        Note: All audio is processed locally. We do not use a cloud service for automatic speech recognition.
      </Text>
      <Button
          title={recording ? "Stop" : "Record"}
          mode="contained"
          color="green"
          //onPress={() => Alert.alert("Testing 1,2,3")}
          onPress={recording ? stopRecording : startRecording}
      />
      <Text style={styles.fill}>Recording</Text>
      <Button 
      style={styles.button} 
      color="green"
      onPress={() => rec.sound.replayAsync()} 
      title="Play"></Button>
        
      <Text styles={styles.text}>
        Transcript: {message}
      </Text>

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
