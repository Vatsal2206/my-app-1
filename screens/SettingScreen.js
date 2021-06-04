import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import * as Font from 'expo-font';
import { Card } from 'react-native-elements';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import db from '../config';

import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      email_id: '',
      first_name: '',
      last_name: '',
      address: '',
      phone_number: '',
      docId: '',
      pincode: '',
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

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      .where('email_id', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            email_id: data.email_id,
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address,
            phone_number: data.phone_number,
            docId: doc.id,
            pincode: data.pincode,
          });
        });
      });
  };

  updateUserDetails = () => {
    if (
      this.state.first_name === '' ||
      this.state.address === '' ||
      this.state.address === '' ||
      this.state.phone_number === '' ||
      this.state.pincode === ''
    ) {
      this.showToast('Please fill in all empty fields');
    } else {
      db.collection('users').doc(this.state.docId).update({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        address: this.state.address,
        phone_number: this.state.phone_number,
        pincode: this.state.pincode,
      });

      this.showToast('Profile Updated Successfully');
    }
  };

  componentDidMount() {
    this.getUserDetails();
    this.useFont();
  }

  render() {
    if (this.state.fontVisible === true) {
      return (
        <ImageBackground
          source={require('../assets/image.png')}
          style={{ height: '100%', width: '100%' }}>
          <ScrollView style={{ height: '100%' }}>
            <KeyboardAvoidingView>
              <View>
                <View
                  style={{
                    marginBottom: RFValue(20),
                    marginTop: RFValue(30),
                    marginLeft: RFValue(7),
                  }}>
                  <Icon
                    name="bars"
                    size={50}
                    onPress={() => this.props.navigation.openDrawer()}
                  />
                </View>
                <Text style={styles.screenHeader}>SETTINGS</Text>
                <Text style={styles.textInputDirector}>➤ First Name </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'First Name'}
                  maxLength={15}
                  onChangeText={(text) => {
                    this.setState({
                      first_name: text,
                    });
                  }}
                  value={this.state.first_name}
                />

                <Text style={styles.textInputDirector}>➤ Last Name </Text>
                <TextInput
                  style={styles.textInput}
                  maxLength={15}
                  placeholder={'Last Name'}
                  onChangeText={(text) => {
                    this.setState({
                      last_name: text,
                    });
                  }}
                  value={this.state.last_name}
                />

                <Text style={styles.textInputDirector}>➤ Contact </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Contact'}
                  maxLength={10}
                  keyboardType={'numeric'}
                  onChangeText={(text) => {
                    this.setState({
                      phone_number: text,
                    });
                  }}
                  value={this.state.phone_number}
                />

                <Text style={styles.textInputDirector}>➤ Address </Text>
                <TextInput
                  style={styles.textInputAddress}
                  placeholder={'Address'}
                  multiline={true}
                  onChangeText={(text) => {
                    this.setState({
                      address: text,
                    });
                  }}
                  value={this.state.address}
                />
                <Text style={styles.textInputDirector}>➤ Pincode </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Pincode'}
                  maxLength={6}
                  onChangeText={(text) => {
                    this.setState({
                      pincode: text,
                    });
                  }}
                  value={this.state.pincode}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateUserDetails();
                  }}>
                  <Text style={styles.buttonText}>Save</Text>
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
  button: {
    backgroundColor: '#8c3ee6',
    height: RFValue(40),
    width: RFValue(270),
    borderRadius: RFValue(40),
    marginTop: RFValue(40),
    alignSelf: 'center',
    marginBottom: RFValue(50),
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
  screenHeader: {
    fontSize: RFValue(35),
    color: '#ad1bd1',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: RFValue(0),
    fontFamily: 'KoHo',
  },
});
