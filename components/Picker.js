import React, { useState } from "react";
import {
  Picker,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
} from "react-native";
import DatePicker from "react-native-datepicker";

const PickerDemo = () => {
  const [currency, setCurrency] = useState("US Dollar");

  return (
    <View style={styles.container}>
      <View>
        <Picker
          selectedValue={currency}
          onValueChange={(currentCurrency) => setCurrency(currentCurrency)}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
        <Text
          style={{
            fontSize: 30,
            color: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Selected: {currency}
        </Text>
        {/* <Button
          title="Submit"
          color="#fff"
          onPress={() => alert('Simple Button pressed')}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  formLabel: {
    fontSize: 20,
    color: "#000000",
    padding: 25,
    marginTop: 25,
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
});

export default PickerDemo;
