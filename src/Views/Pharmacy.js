import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import { Loader} from '../components/GeneralComponents';
import {
  img_url,
  api_url1,
  Vendor,
  app_name,
  logo,
  vendor_list,
  banner2,
  banner1,
  banner3,
  height_30,
  no_data,
  filter,
  home_banners,
  font_title,
  font_description,
  no_data_lottie,
} from '../config/Constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
// import {connect} from 'react-redux';
// import {
//   serviceActionPending,
//   serviceActionError,
//   serviceActionSuccess,
// } from '../actions/HomeActions';
// import {productListReset} from '../actions/ProductActions';

// import {Button, Icon, Divider, SearchBar} from 'react-native-elements';
// import { Container, Header, Content, Left, Body, Right, Title, Button as Btn, Footer, Icon as Ic, Row, Col, Card, CardItem, Thumbnail } from 'native-base';
// import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
// import RBSheet from "react-native-raw-bottom-sheet";
// import RangeSlider from 'rn-range-slider';
import LottieView from 'lottie-react-native';
// import CheckBox from 'react-native-check-box';
import DATA from '../assets/json/Pharmacy.json';
class Pharmacy extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      PharmacyData: [],
      isChecked: false,
      result: [],
      address: 'Please choose address',
      last_active_address: 0,
      banners: [],
      search: '',
      isLoding: false,
      api_status: 0,
      vendor_list: [],
      dataa: [{}],
      PharmacyData: [],
      lotie:false
    };
    // this.get_vendor();
    // this.get_banners();
  }

  // componentWillMount() {}

  // setMenuRef = ref => {
  //   this._menu = ref;
  // };

  // hideMenu = () => {
  //   this._menu.hide();
  // };

  // showMenu = () => {
  //   this._menu.show();
  // };

  // open_filter = () => {
  //   this.RBSheet.open();
  // };

  // get_banners = async () => {
  //   this.setState({isLoding: true});
  //   await axios({
  //     method: 'get',
  //     url: api_url + home_banners,
  //   })
  //     .then(async response => {
  //       this.setState({isLoding: false});
  //       this.setState({banners: response.data.result});
  //     })
  //     .catch(error => {
  //       this.setState({isLoding: false});
  //       alert('Something went wrong');
  //     });
  // };

  // updateSearch = async search => {
  //   await this.setState({search: search});
  //   await this.get_vendor();
  // };

  get_vendor = async () => {
    this.setState({isLoding: true});
    await axios({
      method: 'get',
      url: `${api_url1}/vendors`,
    }).then(response => {
      console.log(response.data.data[0]);
      this.setState({PharmacyData: response.data.data,isLoding:false});
      if (!response.data.data[0]){
        this.setState({lotie:true});
                };
    })
    .catch(response=>{
      alert(response);
      this.setState({isLoding: false});
    })
  };

  async componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.get_vendor();
  }

  move_to_category = async data => {
    await this.props.navigation.navigate('PharmacyDetail', {vendor: data});
  };

  select_address = () => {
    this.props.navigation.navigate('AddressList', {from: 'home'});
  };

  move_to_vendor_detail = async id => {
    await this.props.navigation.navigate('VendorDetails', {id: id});
  };

  render() {
    // const {isLoding, error, data, message, status} = this.props;
    return (
      <>
        <Loader visible={this.state.isLoding}/>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.select_address.bind(this)}
          style={styles.ph_style1}>
          <Icon style={styles.ph_style2} name="map" />
          <View style={styles.ph_style3} />
          <Text numberOfLines={1} style={styles.ph_style4}>
            {this.state.address}
          </Text>
        </TouchableOpacity>


        <FlatList
          data={this.state.PharmacyData}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={this.move_to_category.bind(this, item)}
              activeOpacity={1}
              style={styles.ph_style10}>
              <View style={styles.ph_style11} />
              <Image
                style={styles.ph_style12}
                source={{uri: item.storeImage}}
              />
              <View style={styles.ph_style13} />
              <View style={styles.ph_style14}>
                <Text style={styles.ph_style15}>{item.storeName}</Text>
                <Text style={styles.ph_style16} numberOfLines={1}>
                  allahabad
                </Text>
              </View>
              {/* <View style={styles.ph_style17}/> */}
              <View style={styles.ph_style19}>
                <Icon
                  name="star"
                  size={17}
                  type="font-awesome"
                  color="black"
                  iconStyle={styles.ph_style20}
                />
                <Text style={styles.ph_style21}>3{item.overall_ratings}</Text>
              </View>
              <View style={styles.ph_style22}>
                <Text style={styles.ph_style23}>
                  ( 23 {item.no_of_ratings} customers reviews)
                </Text>
              </View>

              <View style={styles.ph_style24}>
                <Text style={styles.ph_style25}>Open</Text>
                {/* {item.online_status == 1 ?
                            <Text style={styles.ph_style25} >
                            Open
                            </Text>
                            :
                            <Text style={styles.ph_style26} >
                            Closed
                            </Text>
                          } */}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.home.isLoding,
    error: state.home.error,
    data: state.home.data,
    message: state.home.message,
    status: state.home.status,
  };
}

