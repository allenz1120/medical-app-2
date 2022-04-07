import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import * as Google from "expo-google-app-auth";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "293213095726-su3o0t6c6t2irst7k9bj722uh7co8rf4.apps.googleusercontent.com",
        // behavior:'web',
        iosClientId:
          "293213095726-oacojpdlnpq1obdk52ba9to5ccaiseqi.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        var email = result.user.email;
        // Query db to see if user is already registered
        var requestUri = "http://54.159.10.87:8000/users/";
        console.log(requestUri);
        axios
          .get(requestUri)
          .then((response) => {
            var user_found = false
            var userlist = response["data"];
            console.log(response["data"]);
            userlist.forEach((user, i) => {
              if (user.email == email) {
                user_found = true
                navigation.navigate("Home", {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  pcp: user.pcp,
                  email: user.email,
                  address: user.address,
                });
              }
            });
            if (user_found == false){
              navigation.navigate("Register");
            }
          })
          .catch((error) => {
            console.log(error);
          });

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => signInWithGoogleAsync()}
      >
        <Text style={styles.buttonTitle}>Log in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

// export default LoginScreen
