# medical-app-2
 
## Summary of Goals and Accomplishments
Our team hoped to create a medical information platform with the ability to register new users or show existing users pertinent information about their healthcare provider. The login and registration screens leverage our MySQL database to authenticate users, which are then automatically navigated to the home screen. The home screen displays their current PCP, along with a card asking to confirm email and address, and a map displaying both the user's home address and their PCP address. The PCP, email, and address data is also sourced from the MySQL database, while the map was implemented using the MapBox API. The speech screen allows users to record their voice and play it back. Additionally, the frame work to run speech-to-text exists now, but there is a small issue preventing it from working. Ideally, A user would record audio, have it transcribed by the device, play it back, then sent the message to a doctor or healthcasre provider.

## Google Authentication API
Our team used the Google Authentication API in React Native to handle login and user authentication. After logging in with a registered Google account, the user email is checked against our database using an HTTP GET request. If the email used at login matches a user email in our database, the page will redirect to the home page and serve personal data unique to that user, such as their PCP. If the email used at login does not exist in our database, they will be redirected to a registration page where they can input their personal information such as healthcare provider.

## Google Maps API
We used the Google Maps API on our home screen to display both the current user's home address and their PCP's address. The API is accessed through the react-native-maps module through a MapView HTML tag. The MapView tag leverages the Google Maps API to display markers on a region. Each marker can be assigned a unique set of latitude and longitude coordinates along with a title. 

## Mapbox API
We used the Mapbox API to geocode the user's home and PCP addresses. By querying these addresses from the database and sending them to the Mapbox API we are able to generate the latitude and longitude coordinates for the map markers.

## Picovoice Speech-to-text API
We use this API to perform speech-to-text. Currently, the issue with the  react-native implementation is the need to pass in the model parameters. Expo-filesystem is a potential solution, but currently I have had no success with this. 

## Screenshots
![image](https://github.com/allenz1120/medical-app-2/blob/main/screenshots/Login1.png)
![image](https://github.com/allenz1120/medical-app-2/blob/main/screenshots/Login2.png)
![image](https://github.com/allenz1120/medical-app-2/blob/main/screenshots/Register.png)
![image](https://github.com/allenz1120/medical-app-2/blob/main/screenshots/HomePage.png)
![image](https://github.com/allenz1120/medical-app-2/blob/main/screenshots/SpeechScreen.png)
