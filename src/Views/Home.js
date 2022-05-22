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
  StatusBar,
} from 'react-native';
// import {  Loader } from "../components/GeneralComponents";
import {
  img_url,
  api_url,
  font_title,
  font_description,
  home_details,
  get_doctors,
  api_url1,
} from '../config/Constant';
import * as colors from '../assets/css/Colors';
import {NativeBaseProvider, Box} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  serviceActionPending,
  serviceActionError,
  serviceActionSuccess,
} from '../actions/HomeActions';
import {productListReset} from '../actions/ProductActions';
import {Loader} from '../components/GeneralComponents';
import HomeButton from '../components/HomeButton';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      banners: [],
      category: [],
      symptoms_first: [],
      symptoms_second: [],
      doctors: [],
      home_result: [],
      // isLoding: true,
      // newLoad:true
    };
    // this.home_details();
    // this.doctors();
  }

  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener("focus", () => {
    this.home_details();
    // });
  }
  symptoms = async () => {
    this.setState({value: true});
    await axios
      .get(`${api_url1}/doctor_symptom/`)
      .then(response =>
        this.setState({symptoms_first: response.data, value: false}),
      );
  };
  doctorsList = async () => {
    this.setState({value: true});
    await axios
      .get(`${api_url1}/doctors/`)
      .then(response =>
        this.setState({doctors: response.data.data, value: false}),
      );
  };

  home_details = async () => {
    // this.setState({value:true});
    this.symptoms();
    this.doctorsList();
    this.setState({value: false, newLoad: false});
  };

  symptoms_doctor_list = name => {
    this.props.navigation.navigate('DoctorSymptoms', {name: name});
  };

  top_doctor_list = () => {
    this.props.navigation.navigate('DoctorList', {id: 0, type: 3});
  };

  doctor_details = data => {
    this.props.navigation.navigate('DoctorDetail', {data: data});
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.theme_bg}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <View
        style={{padding:12}}
        >
        <Text
      style={ {fontSize: 25,
        color: colors.theme_fg_two,
        fontFamily: font_title,padding:8,justifyContent:'center',alignItems:'center'}}
      >
        Home
      </Text>
        </View>
     
      <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 12,
        // borderTopLeftRadius: 42,
        // borderTopRightRadius: 42,
        // backgroundColor: 'white',
        paddingHorizontal:22,
        marginTop:-62
      }}>
     

        <TouchableOpacity
        style={{width:'100%'}}
        onPress={()=>{
          this.props.navigation.navigate('Home1')
        }}
        >
        <HomeButton title="Doctor Appointment" pic="calendar-outline" />
        </TouchableOpacity>

        <TouchableOpacity
         style={{width:'100%'}}
         onPress={()=>{
          this.props.navigation.navigate('Pharmacy')
        }}
        >
        <HomeButton title="Pharmacy " pic="medkit-outline" />
        </TouchableOpacity>
        
        <TouchableOpacity
         style={{width:'100%'}}
         onPress={()=> this.props.navigation.navigate('Diagnostic')}
        >
        <HomeButton title="Diagnostic" pic="search-outline" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={()=>alert('Coming Soon')}
         style={{width:'100%'}}
        >
        <HomeButton title="Medical Service " pic="add-circle-outline" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={()=>alert('Coming Soon')}
         style={{width:'100%'}}
        >
        <HomeButton title="Parental Care" pic="people-outline" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={()=>alert('Coming Soon')}
         style={{width:'100%'}}
        >
        <HomeButton title="Medical Equipments" pic="flashlight-outline" />
        </TouchableOpacity>
        
     
     
      
    
     
  
    </View>
    </>
    );
  }
}

