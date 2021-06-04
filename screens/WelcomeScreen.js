import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: '',
      fontVisible: false,
    };
  }

  useFont = async () => {
    await Font.loadAsync({
      KoHo: {
        uri: require('../assets/fonts/KoHo-SemiBold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({
      fontVisible: true,
    });
  };
  componentDidMount() {
    this.useFont();
  }
  render() {
    if (this.state.fontVisible === true) {
      return (
        <ImageBackground
          source={require('../assets/image.png')}
          style={styles.screenContainer}>
          <View>
            <Image
              source={require('../assets/corona_icon.png')}
              style={{
                width: RFValue(150),
                height: RFValue(100),
                alignSelf: 'center',
                marginTop: RFValue(50),
              }}
            />
            <Text style={styles.screenHeader}>COVID HELPER</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate('CreateAccount');
              }}>
              <Text style={styles.buttonText}>Create An Account</Text>
            </TouchableOpacity>

            <Text style={styles.stepDirector}>
              New to app? Please create an account to continue
            </Text>
          </View>
        </ImageBackground>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  screenHeader: {
    fontSize: RFValue(37),
    color: '#7e0da1',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'KoHo',
  },

  screenContainer: {
    height: '100%',
    width: '100%',
  },
  buttonLogin: {
    backgroundColor: '#8c3ee6',
    height: RFValue(45),
    width: RFValue(270),
    borderRadius: RFValue(40),
    marginTop: RFValue(70),
    alignSelf: 'center',
    padding: RFValue(5),
    shadowColor: '#8f6da3',
    shadowOffset: { width: -2, height: 8 },
    shadowRadius: RFValue(10),
    elevation: RFValue(16),
  },

  button: {
    backgroundColor: '#8c3ee6',
    height: RFValue(45),
    width: RFValue(350),
    borderRadius: RFValue(40),
    marginTop: RFValue(70),
    alignSelf: 'center',
    padding: RFValue(5),
    shadowColor: '#8f6da3',
    shadowOffset: { width: -2, height: 8 },
    shadowRadius: RFValue(10),
    elevation: RFValue(16),
  },
  buttonText: {
    fontSize: RFValue(25),
    color: '#ffc7f1',
    textAlign: 'center',
  },
  stepDirector: {
    fontSize: RFValue(20),
    color: '#5c0069',
    marginTop: RFValue(60),
  },
});
