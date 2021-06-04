import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import * as firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import db from '../config';
export default class LoginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      emailId: '',
      password: '',
      fontVisible: false,
    };
  }
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
  };
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
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('Drawer');
        this.showToast('Successfully Logged In');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.showToast(errorMessage);
      });
  };
  render() {
    if (this.state.fontVisible == true) {
      return (
        <ImageBackground
          source={require('../assets/image.png')}
          style={{ height: '100%', width: '100%' }}>
          <ScrollView>
            <KeyboardAvoidingView>
              <View>
                <Text style={styles.screenHeader}>LOGIN TO APP</Text>
                <Text style={styles.textInputDirector}>➤ Email Address</Text>
                <TextInput
                  placeholder="Email Address"
                  keyboardType={'email-address'}
                  style={styles.textInput}
                  onChangeText={(text) => {
                    this.setState({
                      emailId: text,
                    });
                  }}
                />
                <Text style={styles.textInputDirector}>➤ Password</Text>
                <TextInput
                  placeholder="Password"
                  style={styles.textInput}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      password: text,
                    });
                  }}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.userLogin(this.state.emailId, this.state.password);
                  }}>
                  <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.props.navigation.navigate('Welcome');
                  }}>
                  <Text style={styles.buttonText}>GO BACK</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: RFValue(18),
    paddingLeft: RFValue(10),
    height: RFValue(50),
    marginTop: 0,
    width: RFValue(300),
    marginLeft: RFValue(30),
    borderWidth: RFValue(1),
  },
  textInputDirector: {
    fontSize: RFValue(25),
    color: '#5c0069',
    marginTop: RFValue(50),
  },
  screenHeader: {
    fontSize: RFValue(40),
    color: '#7e0da1',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: RFValue(50),
    fontFamily: 'KoHo',
  },
  button: {
    backgroundColor: '#8c3ee6',
    height: RFValue(40),
    width: RFValue(270),
    borderRadius: RFValue(40),
    marginTop: RFValue(50),
    alignSelf: 'center',

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
});
