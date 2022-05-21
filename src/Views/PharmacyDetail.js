import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Loader} from '../components/GeneralComponents';
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
  api_url1,
} from '../config/Constant';
import * as colors from '../assets/css/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { StatusBar, Loader } from "../components/GeneralComponents";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';

import Moment from 'moment';
import {fb} from '../config/firebaseConfig';

export class PharmacyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendor: this.props.route.params.vendor,
      isLoding: false,
      Pressed: '',
      _id: this.props.route.params.vendor._id,
      Image: '',
      ImageData: '',
      loaderValue: false,
    };
    // alert(this.state._id)
  }
  //   let formData = new FormData();
  // formData.append('key1', 'value1');
  // formData.append('key2', 'value2')
  handlePickerCamera = async () => {
   
    await ImagePicker.launchCamera({}, async response => {
  
       this.setState({ loaderValue: true });
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

        const formData = new FormData();
        formData.append('vendor', this.state._id);
        formData.append('prescription', this.state.ImageData);
        console.log(this.state.ImageData);
        console.log(formData);
        console.log(formData._parts);
        // here we can call a API to upload image on server
        await axios
          .post(
            `${api_url1}/order/add_order`,
           formData,
            {
              headers: {Authorization: `Bearer ${global.fcm_token}`},
            },
          )
          .then(res => {
            console.log(res);
            alert('success');
            this.props.navigation.navigate('MyOrders');
            this.setState({loaderValue: false});
          })
          .catch(errors => {
            alert(errors);
            this.setState({loaderValue: false});
          });

      }
    });
  };
  move_prescription = async () => {
    this.props.navigation.navigate('MyOrders');
  };
  handlePicker = async() => {

    await ImagePicker.launchImageLibrary({}, async response => {
  
      this.setState({ loaderValue: true });
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
        formData.append('vendor', this.state._id);
        formData.append('prescription', this.state.ImageData);
        console.log(formData);
        // here we can call a API to upload image on server
        await axios
          .post(`${api_url1}/order/add_order`, formData, {
            headers: {Authorization: `Bearer ${global.fcm_token}`},
          })
          .then(res => {
            console.log(res);

            this.props.navigation.navigate('MyOrders');
            this.setState({loaderValue: false});
            alert('success');
          })
          .catch(error => {
            alert(error);
            this.setState({loaderValue: false});
          });
      }
    });
  };

  render() {
    // const {data}= this.props
    return (
      <ScrollView>
        <Loader visible={this.state.loaderValue} />

        <ImageBackground
          style={styles.my_style1}
          source={{uri: this.state.vendor.storeImage}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{marginVertical: 12}}>
            <Icon name="arrow-back-outline" color="black" size={21} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={{paddingHorizontal: 22}}>
          <Text style={styles.my_style5}>
            Pharmacy Informations
            {/* {this.state._id} */}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 12,
              borderBottomColor: 'grey',
              borderBottomWidth: 0.3,
              height: 32,
            }}>
            <FontAwesome
              name="user"
              size={22}
              color="#0c0a8d"
              style={styles.my_style9}
            />

            <Text style={styles.my_style18}>{this.state.vendor.storeName}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 12,
              borderBottomColor: 'grey',
              borderBottomWidth: 0.3,
              height: 32,
            }}>
            <FontAwesome
              name="mobile"
              size={22}
              color="#0c0a8d"
              style={styles.my_style16}
            />
            {this.state.vendor.number && (
              <Text style={styles.my_style18}>{this.state.vendor.number}</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 12,
              borderBottomColor: 'grey',
              borderBottomWidth: 0.3,
              height: 32,
            }}>
            <FontAwesome
              name="envelope"
              size={22}
              color="#0c0a8d"
              style={styles.my_style21}
            />

            <Text style={styles.my_style18}>{this.state.vendor.email}</Text>
          </View>

          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontFamily: font_title,
              marginVertical: 10,
            }}>
            Upload your prescription
          </Text>
          <Button
            color={'#0c0a8d'}
            onPress={this.handlePicker}
            title="Upload Via gallery"
          />
          <View style={{height: 11}} />
          <Text
style={{color:'grey'}}
>
  Please upload image less than1 mb
