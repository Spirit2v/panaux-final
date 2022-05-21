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
import back from '../assets/icons/back1.png';
export default class Home1 extends Component<Props> {
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
    };
  }

  componentDidMount() {
    this.home_details();
  }
  symptoms = async () => {
    this.setState({value: true});
    await axios
      .get(`${api_url1}/doctor_symptom/`)
      .then(response =>
        this.setState({symptoms_first: response.data, value: false}),
      );
  };
  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loader visible={this.state.value} />

        <View>
          <View style={styles.pre_style1}>
            <TouchableOpacity
              style={styles.pre_style2}
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
              />
            </TouchableOpacity>
            <View style={styles.pre_style4} />
            <Text style={styles.pre_style5}>Doctor Appointment</Text>
          </View>
        </View>

        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.theme_bg}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {/* <Content padder> */}
        <View style={styles.home_style1}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <Image
              style={{height: 160, width: 360, marginHorizontal: 12}}
              source={{
                uri: 'http://desihealth.rithlaundry.com/public/uploads/images/c9bf184c6ec34e019b37872f64156540.png',
              }}
            />
            <Image
              style={{height: 160, width: 360, marginHorizontal: 12}}
              source={{
                uri: 'http://desihealth.rithlaundry.com/public/uploads/images/f8a18166d6835a79de78f627f8857dab.png',
              }}
            />
            <Image
              style={{height: 160, width: 360, marginHorizontal: 12}}
              source={{
                uri: 'http://desihealth.rithlaundry.com/public/uploads/images/6f54ab573fc8ba54f574bbeca7675eef.png',
              }}
            />
          </ScrollView>
        </View>
        <View style={styles.home_style4} />
        <Text style={styles.home_style5}>Categories</Text>
        <View style={styles.home_style6} />
        <View style={styles.home_style7}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <TouchableOpacity activeOpacity={1} style={styles.home_style8}>
              <Image
                style={styles.home_style9}
                source={{
                  uri: 'http://desihealth.rithlaundry.com/public/uploads/images/dbaa5d951824cca6b6caf1f6ed75fb3f.jpg',
                }}
              />
              <Text style={styles.home_style10}>Cardiologist</Text>
            </TouchableOpacity>
            {/* ))} */}
          </ScrollView>
        </View>

        <View style={styles.home_style14} />

        <Text style={styles.home_style16}>Common Symptoms</Text>

        <View style={styles.home_style17} />

        <FlatList
          horizontal={true}
          data={this.state.symptoms_first}
          getItemLayout={(item, index) => ({
            length: 12,
            offset: 12 * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View>
              <TouchableOpacity
                activeOpacity={1}
                style={{margin: 2}}
                onPress={() => this.symptoms_doctor_list(item.name)}>
                <View style={styles.home_style20}>
                  <Image
                    style={styles.home_style21}
                    source={{uri: item.image}}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.home_style22}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <View style={styles.home_style23} />
        <View style={styles.home_style24}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {this.state.symptoms_second.map((row, index) => (
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.symptoms_doctor_list(row.id)}>
                  <View style={styles.home_style26}>
                    <Image
                      style={styles.home_style27}
                      source={{uri: img_url + row.service_image}}
                    />
                  </View>
                </TouchableOpacity>
                {/* </Card> */}
                <Text style={styles.home_style28}>{row.service_name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.home_style29} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.home_style31}>Doctors</Text>

          <Text
            onPress={() => this.top_doctor_list()}
            style={styles.home_style31}>
            View All
          </Text>
        </View>

        <View style={styles.home_style34} />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={styles.home_style35}>
            <FlatList
              horizontal={true}
              data={this.state.doctors}
              getItemLayout={(item, index) => ({
                length: 12,
                offset: 12 * index,
                index,
              })}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.doctor_details(item)}
                  style={styles.home_style37}>
                {item.profilePicture ?  
                <Image
                    source={{uri: item.profilePicture}}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 150 / 2,
                      overflow: 'hidden',
                      borderWidth: 1,
                      // borderColor: 'blue',
                    }}
                  />
                  :
                  <View
                  style={{borderRadius:45,borderColor:'grey',borderWidth:.3,padding:16}}
                  >
                      <Text>
                    No Image 
                  </Text>
                  </View>
                
}
                  <View style={styles.home_style38} />

                  <Text style={styles.home_style39}>{item.name}</Text>
                  <View style={styles.home_style40} />
                  <Text style={styles.home_style41}>
                    Specialist : {item.sub_category.name}
                    {/* {item.speciality} */}
                  </Text>
                  <Text style={styles.home_style41}>
                    description : {item.category.name}
                  </Text>

                  <View style={styles.home_style42} />
                  {item.overall_rating > 0 && (
                    <Rating
                      ratingCount={5}
                      startingValue={row.overall_rating}
                      imageSize={12}
                      readonly={true}
                    />
                  )}
                  <View style={styles.home_style43} />
                  <Text style={styles.home_style44}>View Profile</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>

        <View style={styles.home_style45} />
      </ScrollView>
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

  pre_style1: {
    alignItems: 'flex-start',
    margin: 10,
  },
  pre_style2: {width: 100, justifyContent: 'center'},
  pre_style3: {color: colors.theme_fg_two, fontSize: 30},
  pre_style4: {margin: 5},
  pre_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  pre_style6: {margin: 20},

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
