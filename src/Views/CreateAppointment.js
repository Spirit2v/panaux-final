import {
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  StyleSheet,ScrollView
} from 'react-native';
import React, {Component} from 'react';
import * as colors from '../assets/css/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Snackbar from 'react-native-snackbar';
import {Picker} from '@react-native-picker/picker';
import {
  doctor_image,
  create_booking,
  api_url,
  font_title,
  font_description,
  check_available_timing,
  api_url1,
} from '../config/Constant';
export default class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      title: '',
      deliveryDatePickerVisible: false,
      delivery_date: '',
      delivery_time: '',
      start_time: '',
      doctor_id: this.props.route.params.id,
      type: this.props.route.params.type,
      price_per_conversation: this.props.route.params.price_per_conversation,
      isLoding: false,
      mode: '',
      loaderValue: false,
      data: this.props.route.params.data,
      mode1: '',
      amount: '',
      // data: this.props.route.params.data,
      num: '',
    };
  }
  modeSelect = () => {
    // if(this.state.data.commission)
    if (this.state.data.speciality == 'Super-specialist') {
      this.setState({
        mode1: 'Offline',
        amount: this.state.data.commission.offline['fees'],
        mode: 'Offline',
      });
    } else if (this.state.data.speciality == 'Doctor') {
      this.setState({
        mode: 'Online',
        mode1: 'Online',
        amount: this.state.data.commission.online['fees'],
      });
    } else if (this.state.data.speciality == 'Specialist') {
      this.setState({
        amount: this.state.data.commission.online['fees'],
      });
    }
  };
  check_timing = async () => {
    this.setState({isLoding: true});
    await axios({
      method: 'post',
      url: api_url + check_available_timing,
      data: {
        doctor_id: this.state.doctor_id,
        start_time: this.state.start_time,
        booking_type: this.state.type,
      },
    })
      .then(async response => {
        this.setState({isLoding: false});
        if (response.data.status == 0) {
          alert(response.data.message);
        } else {
          this.make_payment();
        }
      })
      .catch(error => {
        alert('something went wrong');
        this.setState({isLoding: false});
      });
  };

  checkValidate = () => {
    // description: this.state.description,
    // // this.state.description,
    // title: this.state.title,
    // //  this.state.password,
    // appointmentTime: this.state.start_time,
    // appointmentMode: this.state.mode,

    if (this.state.title == '') {
      // this.state.validation = false;
      this.showSnackbar('Please enter title');
      // return true;
    } else if (this.state.description == '') {
      // this.state.validation = false;
      this.showSnackbar('Please enter your description');
      // return true;
    } else if (this.state.start_time == '') {
      // this.state.validation = false;
      this.showSnackbar('Please select time and date');
      // return true;
    } else if (this.state.mode == '') {
      // this.state.validation = false;
      this.showSnackbar('Please select appointment mode');
      // return true; amount: '',
    }
    else if (this.state.amount == '') {
      // this.state.validation = false;
      this.showSnackbar('Please  availble  appointment mode');
      // return true; amount: '',
    } else {
      this.check_validation();
    }
  };
  showSnackbar(msg) {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  check_validation = async () => {
    this.props.navigation.navigate('CreateAppointment2', {
      data: this.state.data,
      doctor: this.state.doctor_id,
      description: this.state.description,
      title: this.state.title,
      appointmentTime: this.state.start_time,
      appointmentMode: this.state.mode,
      amount: this.state.amount,
    });
  };
  onValueChange(value: string) {
    this.setState({
      mode: value,
    });
    if (value == 'Online') {
      this.setState({
        amount: this.state.data.commission.online['fees'],
      });
    } else if (value == 'Offline') {
      this.setState({
        amount: this.state.data.commission.offline['fees'],
      });
    }
  }
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
  };

  handleDeliveryDatePicked = async date => {
    var d = new Date(date);
    let delivery_date =
      d.getFullYear() +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getDate();
    // 2021-12-10T08:40:08.675+00:00
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    let ampm = 'AM';
    if (hr > 12) {
      hr -= 12;
      ampm = 'PM';
    }
    let delivery_time = hr + ':' + min + ' ' + ampm;

    let start_time = delivery_date + ' ' + delivery_time;
    this.setState({
      start_time: start_time,
      delivery_date: delivery_date,
      deliveryDatePickerVisible: false,
      delivery_time: delivery_time,
    });
  };
  showDeliveryDatePicker = () => {
    this.setState({deliveryDatePickerVisible: true});
  };
  hideDeliveryDatePicker = () => {
    this.setState({deliveryDatePickerVisible: false});
  };
  render() {
    return (
      <ScrollView>
        <View
        style={{
          justifyContent: 'center',
          padding: 12,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity 
        onPress={()=>this.props.navigation.goBack()}
        style={{marginVertical: 12}}>
          <Icon name="arrow-back-outline" color="black" size={21} />
        </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 32}}>New Appointment</Text>
        <Text style={{color: 'black', marginTop: 32}}>Problem</Text>
        <TextInput
          style={styles.log_style15}
          placeholder="Title"
          placeholderTextColor="grey"
          onChangeText={TextInputValue =>
            this.setState({title: TextInputValue})
          }
          // value={text}
        />
        <Text style={{color: 'black', marginTop: 32}}>Problem Description</Text>
        <TextInput
          style={styles.log_style15}
          placeholder="description"
          placeholderTextColor="grey"
          onChangeText={TextInputValue =>
            this.setState({description: TextInputValue})
          }
          // value={text}
        />
        <TouchableOpacity
          onPress={this.showDeliveryDatePicker}
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
            marginHorizontal: '45%',
            marginVertical: 32,
          }}>
          <Icon name="time-outline" size={40} color={colors.theme_bg} />

          {this.state.start_time ? (
            <Text style={styles.create_style14}>{this.state.start_time}</Text>
          )
          :(
            <Text style={styles.create_style14}>(Select your date & time)</Text>
          )
          }
          
        </TouchableOpacity>

        {/* //fees */}
        <View style={styles.create_style12} />
        {this.state.mode1 ? (
          <>
            <Text style={styles.create_style141}>
              Appointment Mode :{this.state.mode}
            </Text>
            <Text style={styles.create_style141}>
              Consultation Fee :{this.state.amount}
            </Text>
          </>
        ) : (
          <View style={{paddingHorizontal: 14}}>
            <Text style={styles.create_style141}>
              Appointment Mode :
              {this.state.mode1 ? (
                <Text>{this.state.mode}</Text>
              ) : (
                <Text> {this.state.mode}</Text>
              )}
            </Text>
            <Picker
              note
              mode="dropdown"
              style={{width: 190,marginTop:-12,color:'black'}}
              selectedValue={this.state.mode}
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item color="black" label="Choose" value="" 
              labelColor="black"
              />
              <Picker.Item color="black" label="Online" value="Online" />
              <Picker.Item color="black" label="Offline" value="Offline" />
          
            </Picker>
            <Text style={styles.create_style141}>
              Consultation Fee :{' '}
              {this.state.amount ? (
                <Text>{this.state.amount}</Text>
              ) :
              <>
              {this.state.mode ?(
                <Text
                style={{color:"black"}}
                >{`${this.state.mode} not availble`}</Text>
              ):
              (<Text>

                </Text>)
              
              }
              </>
              }
            </Text>
          </View>
        )}

        <Button
          onPress={this.checkValidate}
          title="PAY NOW"
          color={colors.theme_bg}
          accessibilityLabel="Learn more about this purple button"
        />
        {/* <DateTimePicker
                isVisible={true}
                onConfirm={this.handleDeliveryDatePicked}
                onCancel={this.hideDeliveryDatePicker}
                minimumDate={new Date()}
                mode="datetime"
              /> */}
        <DateTimePickerModal
          isVisible={this.state.deliveryDatePickerVisible}
          mode="datetime"
          onConfirm={this.handleDeliveryDatePicked}
          onCancel={this.hideDeliveryDatePicker}
          minimumDate={new Date()}
        />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  log_style15: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.4,
    color: 'black',
    marginTop: 22,
  },
  create_style1: {alignItems: 'flex-start', margin: 10},
  create_style2: {width: 100, justifyContent: 'center'},
  create_style3: {color: colors.theme_fg_two, fontSize: 30},
  create_style4: {margin: 0},
  create_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  create_style6: {margin: 10},
  create_style7: {fontSize: 14},
  create_style8: {fontFamily: font_title},
  create_style9: {margin: 10},
  create_style10: {fontSize: 14, height: 80},
  create_style11: {fontFamily: font_title},
  create_style12: {marginBottom: 0},
  create_style13: {fontSize: 50, color: colors.theme_fg},
  create_style14: {
    fontSize: 12,
    color: colors.grey,
    fontFamily: font_description,
    marginLeft: -42,
  },
  create_style141: {
    fontSize: 15,
    color: colors.grey,
    fontFamily: font_description,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  create_style15: {margin: 10},
  create_style16: {fontFamily: font_description},
  create_style17: {backgroundColor: 'transparent'},
  create_style18: {width: '100%', backgroundColor: colors.theme_bg},
  create_style19: {alignItems: 'center', justifyContent: 'center'},
  create_style20: {
    color: colors.theme_fg_three,
    fontFamily: font_title,
    fontSize: 18,
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
  prescription_image: {
    width: 100,
    height: 70,
    alignSelf: 'center',
    borderColor: colors.theme_bg_three,
    borderWidth: 1,
  },
});
