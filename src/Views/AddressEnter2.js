import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  BackHandler,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  Button,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {Picker} from '@react-native-picker/picker';
import {Loader} from '../components/GeneralComponents';

import Icon from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import {
  api_url,
  register,
  height_20,
  logo_with_name,
  app_name,
  register_image,
  font_title,
  font_description,
  get_blood_list,
  api_url1,
} from '../config/Constant';

import * as colors from '../assets/css/Colors';
import axios from 'axios';
import logo12 from '../assets/img/logo_with_name.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import call from '../assets/icons/call.png';
import person from '../assets/icons/person.png';
import pass from '../assets/icons/pass.png';
import email from '../assets/icons/email.png';
import back from '../assets/icons/back1.png';
import DATA from './DATA.json'
class AddressEnter2 extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      address: '',

      validation: true,
      blood_group_list: [],
      fcm_token: global.fcm_token,
      country: '',
      mode: '',
      latitude: 0,
      longitude: 0,
      coords: 0,
      pincode: '',
      city: '',
      State: '',
      isLoding: false,
      selectedCallingCode: 90,
      selectedState: '',
      selectedCity: '',
      selectedCountry: '',
      address1:''
      ,
      address2:''
    };
    // console.log(DATA[0].name)

    this.handleUserNavigation();
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('AddressList');
    return true;
  }

  login = () => {
    this.props.navigation.navigate('Login');
  };

  home = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  handleUserNavigation = async () => {
    try {
      await Geolocation.getCurrentPosition(info => {
        this.setState({
          latitude: info?.coords.latitude,
          longitude: info?.coords.longitude,
          coords: info?.coords,
        });

        console.log(info);
      });
    } catch (error) {
      alert(error);
    }
  };
  onValueChange(value: string) {
    this.setState({
      mode: value,
    });
  }
  onValueChange1(value: string) {
    this.setState({
      selectedState: value,
    });
  }
  onValueChange2(value: string) {
    this.setState({
      selectedCity: value,
    });
  }
  register = async () => {
    this.handleUserNavigation();
    Keyboard.dismiss();
    this.setState({isLoding: true});
    await axios
      .post(
        `${api_url1}/clients/address`,

        {
          addressLine1: this.state.address1+this.state.address2,
          pincode: this.state.pincode,
          city: this.state.selectedCity,
          state: this.state.selectedState,
          country: this.state.mode,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(async response => {
        console.log(response);

        alert('Address Added');
        this.setState({isLoding: false});
        this.props.navigation.navigate('More');
      })
      .catch(error => {
        console.log(error);
        this.setState({isLoding: false});
      });
  };

  checkValidate = () => {
    if (
      this.state.address1 == '' ||
      this.state.pincode == '' ||
      this.state.selectedCity == '' ||
      this.state.mode == '' ||
      this.state.selectedState == ''
    ) {
      alert('Please fill all the fields.');
    } else {
      this.register();
    }
  };

  select_blood_group = value => {
    this.setState({blood_group: value});
  };

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {


    const availableState = DATA.find(c => c.name === this.state.mode);
    const availableCities = availableState?.states?.find(
      s => s.name === this.state.selectedState,
    );
    // console.log(availableCities);

    return (
      <View style={styles.log_style1}>
        <View>
          <StatusBar />
        </View>

        <Loader visible={this.state.isLoding} />
        <View>
          <TouchableOpacity
            style={{height: 12, margin: 12}}
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
          <View style={styles.log_style2}>
            <View style={styles.log_style3} />
            <Text style={styles.log_style4}>Enter your address</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.log_style5}>
            <View style={styles.log_style6} />
            <Text></Text>
            <View style={{marginVertical: -32}}></View>
            <View style={styles.log_style14}>
              <Icon
                name="pin"
                size={24}
                color="black"
                style={styles.log_style17}
              />

              <TextInput
                style={styles.log_style15}
                placeholder="Addres line 1"
                placeholderTextColor="grey"
                keyboardType="email-address"
                onChangeText={TextInputValue =>
                  this.setState({address1:TextInputValue + " "})
                }
                // value={text}
              />
            </View>
    
            <View style={styles.log_style14}>
      

              <TextInput
                style={styles.log_style15}
                placeholder="Address line 2"
                placeholderTextColor="grey"
                keyboardType="email-address"
                onChangeText={TextInputValue =>
                  this.setState({address2: TextInputValue})
                }
                // value={text}
              />
            </View>
{/* <Text>
  {this.state.address}
  this.state.address == '' ||
      this.state.pincode == '' ||
      this.state.city == '' ||
      this.state.country == '' ||
      this.state.State == ''
</Text> */}

            <View style={styles.log_style14}>
              <Icon
                name="locate"
                size={24}
                color="black"
                style={styles.log_style17}
              />

              <TextInput
                style={styles.log_style15}
                placeholder="Pincode"
                placeholderTextColor="grey"
                keyboardType="email-address"
                onChangeText={TextInputValue =>
                  this.setState({pincode: TextInputValue})
                }
              />
            </View>
            <View style={styles.log_style144}>
              <Icon
                name="flag"
                size={24}
                color="black"
                style={styles.log_style17}
              />

              <Picker
                note
                mode="dropdown"
                style={{ marginTop: 0, color: 'black',height:33,width: 260,}}
                selectedValue={this.state.mode}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item
                  color="black"
                  label="Choose Country"
                  value=""
                  labelColor="black"
                />

                {DATA.map((item, key) => (
                  <Picker.Item label={item.name} value={item.name} key={key} />
                ))}
              </Picker>
            </View>

            {this.state.mode[0] && (
              <View style={styles.log_style144}>
                <Icon
                  name="compass"
                  size={24}
                  color="black"
                  style={styles.log_style17}
                />

                <Picker
                  note
                  mode="dropdown"
                  style={{
                    height:33,width: 260,
                    marginTop: 0,
                    color: 'black',
                    borderColor: 'grey',
                    borderWidth: 1,
                  }}
                  selectedValue={this.state.selectedState}
                  onValueChange={this.onValueChange1.bind(this)}>
                  <Picker.Item
                    color="black"
                    label="Choose State"
                    value=""
                    labelColor="black"
                  />

                  {availableState?.states.map((item, key) => (
                    <Picker.Item
                      label={item.name}
                      value={item.name}
                      key={key}
                    />
                  ))}
                </Picker>
              </View>
            )}
            {this.state.selectedState[0] && (
              <View style={styles.log_style144}>
                <Icon
                  name="location"
                  size={24}
                  color="black"
                  style={styles.log_style17}
                />

                <Picker
                  note
                  mode="dropdown"
                  style={{height:33,width: 260, marginTop: 0, color: 'black'}}
                  selectedValue={this.state.selectedCity}
                  onValueChange={this.onValueChange2.bind(this)}>
                  <Picker.Item
                    color="black"
                    label="Choose City"
                    value=""
                    labelColor="black"
                  />

                  {availableCities?.cities.map((item, key) => (
                    <Picker.Item label={item.name} value={item.name} key={key} />
                  ))}
                </Picker>
              </View>
            )}

            <View style={styles.log_style18} />

            <View style={styles.log_style19}>
              <Button
                onPress={this.checkValidate}
                title="SUBMIT"
                color={colors.theme_bg}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <View style={styles.log_style22} />
            <View style={styles.log_style23}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AddressEnter2;

const styles = StyleSheet.create({
  log_style1: {flex: 1, flexDirection: 'column'},
  log_style2: {alignItems: 'flex-start', margin: 10},
  log_style3: {margin: 5},
  log_style4: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
    marginLeft: 12,
  },
  log_style5: {height: '90%', justifyContent: 'center', alignItems: 'center'},
  log_style6: {marginTop: '20%'},
  log_style7: {height: 120, width: 120},
  log_style8: {flex: 1, width: undefined, height: undefined},
  log_style9: {marginTop: '10%'},
  log_style10: {width: '80%', alignSelf: 'center', flexDirection: 'row'},
  log_style11: {fontSize: 14, fontFamily: font_description},
  log_style12: {fontFamily: font_title},
  log_style13: {color: colors.theme_bg},
  log_style14: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.3,

    marginVertical: 12,
  },
  log_style144: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 0.3,
    borderRadius:12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
    borderColor: 'white',
    borderWidth: 0.2,
    marginVertical: 12,
  },
  log_style15: {
    fontSize: 14,
    fontFamily: font_description,

    width: '80%',
    margin: 8,
    marginLeft: 12,
    color: 'black',
  },
  log_style16: {fontFamily: font_title},
  log_style17: {color: colors.theme_bg, marginTop: 20, marginLeft: 12},
  log_style18: {marginTop: '5%'},
  log_style19: {width: '80%', alignSelf: 'center'},
  log_style20: {
    backgroundColor: colors.theme_bg,
    borderRadius: 5,
    height: 40,
  },
  log_style21: {
    color: colors.theme_fg_three,
    fontFamily: font_title,
    letterSpacing: 0.5,
  },
  log_style22: {marginTop: '3%'},
  log_style23: {width: '95%', alignItems: 'flex-end'},
  log_style24: {
    fontSize: 15,
    color: colors.theme_fg_four,
    fontFamily: font_description,
  },
  log_style25: {
    height: '10%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  log_style26: {
    fontSize: 15,
    color: colors.theme_bg,
    marginBottom: '4%',
    fontFamily: font_description,
  },

  header: {
    justifyContent: 'flex-start',
    height: '10%',
    backgroundColor: colors.theme_bg,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    shadowOffset: {width: 0, height: 15},
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  header_card: {
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
  },
  header_card_item: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowOffset: {width: 0, height: 15},
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  text_field: {
    height: 40,
    borderBottomColor: colors.theme_bg,
    borderBottomWidth: 0.2,
    padding: 5,
  },
  forgot_password_container: {
    width: '80%',
    alignItems: 'flex-end',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    color: colors.theme_bg_three,
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: colors.theme_bg_three,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: font_title,
  },
});
