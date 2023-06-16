import React from 'react';

import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import LoginForm from './screens/LoginScreen';
import RegisterForm from './screens/RegistrationScreen';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require('./img/imgBG.png')}
        >
          <RegisterForm />
          {/* <LoginForm /> */}
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>sdasdsa';'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
});
