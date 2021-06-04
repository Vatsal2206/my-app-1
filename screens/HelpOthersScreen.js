import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import db from '../config';
export default class HelpOthersScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      fontVisible: false,
      requestList: [],
    };
    this.requestRef = null;
  }
  getRequests = async () => {
    this.requestRef = db.collection('requests').onSnapshot((snapshot) => {
      var requestedList = snapshot.docs.map((doc) => doc.data());
      this.setState({
        requestList: requestedList,
      });
    });
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
    this.getRequests();
    console.log(this.state.requestList);
  }
  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => {
    console.log(item.category);
    return (
      <ListItem
        bottomDivider
        style={{
          borderWidth: RFValue(2),
          borderRadius: RFValue(5),
          borderColor: '#a44ee6',
          marginTop: RFValue(10),
        }}>
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold' }}>
            {item.category}
          </ListItem.Title>
          <ListItem.Subtitle>{item.user_id}</ListItem.Subtitle>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('ReceiverDetails', {
                details: item,
              });
            }}>
            <Text style={styles.buttonText}>VIEW</Text>
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    if (this.state.fontVisible === true) {
      return (
        <ScrollView>
          <ImageBackground
            source={require('../assets/image.png')}
            style={{ height: '100%', width: '100%' }}>
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
              <Text style={styles.screenHeader}>HELP OTHERS</Text>

              <View>
                {this.state.requestList.length === 0 ? (
                  <View
                    style={{
                      fontSize: RFValue(20),
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(20),
                        marginTop: RFValue(80),
                        alignSelf: 'center',
                      }}>
                      There are no active requests!
                    </Text>
                    <Text
                      style={{
                        fontSize: RFValue(15),
                        marginTop: RFValue(15),
                        alignSelf: 'center',
                      }}>
                      It might be loading... Please wait
                    </Text>
                  </View>
                ) : (
                  <View style={{ marginTop: RFValue(70) }}>
                    <FlatList
                      keyExtractor={this.keyExtractor}
                      data={this.state.requestList}
                      renderItem={this.renderItem}
                    />
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
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
  button: {
    backgroundColor: '#8c3ee6',
    height: RFValue(30),
    width: RFValue(100),
    borderRadius: RFValue(5),
    marginTop: RFValue(-18),
    marginLeft: RFValue(220),
  },
  buttonText: {
    fontSize: RFValue(13),
    color: '#ffc7f1',
    textAlign: 'center',
    padding: RFValue(5),
  },
});
