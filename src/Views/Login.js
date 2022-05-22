import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  Button,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {StackActions} from '@react-navigation/native';

import {
  api_url,
  login,
  height_40,
  height_30,
  logo_with_name,
  app_name,
  safety_icon,
  order_icon,
  trust_icon,
  font_description,
  font_title,
  api_url1,
} from '../config/Constant';
import logo12 from '../assets/icons/Panaux-Logo1.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {Loader} from '../components/GeneralComponents';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import * as colors from '../assets/css/Colors';

import person from '../assets/icons/person.png';
import pass from '../assets/icons/pass.png';
class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',
      validation: true,
      fcm_token: global.fcm_token,
      isLoding: false,
    };
  }

  /*_renderItem = ({ item }) => {
    return (
       <View
        style={{
          flex: 1,
          backgroundColor: colors.theme_bg,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  _onDone = async() => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    await this.setState({ showRealApp: true });
    try {
      await AsyncStorage.setItem('show_real_app', '1');
    } catch (e) {

    }
  }

  _onSkip = async() => {
    await this.setState({ showRealApp: true });
    try {
      await AsyncStorage.setItem('show_real_app', '1');
    } catch (e) {

    }
  };*/

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  setToken =  token => {
 
    
      AsyncStorage.setItem('fcmToken', token);
      global.fcm_token = token;

  };

  login = async () => {
    this.setState({isLoding: true});
    Keyboard.dismiss();

    await axios({
      method: 'post',
      url: `${api_url1}/clients/signin`,
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    })
      .then(async response => {
        this.setState({isLoding: false});

        // console.log(`token ${response.data.token}`);
        if (response.data.status == 'ok') {
          //   await this.props.serviceActionSuccess(response.data);
        this.setToken(response.data.token);
          this.home();
        } else {
          this.setState({isLoding: false});
          alert(response.data.message);
        }
        //  throw "Something went wrong";
      })
      .catch(error => {
        this.setState({isLoding: false});
        alert(error);
        // this.props.serviceActionError(error);
      });
  };

  checkValidate = () => {
    if (this.state.email == '' || this.state.password == '') {
      // this.state.validation = false;
      this.showSnackbar('Please fill all the fields.');
      // return true;
    } else {
      this.login();
      // this.state.validation = true;
      // return true;
    }
  };

  saveData = async () => {
    if (this.props.status == 1) {
      try {
        await AsyncStorage.setItem('user_id', this.props.data.id.toString());
        await AsyncStorage.setItem(
          'customer_name',
          this.props.data.customer_name.toString(),
        );
        await AsyncStorage.setItem(
          'phone_number',
          this.props.data.phone_number.toString(),
        );
        await AsyncStorage.setItem('email', this.props.data.email.toString());
        global.id = await this.props.data.id;
        global.customer_name = await this.props.data.customer_name;
        global.phone_number = await this.props.data.phone_number;
        global.email = await this.props.data.email;
        await this.home();
      } catch (e) {}
    } else {
      alert(this.props.message);
    }
  };

  register = () => {
    this.props.navigation.navigate('Register');
  };

  forgot = () => {
    this.props.navigation.navigate('Forgot');
  };

  home = () => {
    this.props.navigation.dispatch(
      // StackActions.popToTop()
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Main'}],
      }),
    );
  };

  showSnackbar(msg) {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    const {isLoding, error, data, message, status} = this.props;

    return (
      <View style={styles.log_style1}>
        <View>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={colors.theme_bg}
            translucent={false}
            networkActivityIndicatorVisible={true}
          />
        </View>
        {/* <Loader visible={true} /> */}
        <Loader visible={this.state.isLoding} />
        <View>
          <View style={styles.log_style2}>
            <View style={styles.log_style3} />
            <Text style={styles.log_style4}>Login</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.log_style5}>
            <View style={styles.log_style6} />
            <View style={styles.log_style7}>
              <Image style={styles.log_style8} source={logo12} />
            </View>

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
                keyboardType="email-address"
                placeholderTextColor="grey"
                onChangeText={TextInputValue =>
                  this.setState({email: TextInputValue})
                }
                // value={text}
              />
            </View>
            <View style={styles.log_style14}>
              <Icon
                name="key"
                size={20}
                color="black"
                style={styles.log_style17}
              />
              <TextInput
                style={styles.log_style15}
                placeholder="Password"
                placeholderTextColor="grey"
                secureTextEntry={true}
                onChangeText={TextInputValue =>
                  this.setState({password: TextInputValue})
                }
                // value={text}
              />
            </View>
            {/* <Text>
                {this.state.email}
            </Text> */}
            <View style={styles.log_style18} />

            <View style={styles.log_style19}>
              <Button
                onPress={this.checkValidate}
                title="LOGIN NOW"
                color={colors.theme_bg}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <View style={styles.log_style22} />
            <View style={styles.log_style23}>
              <Text style={styles.log_style24} onPress={this.forgot}>
                Forgot Password?
              </Text>
            </View>
            <View style={styles.log_style25}>
              <Text style={styles.log_style26} onPress={this.register}>
                Sign up for a new account ?
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.login.isLoding,
    error: state.login.error,
    data: state.login.data,
    message: state.login.message,
    status: state.login.status,
  };
}

const mapDispatchToProps = dispatch => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: error => dispatch(serviceActionError(error)),
  serviceActionSuccess: data => dispatch(serviceActionSuccess(data)),
});

export default Login;
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
    borderBottomWidth: 0.5,

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
    marginTop: '10%',
    height: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
