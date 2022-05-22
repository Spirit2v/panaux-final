import React, {Component} from 'react';
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

import {Picker} from '@react-native-picker/picker';
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
import {Loader} from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import logo12 from '../assets/icons/Panaux-Logo1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from 'react-native-elements';
import call from '../assets/icons/call.png';
import person from '../assets/icons/person.png';
import pass from '../assets/icons/pass.png';
import email from '../assets/icons/email.png';
import back from '../assets/icons/back1.png';
class Register extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',

      fcm_token: global.fcm_token,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Login');
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

  register = async () => {
    Keyboard.dismiss();

    await axios({
      method: 'post',
      url: `${api_url1}/clients/verify_email_register`,

      data: {
        email: this.state.email,
      },
    })
      .then(async response => {
        this.props.navigation.navigate('Register1', this.state.email);
      })
      .catch(error => {
        console.log(error);
      });
  };

  loginM = () => {
    this.props.navigation.navigate('Login');
  };

  checkValidate = () => {
    if (this.state.email == '') {
      this.showSnackbar('Please enter email');
    } else {
      this.register();
    }
  };

  showSnackbar(msg) {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    return (
      <View style={styles.log_style1}>
        <View>
          <StatusBar />
        </View>
        {/* <Loader visible={isLoding} /> */}
        <Loader visible={this.state.isLoding} />
        <View>
          <View style={styles.log_style2}>
            <View style={styles.log_style3} />
            <Text style={styles.log_style4}>Register</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.log_style5}>
            <View style={styles.log_style6} />
            <View style={styles.log_style7}>
              <Image style={styles.log_style8} source={logo12} />
            </View>
            {/* <View style={styles.log_style9} /> */}
            <Text style={{color: 'black', marginTop: 32, marginBottom: 12}}>
              Please Enter your Email Address
            </Text>
            <View style={styles.log_style14}>
              <Icon
                name="person"
                size={20}
                color="black"
                style={styles.log_style17}
              />

              <TextInput
                style={styles.log_style15}
                placeholder="Email"
                placeholderTextColor="grey"
                keyboardType="email-address"
                onChangeText={TextInputValue =>
                  this.setState({email: TextInputValue})
                }
                // value={text}
              />
            </View>

            <View style={styles.log_style18} />

            <View style={styles.log_style19}>
              <Button
                onPress={this.checkValidate}
                title="GET OTP"
                color={colors.theme_bg}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <View style={styles.log_style22} />
            <View style={styles.log_style23}></View>
            <View style={styles.log_style25}>
              <Text>Already have an account ?</Text>
              <Text style={styles.log_style26} onPress={this.loginM}>
                {'  '}LOGIN HERE
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  log_style1: {flex: 1, flexDirection: 'column'},
  log_style2: {alignItems: 'flex-start', margin: 10},
  log_style3: {margin: 5},
  log_style4: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
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
    borderBottomWidth: 0.4,

    marginVertical: 12,
  },
  log_style15: {
    fontSize: 14,
    fontFamily: font_description,

    width: '80%',
    margin: 8,
    marginLeft: 12,
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
  log_style23: {width: '95%', alignItems: 'flex-end', height: 23},
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
    fontSize: 13,
    color: colors.theme_bg,
    marginBottom: '4%',
    fontFamily: font_description,
    // fontWeight:'bold'
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
    borderBottomWidth: 1.5,
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