</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  my_style1: {alignSelf: 'center', height: 300, width: '100%'},
  my_style2: {marginTop: -45},
  my_style3: {alignSelf: 'center', height: 90, width: 90, borderRadius: 45},
  my_style4: {
    backgroundcolors: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style5: {
    fontSize: 22,
    color: 'black',
    fontFamily: font_title,
    marginVertical: 12,
  },
  my_style6: {margin: 5},
  my_style7: {padding: 5},
  my_style8: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style9: {colors: colors.theme_fg},
  my_style10: {
    height: '100%',
    width: '35%',
    justifyView: 'center',
    marginLeft: 5,
  },
  my_style11: {fontSize: 12, colors: '#C4C3C3', fontFamily: font_description},
  my_style12: {margin: 2},
  my_style13: {height: '100%', width: '5%', alignSelf: 'center'},
  my_style14: {margin: 5},
  my_style15: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style16: {colors: colors.theme_fg},
  my_style17: {
    height: '100%',
    width: '90%',
    justifyView: 'center',
    marginLeft: 5,
  },
  my_style18: {
    fontSize: 16,
    color: 'black',
    fontFamily: font_description,
    margin: 1,
    marginLeft: 12,
  },
  my_style19: {margin: 5},
  my_style20: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style21: {colors: colors.theme_fg},
  my_style22: {
    height: '100%',
    width: '90%',
    justifyView: 'center',
    marginLeft: 5,
  },
  my_style23: {fontSize: 12, colors: '#C4C3C3', fontFamily: font_description},
  my_style24: {margin: 2},
  my_style25: {
    backgroundcolors: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style26: {fontSize: 14, colors: colors.theme_fg, fontFamily: font_title},
  my_style27: {margin: 5},
  my_style28: {
    fontSize: 12,
    paddingRight: 20,
    colors: '#C4C3C3',
    fontFamily: font_description,
  },
  my_style29: {margin: 2},
  my_style30: {
    backgroundcolors: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style31: {fontSize: 14, colors: colors.theme_fg, fontFamily: font_title},
  my_style32: {margin: 5},
  my_style33: {padding: 5},
  my_style34: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style35: {colors: colors.theme_fg},
  my_style36: {
    height: '100%',
    width: '45%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  my_style37: {fontSize: 12, colors: '#C4C3C3', fontFamily: font_title},
  my_style38: {margin: 2},
  my_style39: {
    fontSize: 14,
    colors: colors.theme_fg_five,
    fontFamily: font_description,
  },
  my_style40: {margin: 5},
  my_style41: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style42: {colors: colors.theme_fg},
  my_style43: {
    height: '100%',
    width: '35%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  my_style44: {fontSize: 12, colors: '#C4C3C3', fontFamily: font_title},
  my_style45: {margin: 2},
  my_style46: {height: '100%', width: '70%', alignSelf: 'center'},
  my_style47: {
    fontSize: 14,
    colors: colors.theme_fg_five,
    fontFamily: font_description,
  },
  my_style48: {margin: 10},
  my_style49: {height: '100%', width: '10%', alignSelf: 'center'},
  my_style50: {colors: colors.theme_fg},
  my_style51: {
    height: '100%',
    width: '35%',
    alignSelf: 'center',
    marginLeft: 5,
  },
  my_style52: {fontSize: 12, colors: '#C4C3C3', fontFamily: font_title},
  my_style53: {margin: 2},
  my_style54: {
    fontSize: 14,
    colors: colors.theme_fg_five,
    fontFamily: font_description,
  },
  my_style55: {margin: 2},
  my_style56: {height: '100%', width: '5%', alignSelf: 'center'},
  my_style57: {margin: 5},
  my_style58: {margin: 5},
  my_style59: {margin: 2},
  my_style60: {
    backgroundcolors: colors.theme_fg_three,
    width: '100%',
    padding: 10,
  },
  my_style61: {fontSize: 14, colors: colors.theme_fg, fontFamily: font_title},
  my_style62: {margin: 5},
  my_style63: {padding: 5},
  my_style64: {alignItems: 'center', justifyView: 'center'},
  my_style65: {colors: colors.theme_fg},
  my_style66: {
    fontSize: 12,
    colors: colors.theme_fg_two,
    fontFamily: font_title,
  },
  my_style67: {alignItems: 'center', justifyView: 'center'},
  my_style68: {colors: colors.theme_fg},
  my_style69: {
    fontSize: 12,
    colors: colors.theme_fg_two,
    fontFamily: font_title,
  },

  title: {
    fontSize: 18,
    colors: '#1065cd',
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

export default PharmacyDetail;