const styles = StyleSheet.create({
  home_style1: {paddingTop: 10, flexDirection: 'row'},
  home_style2: {borderRadius: 10},
  home_style3: {height: 140, width: 260, borderRadius: 10, marginRight: 10},
  home_style4: {marginTop: 30},
  home_style5: {
    fontFamily: font_title,
    fontSize: 18,
    color: colors.theme_fg_two,
    marginLeft: 15,
  },
  home_style6: {margin: 5},
  home_style7: {flexDirection: 'row'},
  home_style8: {
    borderColor: colors.theme_fg_three,
    borderWidth: 1,
    height: 105,
    width: 105,
    marginRight: 10,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: colors.theme_bg,
    justifyContent: 'center',
    marginBottom: 12,
    marginRight: 12,
  },
  home_style9: {alignSelf: 'center', height: 50, width: 50},
  home_style10: {
    alignSelf: 'center',
    fontSize: 14,
    color: colors.theme_fg_three,
    marginTop: 10,
    fontFamily: font_description,
  },
  home_style11: {margin: 15},
  home_style12: {
    backgroundColor: colors.theme_bg,
    width: '100%',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    fontFamily: font_title,
  },
  home_style13: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'center',
    fontFamily: font_title,
  },
  home_style14: {margin: 15},
  home_style15: {height: '100%', width: '60%', alignSelf: 'center'},
  home_style16: {
    fontFamily: font_title,
    fontSize: 18,
    color: colors.theme_fg_two,
    marginLeft: 15,
  },
  home_style17: {margin: 3},
  home_style18: {flexDirection: 'row'},
  home_style19: {borderRadius: 20, marginLeft: 5},
  home_style20: {
    borderColor: colors.theme_fg_three,
    borderWidth: 1,
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: colors.theme_bg_three,
    padding: 7,
  },
  home_style21: {alignSelf: 'center', height: 50, width: 50},
  home_style22: {
    alignSelf: 'center',
    fontSize: 14,
    color: colors.theme_fg_two,
    padding: 5,
    fontFamily: font_description,
  },
  home_style23: {margin: 5},
  home_style24: {flexDirection: 'row'},
  home_style25: {borderRadius: 20, marginLeft: 5},
  home_style26: {
    borderColor: colors.theme_fg_three,
    borderWidth: 1,
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: colors.theme_bg_three,
    padding: 12,
  },
  home_style27: {alignSelf: 'center', height: 50, width: 50},
  home_style28: {
    alignSelf: 'center',
    fontSize: 14,
    color: colors.theme_fg_two,
    padding: 5,
    fontFamily: font_description,
  },
  home_style29: {margin: 13},
  home_style30: {
    height: '100%',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
  home_style31: {
    fontFamily: font_title,
    fontSize: 15,
    color: colors.theme_fg_two,
    marginHorizontal: 15,
  },
  home_style32: {
    height: '100%',
    width: '20%',
    alignSelf: 'center',
    marginTop: 15,
  },
  home_style33: {
    alignSelf: 'center',
    fontSize: 12,
    color: colors.theme_fg_two,
    marginLeft: 20,
    fontFamily: font_description,
  },
  home_style34: {margin: 3},
  home_style35: {flexDirection: 'row'},
  home_style36: {width: 200, borderRadius: 10},
  home_style37: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: font_description,
    borderWidth: 0.5,
    margin: 12,
    borderColor: 'grey',
    padding: 4,
    borderRadius: 12,
    paddingHorizontal: 22,
    height: 207,
  },
  home_style38: {margin: 5},
  home_style39: {
    fontSize: 16,
    color: colors.theme_fg_two,
    fontFamily: font_description,
  },
  home_style40: {margin: 2},
  home_style41: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: font_description,
    marginLeft: -11,
  },
  home_style42: {margin: 2},
  home_style43: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    width: '100%',
    margin: 10,
  },
  home_style44: {
    fontSize: 14,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  home_style45: {margin: 10},

  title: {
    fontSize: 18,
    fontFamily: font_title,
    color: '#000000',
    marginTop: 10,
    marginRight: 180,
  },
  header: {
    marginLeft: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    margin: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#144B90',
    borderWidth: 1,
    borderColor: colors.theme_fg,
    height: 40,
    width: 130,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 10,
  },
  imagetwo: {
    alignSelf: 'center',
    height: 30,
    width: 30,
  },
  imageone: {
    alignSelf: 'center',
    height: 55,
    width: 55,
    borderRadius: 100,
  },
  imagethree: {
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 100,
    marginTop: 5,
  },
  imagefive: {
    alignSelf: 'center',
    height: 40,
    width: 40,
  },
  imagesix: {
    alignSelf: 'center',
    height: 20,
    width: 20,
  },
  image: {
    alignSelf: 'center',
    height: 180,
    width: 320,
    borderRadius: 10,
  },
});
