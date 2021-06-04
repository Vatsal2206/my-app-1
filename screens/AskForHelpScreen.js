import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import * as Font from 'expo-font';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import db from '../config';
import * as firebase from 'firebase';
import { Card } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
export default class AskForHelpScreen extends React.Component {
  constructor() {
    super();
    var today = new Date(),
      date =
        today.getDate() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getFullYear();

    this.state = {
      time_of_request: date,
      userId: firebase.auth().currentUser.email,
      request_id: '',
      category: '',
      description: '',
      imageURL: '',
      fontVisible: false,
    };
  }
  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = async () => {
    if (this.state.category === '' || this.state.description === '') {
      this.showToast('Please fill in all the mandatory fields and try again!');
    } else {
      var userId = this.state.userId;
      var randomRequestId = this.createUniqueId();
      var response = db.collection('requests').add({
        request_id: randomRequestId,
        category: this.state.category,
        description: this.state.description,
        imageURL: this.state.imageURL,
        user_id: userId,
        time_of_request: this.state.time_of_request,
      });
      if (response) {
        this.showToast('Request successfully added!');
      } else {
        this.showToast(
          'An error occured at adding your request, please try again!'
        );
      }
    }
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
  render() {
    if (this.state.fontVisible == true) {
      return (
        <ImageBackground
          source={require('../assets/image.png')}
          style={{ height: '100%', width: '100%' }}>
          <ScrollView>
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
                <View>
                  <Text style={styles.screenHeader}>REQUEST HELP</Text>

                  <Text style={styles.textInputDirector}>➤ Category</Text>
                  <TextInput
                    placeholder="Response"
                    style={styles.textInput}
                    onChangeText={(text) => {
                      this.setState({
                        category: text,
                      });
                    }}
                  />
                  <Text style={styles.textInputDirector}>➤ Description</Text>
                  <TextInput
                    placeholder="Response"
                    style={styles.textInputDescription}
                    onChangeText={(text) => {
                      this.setState({
                        description: text,
                      });
                    }}
                  />
                  <Text style={styles.textInputDirector}>
                    ➤ Photo URL(Optional)
                  </Text>
                  <TextInput
                    placeholder="link here"
                    style={styles.textInput}
                    onChangeText={(text) => {
                      this.setState({
                        imageURL: text,
                      });
                    }}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.addRequest();
                    }}>
                    <Text style={styles.buttonText}>Add Request</Text>
                  </TouchableOpacity>
                </View>
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
  screenHeader: {
    fontSize: RFValue(35),
    color: '#ad1bd1',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginTop: RFValue(0),
    fontFamily: 'KoHo',
  },
  textInput: {
    fontSize: RFValue(18),
    paddingLeft: RFValue(10),
    height: RFValue(50),
    marginTop: 0,
    width: RFValue(300),
    marginLeft: RFValue(30),
    borderWidth: RFValue(1),
  },
  textInputDescription: {
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
    marginTop: RFValue(50),
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
    marginBottom: RFValue(30),
  },
  buttonText: {
    fontSize: RFValue(25),
    color: '#ffc7f1',
    textAlign: 'center',
  },
});
