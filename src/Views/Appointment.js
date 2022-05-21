import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {Loader} from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import {
  api_url,
  my_orders,
  height_30,
  no_data,
  tablet,
  img_url,
  font_title,
  font_description,
  no_appointment_lottie,
  no_orders_lottie,
  api_url1,
} from '../config/Constant';
import LottieView from 'lottie-react-native';
import {
  NativeBaseProvider,
  Box,
  Tabs,
  Tab,
  ListItem,
  Col,
  TabHeading,
  Thumbnail,
  Icon,
} from 'native-base';
import Moment from 'moment';
export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotie: false,
      current_status: '',
      isLoding: false,
      api_status: 0,
      orders: [],
      order2: [],
      booking_requests: [],
      bookingData: [],
      load: false,
      load1: false,
    };

    // this.getBookings();
    // this.getOrders();
  }
  componentDidMount() {
    this.getBookings();
  }
  mybooking_details = data => {
    this.props.navigation.navigate('BookingDetail', {data: data});
  };

  getBookings = async () => {
    this.setState({isLoding: true});
    await axios
      .post(
        `${api_url1}/doctor_booking/userView`,
        {},
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res.data[0]);
        this.setState({bookingData: res.data, isLoding: false});
        if (!res.data[0]) {
          this.setState({lotie: true});
        };
        // else{
        //   this.setState({lotie:true});
        // }
      }
      )
      .catch(error=>{
        console.log(error);
        this.setState({isLoding: false});
      })
    this.setState({load: true});
  };

  render() {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.getBookings();
          }}>
          <Text 
        
          style={{color: 'blue'}}>Refresh</Text>
        </TouchableOpacity>
        <Loader visible={this.state.isLoding} />
       
        <FlatList
          data={this.state.bookingData}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => this.mybooking_details(item)}
              style={{
                padding: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.2,
                borderColor: 'grey',
              }}>
              <View
              // style={{borderBottomWidth:1}}
              >
                <View style={styles.order_style5}>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 150 / 2,
                      overflow: 'hidden',
                      borderWidth: 1,
                      borderColor: 'yellow',
                      marginLeft: 12,
                    }}
                    source={{uri: item.doctor.profilePicture}}
                  />
                </View>
              </View>
              <View style={{marginLeft: -32}}>
                <View style={styles.order_style6}>
                  <Text style={styles.order_style7}>{item.doctor.name}</Text>
                  <Text style={styles.order_style9} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <View style={styles.order_style10} />

                  {item.status == 'Pending' && (
                    <View
                      style={{
                        width: 120,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#e7e7e7',
                        alignContent: 'center',
                      }}>
                      <Text style={{color: 'black'}}>Pending</Text>
                    </View>
                  )}

                  {item.status == 'Confirmed' && (
                    <View
                      style={{
                        width: 120,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#4CAF50',
                        alignContent: 'center',
                      }}>
                      <Text style={{color: 'white'}}>Confirmed</Text>
                    </View>
                  )}

                  {item.status == 'Completed' && (
                    <View
                      style={{
                        width: 120,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'green',
                        alignContent: 'center',
                      }}>
                      <Text style={{color: 'white'}}>Completed</Text>
                    </View>
                  )}

                  {item.status == 'Cancelled' && (
                    <View
                      style={{
                        width: 120,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f44336',
                        alignContent: 'center',
                      }}>
                      <Text style={{color: 'white'}}>Cancelled</Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.order_style11}>
                <Text style={styles.order_style13}>
                  {Moment(item.appointmentTime).format('hh:mm A')}
                </Text>
                <Text style={styles.order_style13}>
                  {Moment(item.appointmentTime).format('DD MMM ')}
                </Text>
                <Text style={styles.order_style13}>
                  {Moment(item.appointmentTime).format('yyyy')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        {this.state.lotie && (
          <LottieView source={no_appointment_lottie} autoPlay loop />
        )}
       
      </>
    );
  }
}
const styles = StyleSheet.create({
  order_style1: {backgroundColor: colors.theme_bg},
  order_style2: {backgroundColor: colors.theme_bg_three},
  order_style3: {color: colors.theme_fg},
  order_style4: {
    color: colors.theme_fg,
    marginLeft: 10,
    fontFamily: font_title,
  },
  order_style5: {width: '20%'},
  order_style6: {width: '60%'},
  order_style7: {
    fontSize: 15,
    fontFamily: font_title,
    color: colors.theme_fg_two,
    width: 120,
  },
  order_style8: {margin: 1},
  order_style9: {
    color: colors.grey,
    marginRight: 10,
    fontFamily: font_description,
    width: 120,
  },
  order_style10: {margin: 3},
  order_style11: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: colors.theme_fg,
  },
  order_style12: {
    color: colors.theme_fg,
    fontFamily: font_title,
    fontSize: 18,
  },
  order_style13: {
    color: colors.theme_fg,
    fontSize: 12,
    fontFamily: font_description,
  },
  order_style14: {height: 250, marginTop: '40%'},
  order_style15: {alignSelf: 'center', fontFamily: font_title},
  order_style16: {backgroundColor: colors.theme_bg_three},
  order_style17: {color: colors.theme_fg},
  order_style18: {
    color: colors.theme_fg,
    marginLeft: 10,
    fontFamily: font_title,
  },
  order_style19: {width: '30%'},
  order_style20: {height: 30, width: 30},
  order_style21: {flex: 1, width: undefined, height: undefined},
  order_style22: {width: '30%'},
  order_style23: {
    width: '190%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.theme_fg,
  },
  order_style24: {margin: 1},
  order_style25: {fontSize: 10, fontFamily: font_description},
  order_style26: {color: colors.theme_fg, fontFamily: font_description},
  order_style27: {margin: 3},
  order_style28: {
    width: 100,
    height: 30,
    backgroundColor: colors.theme_bg,
    fontFamily: font_title,
  },
  order_style29: {fontSize: 12, fontFamily: font_title},
  order_style30: {
    fontSize: 15,
    fontFamily: font_title,
    color: colors.theme_fg_two,
  },
  order_style31: {height: 250, marginTop: '40%'},
  order_style32: {alignSelf: 'center', fontFamily: font_title},

  header: {
    backgroundColor: colors.theme_bg_three,
  },
  icon: {
    color: colors.theme_fg_two,
  },
  header_body: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    color: colors.theme_fg_two,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: font_title,
  },
});
