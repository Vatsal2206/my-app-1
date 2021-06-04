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
import db from '../config';
import * as Font from 'expo-font';
export default class CreateAccountScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      phone_number: '',
      address: '',
      pincode: '',
      email_id: '',
      password: '',
      confirm_password: '',
      fontVisible: false,
    };
  }
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
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
  userSignUp = async (emailId, password, confirm_password) => {
    if (
      this.state.first_name === '' ||
      this.state.phone_number === '' ||
      this.state.address === '' ||
      this.state.pincode === '' ||
      this.state.email_id === ''
    ) {
      this.showToast('Please fill in all the fields to create an account');
    } else {
      if (password === confirm_password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(emailId, password)
          .then((response) => {
            db.collection('users').add({
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              phone_number: this.state.phone_number,
              email_id: this.state.email_id,
              address: this.state.address,
              pincode: this.state.pincode,
            });
            this.props.navigation.navigate('Login');

            this.showToast('User Added Successfully, please LOGIN to continue');
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.showToast(errorMessage);
          });
      } else if (password != confirm_password) {
        this.showToast(
          'Password and Confirm Password dont match, please try again!'
        );
      }
    }
  };
  render() {
    if (this.state.fontVisible === true) {
      return (
        <ImageBackground
          source={require('../assets/image.png')}
          style={{ height: '100%', width: '100%' }}>
          <ScrollView>
            <KeyboardAvoidingView>
              <View>
                <Text style={styles.screenHeader}>CREATE AN</Text>
                <Text style={styles.screenHeader2}>ACCOUNT</Text>
                <Text style={styles.textInputDirector}>➤ First Name</Text>
                <TextInput
                  placeholder="First Name"
                  style={styles.textInput}
                  maxLength={15}
                  onChangeText={(text) => {
                    this.setState({
                      first_name: text,
                    });
                  }}
                />
                <Text style={styles.textInputDirector}>➤ Last Name</Text>
                <TextInput
                  placeholder="Last Name"
                  style={styles.textInput}
                  maxLength={15}
                  onChangeText={(text) => {
                    this.setState({
                      last_name: text,
                    });
                  }}
                />
                <Text style={styles.textInputDirector}>➤ Phone Number</Text>
                <TextInput
                  placeholder="Phone Number"
                  style={styles.textInput}
                  keyboardType={'numeric'}
                  maxLength={10}
                  onChangeText={(text) => {
                    this.setState({
                      phone_number: text,
                    });
                  }}
                />
                <Text style={styles.textInputDirector}>➤ Address</Text>
                <ScrollView>
                  <TextInput
                    placeholder="Address"
                    multiline
                    style={styles.textInputAddress}
                    onChangeText={(text) => {
                      this.setState({
                        address: text,
                      });
                    }}
                  />
                </ScrollView>

                <Text style={styles.textInputDirector}>➤ Pincode</Text>
                <TextInput
                  placeholder="Pincode"
                  style={styles.textInput}
                  keyboardType={'numeric'}
                  maxLength={6}
                  onChangeText={(text) => {
                    this.setState({
                      pincode: text,
                    });
                  }}
                />
                <Text style={styles.textInputDirector}>➤ Email Address</Text>
                <TextInput
                  placeholder="Email Address"
                  style={styles.textInput}
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    this.setState({
                      email_id: text,
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
                <Text style={styles.textInputDirector}>➤ Confirm Password</Text>
                <TextInput
                  placeholder="Confirm Password"
                  style={styles.textInput}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      confirm_password: text,
                    });
                  }}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.userSignUp(
                      this.state.email_id,
                      this.state.password,
                      this.state.confirm_password
                    );
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
  textInputAddress: {
    fontSize: RFValue(18),
    paddingLeft: RFValue(10),
    height: RFValue(150),
    marginTop: 0,
    width: RFValue(300),
    marginLeft: RFValue(30),
    borderWidth: RFValue(1),
    textAlignVertical: 'top',
  },
  textInputDirector: {
    fontSize: RFValue(25),
    color: '#5c0069',
    marginTop: RFValue(20),
  },
  screenHeader: {
    fontSize: RFValue(32),
    color: '#7e0da1',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: RFValue(50),
    fontFamily: 'KoHo',
  },
  screenHeader2: {
    fontSize: RFValue(32),
    color: '#7e0da1',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: RFValue(10),
    fontFamily: 'KoHo',
  },
  button: {
    backgroundColor: '#8c3ee6',
    height: RFValue(40),
    width: RFValue(270),
    borderRadius: RFValue(40),
    marginTop: RFValue(30),
    alignSelf: 'center',
    marginBottom: RFValue(30),

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
