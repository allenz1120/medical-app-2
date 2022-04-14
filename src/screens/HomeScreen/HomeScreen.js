import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Image, Dimensions } from "react-native";
import axios from "axios";
import { Card } from "react-native-shadow-cards";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function HomeScreen({ navigation, route }) {

  var [home_longitude, set_home_longitude] = useState()
  var [home_latitude, set_home_latitude] = useState()
  var [home_location, set_home_location] = useState()
  var requestUri = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(route.params.address) + ".json?access_token=pk.eyJ1IjoiYWxsZW56MTEyMCIsImEiOiJja2JneTRhb3YwMDE0MzVucmQ5cHJxOWhiIn0.PIK8vgLwjuIxqm9VChhI-g";
  axios
  .get(requestUri)
  .then((response) =>{
    set_home_longitude(response["data"].features[0].center[0])
    set_home_latitude(response["data"].features[0].center[1])
    set_home_location(response["data"].features[0].place_name)
  })

  return (
    <View>
      <Text style={styles.header}>
        {" "}
        Welcome {route.params.first_name} {route.params.last_name}!
      </Text>
      <Card style={{ padding: 10, margin: 10, backgroundColor: "#d4e4f4" }}>
        <Text style={styles.header2}>Care Team and Recent Providers</Text>
        <View style={{ backgroundColor: "white", padding: 10 }}>
          <Text style={styles.header3}>{route.params.pcp}, MD</Text>
          <Text style={styles.text}>Primary Care</Text>
          <Text style={styles.text}>Internal Medicine</Text>
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
          Your current email address is {route.params.email} and address is{" "}
          {route.params.address}. Is this correct?
        </Text>
        <Button
          title="Confirm"
          color="green"
          accessibilityLabel="Learn more about this green button"
        />
      </Card>
      <Card style={{ padding: 10, margin: 10, backgroundColor: "#d4e4f4" }}>
        <Text style={styles.header2}>
          Save time while you save paper! Sign up for paperless billing.
        </Text>
        <Button
          title="Learn More"
          color="green"
          accessibilityLabel="Learn more about this green button"
        />
      </Card>

      <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: (home_latitude+42.345550)/2,
         longitude: (home_longitude-71.10094)/2,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
       <Marker
      coordinate={{ latitude : home_latitude , longitude : home_longitude }}
      title = {home_location}
    />
    <Marker
      coordinate={{ latitude : 42.345550 , longitude : -71.100940 }}
      title = "Boston Vanguard"
    />
    </MapView>
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
  map: {
    height:250,
    width:Dimensions.get('window').width,
    
  },
});
