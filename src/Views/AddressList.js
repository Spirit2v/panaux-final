import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
} from 'react-native';
// import { Container, Left, Icon, Footer, Col, Right } from "native-base";
// import { Button } from "react-native-elements";
import axios from 'axios';

import back from '../assets/icons/back1.png';
import {Loader} from '../components/GeneralComponents';

import {selectAddress} from '../actions/CartActions';
import {
  api_url1,
  address_list,
  address_delete,
  img_url,
  last_active_address,
  font_title,
  font_description,
  no_address_lottie,
} from '../config/Constant';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import * as colors from '../assets/css/Colors';
// import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import LottieView from 'lottie-react-native';
class AddressList extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      dialogVisible: false,
      deleting_address: 0,
      from: this.props.route.params.from,
      isLoding: false,
      api_status: 0,
      result: [],
      order2: [],
      load: false,
    };
    this.getProfile();
  }

  componentDidMount() {
    this.getProfile();
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        // alert("You can use the location");
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  getProfile = async () => {
    await axios
      .get(`${api_url1}/clients/profile/get`, {
        headers: {Authorization: `Bearer ${global.fcm_token}`},
      })
      .then(res => {
        this.setState({order2: res.data.data.addressess, load: true});
      })
      .catch(res => {
        console.log(res);
      });
  };

  address_delete = async id => {
    await axios
      .delete(`${api_url1}/clients/address/${id}`, {
        headers: {Authorization: `Bearer ${global.fcm_token}`},
      })
      .then(async response => {
        // console.log(response);
        alert('address deleted');
        this.getProfile();
      });
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  add_address = () => {
    this.props.navigation.navigate('AddressMap');
  };

  render() {
    const {isLoding, data} = this.props;

    const address_list = this.state.order2.map((row, key) => {
      return (
        <View style={styles.add_list_style1}>
          <View style={styles.add_list_style2}>
            <View>
              <Text style={styles.add_list_style3}>Address #{key + 1}</Text>
            </View>
          </View>
          <View style={styles.add_list_style6}>
            <View>
              <Text style={styles.add_list_style7}>{row.addressLine1}</Text>
              <Text style={styles.add_list_style7}>
                {row.city},{row.state},{row.country}
              </Text>
              <Text style={styles.add_list_style7}>{row.pincode}</Text>
            </View>
          </View>
          <View style={styles.add_list_style8}>
            <View style={styles.add_list_style9}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.address_delete(row._id);
                  }}>
                  <Text style={styles.add_list_style10}>Delete</Text>
                </TouchableOpacity>
              </View>

              <View />
            </View>
            <View style={styles.add_list_style23}></View>
            {/* {this.state.from == 'home' && (
              <View style={styles.add_list_style11}>
                <Text
                  onPress={this.select_address.bind(this, row.id)}
                  style={styles.add_list_style12}>
                  SELECT
                </Text>
             
              </View>
            )} */}
          </View>
      
        </View>
      );
    });

    return (
      <View style={styles.add_list_style13}>
        <View>
          <View style={styles.add_list_style14}>
            <TouchableOpacity
              style={styles.add_list_style15}
              onPress={this.handleBackButtonClick}
              activeOpacity={1}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'white',
                  marginVertical: 12,
                }}
                source={back}
              />
            </TouchableOpacity>
            <View style={styles.add_list_style17} />
            <Text style={styles.add_list_style18}>Address List</Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.add_list_style19}>
            {address_list}

            {this.state.order2[0] &&
            <Button
            title="ADD NEW ADDRESS"
            onPress={this.add_address}
            color={'#0c0a8d'}
          />}
            {!this.state.order2[0] && this.state.load && (
              <View style={{flex: 1}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 72,
                  }}>
                  <LottieView
                    style={{
                      height: 220,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    source={no_address_lottie}
                    autoPlay
                    loop
                  />
                </View>
                <Text style={styles.add_list_style21}>
                  How can we find you?
                </Text>
                <View style={{marginVertical: 63}}>
                  <Button
                    title="ADD NEW ADDRESS"
                    onPress={this.add_address}
                    style={{marginTop: 43}}
                    color={'#0c0a8d'}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.add_list_style22}>
          <View style={styles.add_list_style23}></View>
        </View>
        {/* <Loader visible={isLoding} />
        <Loader visible={this.state.isLoding} /> */}
        <ConfirmDialog
          title="Confirm Dialog"
          message="Are you sure about that?"
          animationType="fade"
          visible={this.state.dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          positiveButton={{
            title: 'YES',
            onPress: this.address_delete,
            titleStyle: {
              color: colors.theme_fg,
              fontFamily: font_description,
            },
          }}
          negativeButton={{
            title: 'NO',
            onPress: () => this.setState({dialogVisible: false}),
            titleStyle: {
              color: colors.theme_fg,
              fontFamily: font_description,
            },
          }}
        />
      </View>
    );
  }
}

export default AddressList;

const styles = StyleSheet.create({
  add_list_style1: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.theme_bg_three,
    marginBottom: 10,
  },
  add_list_style2: {flexDirection: 'row'},
  add_list_style3: {
    fontSize: 15,
    fontFamily: font_title,
    color: colors.theme_fg_two,
  },
  add_list_style4: {
    height: 20,
    width: '100%',
    marginTop: 10,
  },
  add_list_style5: {flex: 1, width: undefined, height: undefined},
  add_list_style6: {flexDirection: 'row'},
  add_list_style7: {
    fontSize: 15,
    marginTop: 5,
    fontFamily: font_description,
    color: 'grey',
  },
  add_list_style8: {
    flexDirection: 'row',
    marginTop: 10,
  },
  add_list_style9: {width: '25%'},
  add_list_style10: {
    fontSize: 14,
    fontFamily: font_title,
    color: colors.theme_fg,
    fontFamily: font_title,
  },
  add_list_style11: {width: '25%'},
  add_list_style12: {
    fontSize: 14,
    fontFamily: font_title,
    color: colors.theme_fg,
    fontFamily: font_title,
  },
  add_list_style13: {backgroundColor: colors.theme_bg_two},
  add_list_style14: {alignItems: 'flex-start', margin: 20},
  add_list_style15: {width: 100, justifyContent: 'center'},
  add_list_style16: {color: colors.theme_fg_two, fontSize: 30},
  add_list_style17: {margin: 5},
  add_list_style18: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  add_list_style19: {
    alignItems: 'center',
  },
  add_list_style20: {height: 250, marginTop: '30%'},
  add_list_style21: {
    alignSelf: 'center',
    fontFamily: font_title,
    color: 'grey',
  },
  add_list_style22: {
    backgroundColor: colors.theme_bg_three,
  },
  add_list_style23: {
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  add_list_style24: {
    backgroundColor: colors.theme_bg,
    fontFamily: font_title,
  },
  add_list_style25: {
    color: colors.theme_bg_three,
    fontFamily: font_description,
  },
});
