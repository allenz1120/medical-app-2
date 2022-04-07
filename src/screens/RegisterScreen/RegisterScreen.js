import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { Card } from "react-native-shadow-cards";
import Picker from "../../../components/Picker";
import DatePicker from "react-native-datepicker";

export default function RegisterScreen(props) {
  const [date, setDate] = useState("2000-12-03");
  const [email, setEmail] = useState("example@example.com");
  const [firstName, setfirstName] = useState("John");
  const [lastName, setlastName] = useState("Doe");
  const [address, setAddress] = useState("123 Example Dr");
  const [pcp, setpcp] = useState("Dr. Anonymous");
  console.log(email);
  console.log(firstName);
  console.log(lastName);
  console.log(address);
  console.log(pcp);

  const pushData = (date, email, firstName, lastName, address, pcp) => {
    var requestUri = "http://54.159.10.87:8000/users/";
    console.log(requestUri);
    console.log(email);
    console.log(firstName);
    console.log(lastName);
    console.log(address);
    console.log(pcp);

    axios
      .post(requestUri, {
        email: email,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: "2000-12-03",
        address: address,
        sex: "Male",
        pcp: pcp,
      })
      // .post(requestUri, {
      //   email: "test@example.edu",
      //   first_name: "test",
      //   last_name: "test",
      //   date_of_birth: "2000-12-03",
      //   address: "123 Commonwealth Ave",
      //   sex: "Male",
      //   pcp: "Dr. Test",
      // })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.formLabel}> Account Registration </Text>
      <TextInput
        placeholder="Email"
        style={styles.inputStyle}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        placeholder="First Name"
        style={styles.inputStyle}
        onChangeText={(val) => setfirstName(val)}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.inputStyle}
        onChangeText={(val) => setlastName(val)}
      />
      <TextInput
        placeholder="Address"
        style={styles.inputStyle}
        onChangeText={(val) => setAddress(val)}
      />
      <TextInput
        placeholder="PCP"
        style={styles.inputStyle}
        onChangeText={(val) => setpcp(val)}
      />
      <Text style={styles.text}> Date of Birth: </Text>
      <DatePicker
        style={styles.datePickerStyle}
        date={date} // Initial date from state
        mode="date" // The enum of date, datetime and time
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        maxDate="01-01-2023"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            //display: 'none',
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={(date) => {
          setDate(date);
        }}
      />
      <Picker />
      <TouchableOpacity
        style={styles.button}
        onPress={() => pushData(date, email, firstName, lastName, address, pcp)}
      >
        <Text style={styles.buttonTitle}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 10,
    color: "hsl(205.2,88.7%,41.6%)",
    fontWeight: "bold",
    fontSize: 30,
  },

  formLabel: {
    fontSize: 20,
    color: "#000000",
    padding: 25,
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#b9e4c9",
  },
  formText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
  },
  text: {
    color: "#000000",
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 20,
  },
  text2: {
    color: "#000000",
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 50,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  buttonTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 0,
    height: 48,
    borderRadius: 5,
    width: 175,
    alignItems: "center",
    justifyContent: "center",
  },
});
