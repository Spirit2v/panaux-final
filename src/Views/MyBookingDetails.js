import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import {
//   Content,
//   Container,
//   Header,
//   Body,
//   Title,
//   Footer,
//   Left,
//   List,
//   ListItem,
//   Row,
//   Col,
//   Icon,
//   Right,
//   Tab,
//   Tabs,
//   Fab,
// } from "native-base";
// import { Button } from "react-native-elements";
// import CardView from "react-native-cardview";

import {
  doctorthree,
  doctor_one,
  font_title,
  font_description,
  api_url,
  status_change,
  accept_booking,
  img_url,
  get_new_status,
  booking_details,
  video_call,
} from '../config/Constant';
// import notifee from '@notifee/react-native';
import * as colors from '../assets/css/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { StatusBar, Loader } from "../components/GeneralComponents";

import back from '../assets/icons/back1.png';
import axios from 'axios';
import Moment from 'moment';
import video from '../assets/icons/video.png';

export default class MyBookingDetails extends Component<props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      isLoading: false,
      data: this.props.route.params.data,
    };

  }
//  channelId =  notifee.createChannel({
//     id: 'default',
//     name: 'Default Channel',
//   });

  // Display a notification
  // onDisplayNoticfication=async()=>
  // {
//   await notifee.displayNotification({
//     title: 'Notification Title',
//     body: 'Main body content of the notification',
//     android: {
//       channelId,
//       smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//     },
//   });
// }
  

  get_booking_details = async () => {
    await axios({
      method: 'post',
      url: api_url + booking_details,
      data: {id: this.state.data.id},
    })
      .then(async response => {
        this.setState({data: response.data.result});
      })
      .catch(error => {
        alert('Sorry something went wrong');
      });
  };

  handleBackButtonClick=()=> {
    this.props.navigation.goBack(null);
    return true;
  }

  chat = () => {
    this.props.navigation.navigate('Chat', {data: this.state.data});
  };

  video = () => {
    this.props.navigation.navigate('VideoCall', {
      booking_id: this.state.data.booking_id,
    });
  };

  render() {
    return (
      <>
        <ImageBackground
          source={doctorthree}
          resizeMode="cover"
          style={styles.my_style1}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{padding: 12}}>
            <Image
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'white',
                marginVertical: 6,
                marginLeft: 2,
              }}
              source={back}
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={{padding: 8}}>
          <Text style={styles.my_style31}>
            Doctor Informations {this.state.data.name}
          </Text>
          <View style={{flexDirection: 'row', padding: 12, marginBottom: -10}}>
            <FontAwesome
              name="user"
              size={20}
              color="black"
              style={styles.my_style9}
            />
            <View style={{height: 12, width: 12}} />
            <Text style={styles.my_style11}>{this.state.data.doctor.name}</Text>
          </View>

          {/* <View style={{flexDirection: 'row', padding: 12}}>
          <FontAwesome
            name="mobile"
            size={25}
            color="black"
            style={styles.my_style16}
          />
          <Text style={styles.my_style18}>{this.state.data.doctor.number}</Text>
        </View> */}
          <View style={styles.view1}>
            <FontAwesome
              name="envelope"
              size={15}
              color="black"
              style={styles.my_style21}
            />
            <View style={{height: 12, width: 12}} />
            <Text style={styles.my_style11}>
              {this.state.data.doctor.email}
            </Text>
          </View>
          <Text style={styles.my_style31}>Sickness Information</Text>
          <View style={{height: 4, width: 12}} />
          <View style={styles.view1}>
            <Text style={styles.my_style11}>{this.state.data.title}</Text>

            <Text style={styles.my_style11}>{this.state.data.description}</Text>
          </View>
          <Text style={styles.my_style31}>Booking Information</Text>

          <View style={{flexDirection: 'row', padding: 12}}>
            <FontAwesome
              name="clock-o"
              size={20}
              color="black"
              style={styles.my_style35}
            />
            <View style={{height: 12, width: 7}} />
            <Text style={styles.my_style11}>Appointment Time :</Text>
            <View style={{height: 0, width: 5}} />
            <Text style={styles.my_style11}>
              {Moment(this.state.data.appointmentTime).format('hh:mm A')}-
              {Moment(this.state.data.appointmentTime).format('DD MMM-YYYY')}
            </Text>
          </View>
          <View style={{flexDirection: 'row', padding: 12}}>
            <FontAwesome
              name="calendar"
              size={20}
              color="black"
              style={styles.my_style42}
            />
            <View style={{height: 12, width: 5}} />
            <Text style={styles.my_style11}>Booking Date :</Text>
            <View style={{height: 12, width: 5}} />
            <Text style={styles.my_style11}>
              {Moment(this.state.data.start_time).format('DD MMM-YYYY')}
            </Text>
          </View>
          <View style={{flexDirection: 'row', padding: 12}}>
            <FontAwesome
              name="hospital-o"
              size={20}
              color="black"
              style={styles.my_style35}
            />
            <View style={{height: 12, width: 12}} />
            <Text style={styles.my_style11}>Booking Type : </Text>

            {this.state.data.appointmentMode == 'online' ? (
              <Text style={styles.my_style11}>
                Online consultation ( {this.state.data.appointmentMode} )
              </Text>
            ) : (
              <Text style={styles.my_style11}>
                Direct appointment ( {this.state.data.appointmentMode} )
              </Text>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            {this.state.data.booking_id && (
              <>
                <FontAwesome
                  name="id-badge"
                  size={20}
                  color="black"
                  style={styles.my_style50}
                />

                <Text style={styles.my_style11}>Booking Id</Text>
                {/* // style={styles.my_style53} /> */}
                <Text style={styles.my_style11}>
                  #{this.state.data.booking_id}
                </Text>
              </>
            )}
          </View>
          <View style={{flexDirection: 'row', padding: 12,borderColor:'grey',borderTopWidth:.4}}>
            <Text style={styles.my_style11}>Status :</Text>
            <Text style={styles.my_style11}>{this.state.data.status}</Text>
          </View>

          <View>
            {this.state.data.videoToken ? (
              <TouchableOpacity
                style={{
                  height: 74,
                  width: 75,
                  marginTop: 19,
                  marginRight: 23,
                  right: '-74%',
                  top: '-64%',
                }}
                onPress={() => {
                  this.props.navigation.navigate('VideoCall', {
                    call: this.state.data.videoToken,
                  });
                  global.videoToken1 = this.state.data.videoToken;
                }}>
                <LottieView source={video_call} autoPlay loop />
              </TouchableOpacity>
            ) : (
              <View style={{right: '-47%', top: '-147%'}}>
                <Text style={styles.my_style11}>
                  Call is not initiated by Doctor Yet
                </Text>
              </View>
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view1: {
    flexDirection: 'row',
    padding: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginBottom: 7,
  },
  my_style1: {alignSelf: 'center', height: 220, width: '100%'},
  my_style2: {marginTop: -45},
  my_style3: {alignSelf: 'center', height: 90, width: 90, borderRadius: 45},
  my_style4: {
    backgroundColor: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style5: {fontSize: 14, color: colors.theme_fg, fontFamily: font_title},
  my_style6: {margin: 5},
  my_style7: {padding: 5},
  my_style8: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style9: {color: colors.theme_fg},
  my_style10: {
    height: '100%',
    width: '35%',
    justifyContent: 'center',
    marginLeft: 5,
  },
  my_style11: {fontSize: 14, fontFamily: font_description, color: 'black'},
  my_style12: {margin: 2},
  my_style13: {height: '100%', width: '5%', alignSelf: 'center'},
  my_style14: {margin: 5},
  my_style15: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style16: {color: colors.theme_fg},
  my_style17: {
    height: '100%',
    width: '90%',
    justifyContent: 'center',
    marginLeft: 5,
  },
  my_style18: {fontSize: 12, color: '#C4C3C3', fontFamily: font_description},
  my_style19: {margin: 5},
  my_style20: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style21: {color: colors.theme_fg},
  my_style22: {
    height: '100%',
    width: '90%',
    justifyContent: 'center',
    marginLeft: 5,
  },
  my_style23: {fontSize: 12, color: '#C4C3C3', fontFamily: font_description},
  my_style24: {margin: 2},
  my_style25: {
    backgroundColor: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style26: {fontSize: 14, color: colors.theme_fg, fontFamily: font_title},
  my_style27: {margin: 5},
  my_style28: {
    fontSize: 12,
    paddingRight: 20,
    color: '#C4C3C3',
    fontFamily: font_description,
  },
  my_style29: {margin: 2},
  my_style30: {
    backgroundColor: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style31: {fontSize: 14, color: colors.theme_fg, fontFamily: font_title,fontWeight:'bold'},
  my_style32: {margin: 5},
  my_style33: {padding: 5},
  my_style34: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style35: {color: colors.theme_fg},
  my_style36: {
    height: '100%',
    width: '45%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  my_style37: {fontSize: 12, color: '#C4C3C3', fontFamily: font_title},
  my_style38: {margin: 2},
  my_style39: {
    fontSize: 14,
    color: colors.theme_fg_five,
    fontFamily: font_description,
  },
  my_style40: {margin: 5},
  my_style41: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style42: {color: colors.theme_fg},
  my_style43: {
    height: '100%',
    width: '35%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  my_style44: {fontSize: 12, color: '#C4C3C3', fontFamily: font_title},
  my_style45: {margin: 2},
  my_style46: {height: '100%', width: '70%', alignSelf: 'center'},
  my_style47: {
    fontSize: 14,
    color: colors.theme_fg_five,
    fontFamily: font_description,
  },
  my_style48: {margin: 10},
  my_style49: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style50: {color: colors.theme_fg},
  my_style51: {
    height: '100%',
    width: '35%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  my_style52: {fontSize: 12, color: '#C4C3C3', fontFamily: font_title},
  my_style53: {margin: 2},
  my_style54: {
    fontSize: 14,
    color: colors.theme_fg_five,
    fontFamily: font_description,
  },
  my_style55: {margin: 2},
  my_style56: {height: '100%', width: '5%', alignSelf: 'center'},
  my_style57: {margin: 5},
  my_style58: {margin: 5},
  my_style59: {margin: 2},
  my_style60: {
    backgroundColor: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style61: {fontSize: 14, color: colors.theme_fg, fontFamily: font_title},
  my_style62: {margin: 5},
  my_style63: {padding: 5},
  my_style64: {alignItems: 'center', justifyContent: 'center'},
  my_style65: {color: colors.theme_fg},
  my_style66: {
    fontSize: 12,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  my_style67: {alignItems: 'center', justifyContent: 'center'},
  my_style68: {color: colors.theme_fg},
  my_style69: {
    fontSize: 12,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },

  title: {
    fontSize: 18,
    color: '#1065cd',
    marginTop: 10,
    marginRight: 30,
    fontFamily: font_title,
  },
  header: {
    marginRight: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  imagethree: {
    alignSelf: 'center',
    height: 40,
    width: 40,
    borderRadius: 100,
  },
});
