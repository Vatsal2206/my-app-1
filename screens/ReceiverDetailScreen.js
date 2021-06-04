import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config.js';

export default class ReceiverDetailsScreen extends React.Component {
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
      donator_id: firebase.auth().currentUser.email,
      donatorName: '',
      donatorContact: '',
      receiverId: this.props.navigation.getParam('details')['user_id'],
      category: this.props.navigation.getParam('details')['category'],
      description: this.props.navigation.getParam('details')['description'],
      imageURL: this.props.navigation.getParam('details')['imageURL'],
      time_of_request: this.props.navigation.getParam('details')[
        'time_of_request'
      ],
      request_id: this.props.navigation.getParam('details')['request_id'],
      receiverName: '',
      receiverContact: '',
      receiverAddress: '',
      receiverPincode: '',
      receiverRequestDocId: '',
    };
  }
  getReceiverDetails() {
    db.collection('users')
      .where('email_id', '==', this.state.receiverId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverName: doc.data().first_name + '' + doc.data().last_name,
            receiverContact: doc.data().phone_number,
            receiverAddress: doc.data().address,
            receiverPincode: doc.data().pincode,
          });
        });
      });

    db.collection('requests')
      .where('request_id', '==', this.state.request_id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            receiverRequestDocId: doc.id,
          });
        });
      });
  }
  getUserDetails = async (userId) => {
    db.collection('users')
      .where('email_id', '==', userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            donatorName: doc.data().first_name + ' ' + doc.data().last_name,
            donatorContact: doc.data().phone_number,
          });
        });
      });
  };
  updateRequestStatus = () => {
    db.collection('all_requests').add({
      request: this.state.category,
      request_id: this.state.request_id,
      requested_by: this.state.receiverName,
      donor_id: this.state.userId,
      donor_name: this.state.donatorName,
      request_status: 'Donor Interested',
    });
  };
  addNotification = () => {
    var message =
      this.state.donatorName + ' has shown interest in your request';
    db.collection('all_notifications').add({
      receiver_id: this.state.receiverId,
      donor_id: this.state.donator_id,
      donor_contact: this.state.donor_contact,
      request_id: this.state.request_id,
      request: this.state.category,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: 'unread',
      message: message,
    });
  };

  componentDidMount() {
    this.getReceiverDetails();
    this.getUserDetails(this.state.userId);
    console.log(this.state.receiverId);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'REQUEST SUMMARY',
              style: {
                color: '#ffffff',
                fontSize: RFValue(20),
                fontWeight: 'bold',
              },
            }}
            backgroundColor="#32867d"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.3,
              flexDirection: 'row',
              paddingTop: RFValue(30),
              paddingLeft: RFValue(10),
            }}>
            <View
              style={{
                flex: 0.6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: RFValue(25),
                  textAlign: 'center',
                }}>
                {this.state.category}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: RFValue(15),
                  textAlign: 'center',
                  marginTop: RFValue(15),
                }}>
                {this.state.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.7,
              padding: RFValue(20),
            }}>
            <View
              style={{
                flex: 0.7,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: RFValue(50),
                borderWidth: 1,
                borderColor: '#deeedd',
                padding: RFValue(10),
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: RFValue(30),
                }}>
                Reciever Information
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                }}>
                Name : {this.state.receiverName}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                }}>
                Contact: {this.state.receiverContact}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: RFValue(20),
                  marginTop: RFValue(30),
                }}>
                Address: {this.state.receiverAddress}
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.state.receiverId !== this.state.donator_id ? (
                <TouchableOpacity
                  onPress={() => {
                    this.updateRequestStatus();
                    this.addNotification();
                    this.props.navigation.navigate('BottomTab');
                  }}>
                  <Text>I want to Donate</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