const mapDispatchToProps = dispatch => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: error => dispatch(serviceActionError(error)),
  serviceActionSuccess: data => dispatch(serviceActionSuccess(data)),
  productListReset: () => dispatch(productListReset()),
});

export default Pharmacy;

const styles = StyleSheet.create({
  ph_style1: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.theme_fg,
    alignItems: 'center',
  },
  ph_style2: {color: colors.theme_fg},
  ph_style3: {margin: 5},
  ph_style4: {width: '80%', fontFamily: font_description},
  ph_style5: {backgroundColor: colors.light_grey},
  ph_style6: {backgroundColor: colors.theme_bg_three, height: 40},
  ph_style7: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
  ph_style8: {borderRadius: 10},
  ph_style9: {height: 140, width: 260, borderRadius: 10, marginRight: 10},
  ph_style10: {padding: 10,borderBottomColor:'grey',borderBottomWidth:.3},
  ph_style11: {margin: 5},
  ph_style12: {alignSelf: 'center', height: 220, width: 335, borderRadius: 10},
  ph_style13: {margin: 5},
  ph_style14: {alignItems: 'center',marginBottom:-23},
  ph_style15: {color: colors.theme_fg, fontSize: 16, fontFamily: font_title},
  ph_style16: {fontSize: 11, color: 'grey', fontFamily: font_description},
  ph_style17: {margin: 5},
  ph_style18: {width: '15%'},
  ph_style19: {flexDirection: 'row'},
  ph_style20: {marginRight: 5},
  ph_style21: {fontFamily: font_description},
  ph_style22: {alignSelf: 'center'},
  ph_style23: {fontSize: 12, color: '#C4C3C3', fontFamily: font_description},
  ph_style24: {alignSelf: 'center', width: '15%'},
  ph_style25: {
    fontSize: 10,
    color: colors.theme_bg_three,
    backgroundColor: colors.green,
    padding: 2,
    paddingLeft: 5,
    borderRadius: 10,
    width: 50,
    textAlign: 'center',
    fontFamily: font_description,
  },
  ph_style26: {
    fontSize: 10,
    color: colors.theme_bg_three,
    backgroundColor: colors.red,
    padding: 2,
    paddingLeft: 5,
    borderRadius: 10,
    width: 50,
    textAlign: 'center',
    fontFamily: font_description,
  },
  ph_style27: {margin: 10},
  ph_style28: {backgroundColor: colors.theme_fg},
  ph_style29: {height: 250, marginTop: '20%'},

  touchable_opacity: {
    backgroundColor: colors.black_layer,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  service_name: {
    color: colors.theme_bg_three,
    fontSize: 18,
    fontFamily: font_title,
  },
  description: {
    color: colors.theme_bg_three,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontFamily: font_description,
  },
  header: {
    backgroundColor: colors.theme_bg_three,
  },
  header_body: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    color: colors.theme_fg,
    fontSize: 20,
    fontFamily: font_description,
  },
  logo_view: {
    height: 40,
    width: 40,
  },
  card_content_bottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 0,
    margin: 0,
    shadowOffset: {width: 0, height: 15},
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  card_content_top: {
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  vendor_ratings_text: {
    fontSize: 18,
    color: colors.grey,
    fontFamily: font_description,
  },
  vendor_ratings: {
    fontSize: 15,
    color: colors.black_layer,
    fontFamily: font_description,
  },
  star_icon: {color: colors.theme_fg, fontSize: 15},
  vendor_address: {
    fontSize: 13,
    color: colors.black_layer,
    fontFamily: font_description,
  },
  order_now_test: {
    fontSize: 15,
    fontFamily: font_description,

    color: colors.theme_fg,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderColor: colors.theme_bg,
    height: 40,
    marginBottom: 5,
  },
  vendor_time: {
    fontSize: 13,
    color: colors.theme_bg,
    fontFamily: font_description,
  },
  menuContent: {
    color: '#000',
    fontFamily: font_description,
    padding: 2,
    fontSize: 20,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: colors.light_grey,
    borderColor: colors.light_grey,
    height: 42,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 25,
    padding: 5,
    width: '100%',
  },
});
