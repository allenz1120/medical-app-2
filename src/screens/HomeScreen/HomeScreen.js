import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import {Card} from 'react-native-shadow-cards';



export default function HomeScreen({ navigation, route }) {
  return(
    <View>
      <Text style={styles.header}> Welcome {route.params.first_name} {route.params.last_name}!</Text>
      <Card style={{padding: 10, margin: 10, backgroundColor:"#d4e4f4"}}>
        <Text style={styles.header2}>Care Team and Recent Providers</Text>
        <View style={{backgroundColor:"white", padding: 10}}>
        <Text style={styles.header3}>{route.params.pcp}, MD</Text>
        <Text style={styles.text}>Primary Care</Text>
        <Text style={styles.text}>Internal Medicine</Text>
        <View style={{flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'}}>
      <Image style={{width: 50, height: 50, backgroundColor: 'transparent'}}source={require('../../../assets/schedule.png')} />
      <Image style={{width: 50, height: 50, backgroundColor: 'transparent'}}source={require('../../../assets/mail.png')} />
    </View>
    </View>
      </Card>
      <Card style={{padding: 10, margin: 10, backgroundColor:"#d4e4f4"}}>
      <Text style={styles.text}>Your contact information and notification preferences need review. Your current email address is {route.params.email} and address is {route.params.address}. Is this correct?
</Text>
      <Button title="Confirm" color="green" accessibilityLabel="Learn more about this green button"/>
      </Card>
      <Card style={{padding: 10, margin: 10, backgroundColor:"#d4e4f4"}}>
      <Text style={styles.header2}>Save time while you save paper! Sign up for paperless billing.</Text>
      <Button title="Learn More" color="green" accessibilityLabel="Learn more about this green button"/>
      </Card>
      <Card style={{padding: 10, margin: 10, backgroundColor:"#d4e4f4"}}>
      <Text style={styles.header2}>Proof of COVID-19 Vaccination</Text>
      <Text style={styles.text}>Click here to share your COVID-19 testing and vaccination information quickly, easily, and securely, right from MyHealth.</Text>
      <Button title="Check it out" color="green" accessibilityLabel="Learn more about this green button"/>
      </Card>
      
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    padding: 10,
    color: 'hsl(205.2,88.7%,41.6%)',
    fontWeight: 'bold',
    fontSize: 30,
  },
  header2: {
    color: 'hsl(205.2,88.7%,41.6%)',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header3: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    padding: 1,
    color: '#565656',
    fontSize: 14,
  }
});
