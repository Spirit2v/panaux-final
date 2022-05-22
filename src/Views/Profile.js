import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  StatusBar,
  Button,
} from 'react-native';
import {
  api_url,
  height_35,
  height_40,
  get_profile,
  profile_update,
  profile_picture,
  font_description,
  font_title,
  get_blood_list,
  api_url1,
} from '../config/Constant';
// import {
//   Card,
//   CardItem,
//   Left,
//   Body,
//   Right,
//   Col,
//   Row,
//   Title,
//   Icon,
//   Thumbnail,
//   Picker,
//   Button,
// } from "native-base";
import {Loader} from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from "react-native-fetch-blob";
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Input } from "react-native-elements";
import call from '../assets/icons/call.png';
import person from '../assets/icons/person.png';
import pass from '../assets/icons/pass.png';
import email from '../assets/icons/email.png';
import back from '../assets/icons/back1.png';
import RBSheet from 'react-native-raw-bottom-sheet';
const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
};

class Profile extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      profile_picture: '',
      customer_name: '',
      phone_number: '',
      email: '',
      password: '',
      validation: true,
      data: '',
      blood_group: '',
      blood_group_list: [],
      selected: 'B+',
      order2: [],
      ImageData: [],
      Imagess: '',
      passwordUpdate: true,
      loaderValue: false,
    };
    this.getProfile();
    this.getProfilePicture();

    // this.get_blood_list();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  async componentDidMount() {
    console.log(global.fcm_token);
    await this.getProfile();
    await this.getProfilePicture();
  }
  getProfile = async () => {
    this.setState({loaderValue: true});
    await axios
      .get(`${api_url1}/clients/profile/get`, {
        headers: {Authorization: `Bearer ${global.fcm_token}`},
      })
      .then(res => {
        console.log(res);
        this.setState({loaderValue: false});
        this.setState({order2: res.data.data});
        // alert(this.state.order2)
        this.setState({
          customer_name: res.data.data.username,
          phone_number: res.data.data.number,
          email: res.data.data.email,
          blood_group: res.data.data.blood_group,
        });
        global.name = res.data.data.username;
      })
      .catch(res => {
        console.log(res);
        this.setState({loaderValue: false});
      });
  };

  saveData = async () => {
    if (this.props.status == 1) {
      try {
        await AsyncStorage.setItem('user_id', this.state.order2);
        await AsyncStorage.setItem('username', this.state.order2.username);
        global.id = await this.props.data.id;
        global.username = await this.props.data.customer_name;
        await this.showSnackbar('Profile updated Successfully');
        await this.setState({password: ''});
      } catch (e) {}
    } else {
      alert(this.props.message);
    }
  };

  checkValidate = () => {
    if (
      this.state.email == '' ||
      this.state.phone_number == '' ||
      this.state.blood_group == '' ||
      this.state.customer_name == ''
    ) {
      alert('Please fill all the field');
      // this.state.validation = false;
      // this.showSnackbar("Please fill all the fields.");
      // return true;
    } else {
      this.updateProfile();
    }
  };

  handlePickerCamera = async () => {
    this.RBSheet.close();
    this.setState({loaderValue: true});
    await ImagePicker.launchCamera({}, async response => {
      this.setState({loaderValue: true});
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({loaderValue: false});
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({loaderValue: false});
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({loaderValue: false});
      } else {
        // this.setState({loaderValue:false});
        this.setState({Image: response.uri});
        this.setState({
          ImageData:
            ('photo',
            {
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              uri: response.assets[0].uri,
            }),
        });

        let formData = new FormData();

        // const data = new FormData();

        // data.append('profilePicture', {
        //   name: response.assets[0].fileName,
        //   type: response.assets[0].type,
        //   uri: response.assets[0].uri,
        // });

        // console.log(`data ${data}`);
        // formData.append('vendor', this.state._id);
        formData.append('profilePicture', this.state.ImageData);
        // console.log(`this is required ${formData}`);
        // here we can call a API to upload image on server
        await axios
          .patch(`${api_url1}/clients/profile/get`, formData, {
            headers: {
              Authorization: `Bearer ${global.fcm_token}`,
              'content-type': 'multipart/form-data',
            },
          })
          .then(res => {
            this.setState({
              Imagess: res.data.data.profilePicture,
              loaderValue: false,
            });
            alert('success');
          })
          .catch(res => {
            alert(res);

            this.setState({loaderValue: false});
          });

        await this.getProfile();
        await this.getProfilePicture();
        // .then(this.props.navigation.navigate('MyOrders'))
      }
    });
  };
  getProfilePicture = async () => {
    this.setState({loaderValue: true});
    await axios
      .patch(
        `${api_url1}/clients/profile/get`,
        {},
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        this.setState({Imagess: res.data.data.profilePicture});
        console.log(res.data.data.profilePicture);
        this.setState({loaderValue: false});
      })
      .catch(res => {
        alert(res);
        this.setState({loaderValue: false});
      });
    // .then(alert('success'))
  };
  updateProfile = async () => {
    this.setState({loaderValue: true});
    await axios
      .patch(
        `${api_url1}/clients/profile/get`,
        {
          username: this.state.username,

          number: this.state.phone_number,

          blood_group: this.state.blood_group,
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res);
        this.setState({loaderValue: false});
      })
      .then(res => {
        alert('Profile updated');
        this.props.navigation.navigate('Profile');
      })
      .then()
      .then(Keyboard.dismiss())
      // .then(
      //  alert('step2')

      //   )
      .then(await this.getProfilePicture())
      .catch(error => {
        alert(error.message);
      });
    // .then(alert('success'))
  };
  updateProfile1 = async () => {
    // alert('password updated');
    await axios
      .patch(
        `${api_url1}/clients/profile/get`,
        {
          username: this.state.username,
          // fcm_token: this.state.fcm_token,
          number: this.state.phone_number,
          email: this.state.email,
          password: this.state.password,
          blood_group: this.state.blood_group,
          // this.state.blood_group,
          // fcm_token: this.state.fcm_token,
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res);
      })
      .then(alert('success'))
      // .then( await this.getProfile()

      // )
      .catch(error => {
        alert(error.message);
      });
    // .then(alert('success'))
  };
  handlePicker = async () => {
    let formData = new FormData();
    console.log('edit');
    this.RBSheet.close();
    await ImagePicker.launchImageLibrary({}, async response => {
      this.setState({loaderValue: true});
      console.log('Response = ', response);
      if (response.didCancel) {
        this.setState({loaderValue: false});
        console.log('User cancelled image picker');
      } else if (response.error) {
        this.setState({loaderValue: false});
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        this.setState({loaderValue: false});
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({Image: response.uri});
        this.setState({
          ImageData:
            ('photo',
            {
              name: response.assets[0].fileName,
              type: response.assets[0].type,
              uri: response.assets[0].uri,
            }),
        });
        // formData.append('vendor', this.state._id);
        formData.append('profilePicture', this.state.ImageData);
        // here we can call a API to upload image on server
        await axios
          .patch(`${api_url1}/clients/profile/get`, formData, {
            headers: {Authorization: `Bearer ${global.fcm_token}`},
          })
          .then(res => {
            this.setState({
              Imagess: res.data.data.profilePicture,
              loaderValue: false,
            });
            alert('success');
          })
          .catch(res => {
            alert(res.data);
            this.setState({loaderValue: false});
          });

        this.getProfile();
        await this.getProfile();
        await this.getProfilePicture();
        // .then(this.props.navigation.navigate('MyOrders'))
      }
    });
  };

  onValueChange(value: string) {
    this.setState({
      blood_group: value,
    });
  }
  render() {
    const {isLoding, error, data, profile_picture, message, status} =
      this.props;

    return (
      <View style={styles.container}>
        <View>
          <StatusBar />
        </View>

        <Loader visible={this.state.loaderValue} />
        <View>
          <View style={styles.pro_style1}>
            <TouchableOpacity
              style={styles.pro_style2}
              onPress={this.handleBackButtonClick}
              activeOpacity={1}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'white',
                  marginVertical: 6,
                  marginLeft: 2,
                }}
                source={back}
                // source= {{uri:this.state.Imagess}}
              />
            </TouchableOpacity>
            <View style={styles.pro_style4} />
            <Text style={styles.pro_style5}>Profile</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.pro_style6}>
            <View style={styles.pro_style7} />
            <View style={styles.pro_style8}>
              <TouchableOpacity
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  overflow: 'hidden',
                }}
                onPress={() => this.RBSheet.open()}>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 150 / 2,
                    overflow: 'hidden',
                    borderWidth: 1,
                  }}
                  source={{uri: this.state.Imagess}}
                />
              </TouchableOpacity>
              <RBSheet
                ref={ref => {
                  this.RBSheet = ref;
                }}
                height={200}
                openDuration={250}
                customStyles={{
                  container: {
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                }}>
                {/* <YourOwnComponent /> */}
                <View style={{paddingHorizontal: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: colors.theme_fg,
                      fontFamily: font_title,
                      marginVertical: 10,
                    }}>
                    Upload your Image Via
                  </Text>

                  <TouchableOpacity />

                  <View style={{height: 10}} />
                  <TouchableOpacity onPress={this.handlePickerCamera}>
                    <View
                    // style={{
                    //   backgroundColor: '#0c0a8d',
                    //   height: 43,
                    //   width: '80%',
                    //   justifyContent: 'center',
                    //   alignContent: 'center',
                    //   alignItems: 'center',
                    //   borderRadius: 12,
                    // }}
                    >
                      <Text style={{color: 'grey'}}>
                        Please upload image less than1 mb
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{height: 10}} />
                  <TouchableOpacity onPress={this.handlePicker}>
                    <View
                      style={{
                        backgroundColor: '#0c0a8d',
                        height: 43,
                        width: '80%',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        borderRadius: 12,
                      }}>
                      <Text style={{color: 'white'}}>Upload Via Gallery</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </RBSheet>
            </View>
            <View style={styles.pro_style9} />
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
                width: '88%',
                marginBottom: 12,
              }}>
              <Text
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  color: 'grey',
                }}>
                Username
              </Text>
            </View>

            <View style={styles.style1}>
              <Icon
                name="person"
                size={20}
                color="black"
                style={styles.log_style17}
              />

              <TextInput
                style={styles.style2}
                placeholder={this.state.order2.username}
                placeholderTextColor="grey"
                keyboardType="email-address"
                onChangeText={TextInputValue =>
                  this.setState({username: TextInputValue})
                }
                // value={this.state.customer_name}
              />
            </View>
            <View style={styles.pro_style9} />
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
                width: '88%',
                marginBottom: 12,
                marginTop: -22,
              }}>
              <Text
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  color: 'grey',
                }}>
                Mobile
              </Text>
            </View>
            <View style={styles.style1}>
              <Icon
                name="call"
                size={20}
                color="black"
                style={styles.log_style17}
              />

              <TextInput
                style={styles.style2}
                placeholder={this.state.order2.number}
                placeholderTextColor="grey"
                keyboardType="email-address"
                onChangeText={TextInputValue =>
                  this.setState({phone_number: TextInputValue})
                }
              />
            </View>

            <View style={styles.pro_style9} />
            {/* 
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                textAlign: 'left',
                width: '88%',
                marginBottom: 12,
                marginTop: -22,
              }}>
              <Text
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  color: 'grey',
                }}>
                Email
              </Text>
            </View> */}
            {/* <View style={styles.style1}>
              <Icon
                name="mail"
                size={20}
                color="black"
                style={styles.log_style17}
              />

              <TextInput
                style={styles.style2}
                placeholder={this.state.order2.email}
                keyboardType="email-address"
                placeholderTextColor="grey"
                onChangeText={TextInputValue =>
                  this.setState({email: TextInputValue})
                }
                // value={this.state.email}
              />
            </View> */}
            <View style={styles.pro_style26}>
              <Text style={styles.pro_style27}>Blood Group</Text>
              <Picker
                note
                mode="dropdown"
                style={{width: 120, color: 'black'}}
                selectedValue={this.state.blood_group}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item color="black" label="A+" value="A+" />
                <Picker.Item color="black" label="A-" value="A-" />
                <Picker.Item color="black" label="B+" value="B+" />
                <Picker.Item label="B-" color="black" value="B-" />
                <Picker.Item label="O+" color="black" value="O+" />
                <Picker.Item label="O-" color="black" value="O-" />
                <Picker.Item label="AB-" color="black" value="AB-" />
                <Picker.Item label="AB+" color="black" value="AB+" />
              </Picker>
              {/* <Picker
                selectedValue={this.state.blood_group}
                style={styles.pro_style28}
                onValueChange={(itemValue, itemIndex) => this.select_blood_group(itemValue)}
              >
              {bl_list}
              </Picker> */}
            </View>
            <View style={styles.pro_style29} />
            <View style={styles.pro_style30}>
              <Button
                title=" UPDATE"
                style={styles.pro_style31}
                color={'#0c0a8d'}
                onPress={this.checkValidate}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  line: {width: '100%', borderColor: 'grey', borderBottomWidth: 0.3},
  style1: {
    flexDirection: 'row',
    // paddingHorizontal: 22,
    width: '80%',
    marginBottom: 22,
    borderColor: 'grey',
    borderBottomWidth: 0.3,
  },
  style2: {marginTop: -12, width: '60%', marginLeft: 11},
  pro_style1: {alignItems: 'flex-start', margin: 10},
  pro_style2: {width: 100, justifyContent: 'center'},
  pro_style3: {color: colors.theme_fg_two, fontSize: 30},
  pro_style4: {margin: 5, marginTop: -19},
  pro_style5: {fontSize: 25, color: colors.theme_fg_two, fontWeight: 'bold'},
  pro_style6: {height: '80%', justifyContent: 'center', alignItems: 'center'},
  pro_style7: {marginTop: '20%'},
  pro_style8: {
    alignSelf: 'center',
    // borderColor: colors.theme_bg,
    // borderWidth: 2,
    // borderRadius: 45,
  },
  pro_style9: {marginTop: '5%'},
  pro_style10: {width: '80%', alignSelf: 'center'},
  pro_style11: {fontSize: 14},
  pro_style12: {fontFamily: font_title},
  pro_style13: {color: colors.theme_bg},
  pro_style14: {width: '80%', alignSelf: 'center'},
  pro_style15: {fontSize: 14, fontFamily: font_description},
  pro_style16: {fontFamily: font_title},
  pro_style17: {color: colors.theme_bg},
  pro_style18: {width: '80%', alignSelf: 'center'},
  pro_style19: {fontSize: 14, fontFamily: font_description},
  pro_style20: {fontFamily: font_title},
  pro_style21: {color: colors.theme_bg},
  pro_style22: {width: '80%', alignSelf: 'center'},
  pro_style23: {fontSize: 14, fontFamily: font_description},
  pro_style24: {fontFamily: font_title},
  pro_style25: {color: colors.theme_bg},
  pro_style26: {width: '80%', alignSelf: 'center'},
  pro_style27: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: '3%',
    fontFamily: font_description,
  },
  pro_style28: {height: 50, width: '100%'},
  pro_style29: {marginTop: '5%'},
  pro_style30: {width: '80%', alignSelf: 'center'},
  pro_style31: {
    backgroundColor: colors.theme_bg,
    borderRadius: 5,
    height: 40,
    fontFamily: font_title,
  },
  pro_style32: {
    color: colors.theme_fg_three,
    fontFamily: font_title,
    letterSpacing: 0.5,
  },

  container: {flex: 1, flexDirection: 'column'},
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
  footer: {
    height: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
  },
  image_view: {
    height: 120,
    width: 120,
  },

  text_field: {
    height: 40,
    borderBottomColor: colors.theme_bg,
    borderBottomWidth: 1.5,
    padding: 5,
  },
  forgot_password_container: {
    width: '95%',
    alignItems: 'flex-end',
  },
  forgot_text: {
    fontSize: 15,
    color: colors.theme_fg_four,
  },

  forgot_password_container: {
    width: '80%',
    alignItems: 'flex-end',
  },
  forgot_text: {
    fontSize: 15,
    color: colors.theme_fg_four,
  },
  signin_text: {
    fontSize: 15,
    color: colors.theme_bg,
    marginTop: '8%',
  },
  back_icon: {
    color: colors.theme_bg_three,
    marginLeft: 15,
  },
  pro_style1: {alignItems: 'flex-start', margin: 10},
  pro_style2: {width: 100, justifyContent: 'center'},
  pro_style3: {color: colors.theme_fg_two, fontSize: 30},
  pro_style4: {margin: 5},
  pro_style5: {fontSize: 25, color: colors.theme_fg_two, fontWeight: 'bold'},
  pro_style6: {height: '80%', justifyContent: 'center', alignItems: 'center'},
  pro_style7: {marginTop: '20%'},
  pro_style8: {
    alignSelf: 'center',
    borderColor: colors.theme_bg,
    borderWidth: 2,
    borderRadius: 45,
  },
  pro_style9: {marginTop: '5%'},
  pro_style10: {width: '80%', alignSelf: 'center'},
  pro_style11: {fontSize: 14},
  pro_style12: {fontFamily: font_title},
  pro_style13: {color: colors.theme_bg},
  pro_style14: {width: '80%', alignSelf: 'center'},
  pro_style15: {fontSize: 14, fontFamily: font_description},
  pro_style16: {fontFamily: font_title},
  pro_style17: {color: colors.theme_bg},
  pro_style18: {width: '80%', alignSelf: 'center'},
  pro_style19: {fontSize: 14, fontFamily: font_description},
  pro_style20: {fontFamily: font_title},
  pro_style21: {color: colors.theme_bg},
  pro_style22: {width: '80%', alignSelf: 'center'},
  pro_style23: {fontSize: 14, fontFamily: font_description},
  pro_style24: {fontFamily: font_title},
  pro_style25: {color: colors.theme_bg},
  pro_style26: {width: '80%', alignSelf: 'center'},
  pro_style27: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: '3%',
    fontFamily: font_description,
  },
  pro_style28: {height: 50, width: '100%'},
  pro_style29: {marginTop: '5%'},
  pro_style30: {width: '80%', alignSelf: 'center'},
  pro_style31: {
    backgroundColor: colors.theme_bg,
    borderRadius: 5,
    height: 40,
    fontFamily: font_title,
  },
  pro_style32: {
    color: colors.theme_fg_three,
    fontFamily: font_title,
    letterSpacing: 0.5,
  },

  container: {flex: 1, flexDirection: 'column'},
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
  footer: {
    height: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
  },
  image_view: {
    height: 120,
    width: 120,
  },

  text_field: {
    height: 40,
    borderBottomColor: colors.theme_bg,
    borderBottomWidth: 1.5,
    padding: 5,
  },
  forgot_password_container: {
    width: '95%',
    alignItems: 'flex-end',
  },
  forgot_text: {
    fontSize: 15,
    color: colors.theme_fg_four,
  },

  forgot_password_container: {
    width: '80%',
    alignItems: 'flex-end',
  },
  forgot_text: {
    fontSize: 15,
    color: colors.theme_fg_four,
  },
  signin_text: {
    fontSize: 15,
    color: colors.theme_bg,
    marginTop: '8%',
  },
  back_icon: {
    color: colors.theme_bg_three,
    marginLeft: 15,
  },
});
