import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Button as Btn,

  Card,
  CardItem,
  Col,
  Footer,
  Row,
} from 'native-base';
import {
  api_url,
  img_url,
  reject_order,
  font_title,
  font_description,
} from '../config/Constant';
import * as colors from '../assets/css/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {captureScreen} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
// import { Loader } from '../components/GeneralComponents';
// import { Divider, Button } from 'react-native-elements';
import axios from 'axios';
import ViewShot from 'react-native-view-shot';
// import { connect } from 'react-redux';
// import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ViewPrescriptionActions';
import ImageView from 'react-native-image-view';
import back from '../assets/icons/back1.png';
import rx from "../assets/icons/rx.jpg";
// import download from "../assets/icons/download.png";
// import rx from "../assets/icons/rx.jpg";
class ViewPrescription extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.reject_order = this.reject_order.bind(this);
    this.state = {
      data: this.props.route.params.data,
      image: [],
      isImageViewVisible: false,
      imageURI: '',
      dataExist: false,
      urii: '',
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  accept_order = () => {
    this.props.navigation.navigate('Payment', {
      from: 'prescription',
      prescription_id: this.state.data.id,
      prescription_total: this.state.data.total,
    });
  };
  screenShot = uri => {
    CameraRoll.save(uri)
      .then(resp => Alert.alert(`Image Saved to Camera Rolls ${resp}`))
      .catch(err => alert(err));
  };

  takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(uri => {
      console.log('Image saved to', uri);

      error => console.error('Oops, snapshot failed', error);
      this.screenShot(uri);
      this.setState({
        uriii: uri,
      });
    });
    // this.screenShot(this.state.urii);
  };

  close_popup = () => {
    this.setState({isImageViewVisible: false});
  };

  render() {
    const {isLoding, error, data, message, status} = this.props;

    return (
      <View
      style={{backgroundColor:'white'}}
      >
        {/* <ViewShot onCapture={this.onCapture} captureMode="mount"> */}
        <View>
          <View style={styles.view_style1}>
            <TouchableOpacity
              style={styles.view_style2}
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
            <TouchableOpacity
              style={{}}
              onPress={this.takeScreenShot}
              // onPress={this.screenShot}
              activeOpacity={1}>
              {/* <Text>download</Text> */}
              <Icon name="download-outline" size={29} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginLeft: 12}}>
          <Text style={styles.view_style5}>View Prescription</Text>
        </View>

        <View style={styles.view_style6} />
        <View>
          <ImageView
            images={this.state.image}
            imageIndex={0}
            isVisible={this.state.isImageViewVisible}
            onClose={() => this.close_popup()}
          />

          <View
            style={styles.boxS}>
            <View>
              <Text style={styles.view_style7}>Doctor Detail</Text>
              <View
              style={{flexDirection:'row'}}
              >
                <View>
                <Image
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'white',
                  marginVertical: 6,
                  marginLeft: 2,
                }}
                source={rx}
              />
                </View>
            
              <View
              style={{marginBottom:32,marginTop:32}}
              >
              <Text style={styles.view_style11}>
                  {this.state.data.doctor.name}
                </Text>
                {/* <Text>{'\n'}</Text> */}
                <Text style={styles.view_style7}>
                  {this.state.data.doctor.qualification}
                </Text>
                <Text style={styles.view_style7}>
                  {this.state.data.doctor.description}
                </Text>
                <Text style={styles.view_style7}>
                  {this.state.data.doctor.email}
                </Text>
              </View>
                
              </View>
              <View
                style={{
                  left: '20%',
                  marginTop: -30,
                }}>
                
              </View>
              <View></View>
            </View>
          </View>

          {this.state.data.customer_notes && (
            <View>
              <View header>
                <Text style={styles.view_style9}>Your Notes</Text>
              </View>
              <View>
                <Text style={styles.view_style10}>
                  {this.state.data.customer_notes}
                </Text>
              </View>
            </View>
          )}
<View
style={styles.boxS}>
<View>
            <Text style={styles.view_style7}>Patient Detail</Text>
            <View>
              <Text style={styles.view_style11}>{global.name}</Text>
            </View>
            <View style={styles.view_style12}>
              <Text style={styles.view_style7}>Problem title </Text>
              <Text style={styles.view_style9}>
                {this.state.data.booking.title},
              </Text>
              <Text style={styles.view_style7}>Problem description</Text>
              <Text style={styles.view_style9}>
                {this.state.data.booking.description}
              </Text>
            </View>
          </View>

</View>
<View>


</View>
          
          {this.state.data.status != 1 && (
            <View
            style={styles.boxS}
            >
              <View>
              <View header>
                <Text style={styles.view_style7}>Prescription Medicine</Text>
              </View>
              {this.state.data.medicines.map((row, index) => (
                <View>
                  <View>
                    <View style={styles.view_style16}>
                      <Text style={styles.view_style17}>{row.name}</Text>
                      <Text style={styles.view_style19}>{row.abbrv}</Text>
                    </View>

                    <View style={styles.view_style18}></View>
                    <View style={styles.view_style20}>
                      <Text style={styles.view_style19}>
                        Take for {row.days} days
                      </Text>
                      {/* <Text style={styles.view_style21}>{global.currency}{row.price}</Text> */}
                    </View>
                  </View>
                </View>
              ))}
              </View>
              {/* <Divider style={styles.view_style22} /> */}
            </View>
          )}
        </View>

        {/* <Loader visible={isLoding} /> */}
        {/* </ViewShot> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.view_prescription.isLoding,
    error: state.view_prescription.error,
    data: state.view_prescription.data,
    message: state.view_prescription.message,
    status: state.view_prescription.status,
  };
}

const mapDispatchToProps = dispatch => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: error => dispatch(serviceActionError(error)),
  serviceActionSuccess: data => dispatch(serviceActionSuccess(data)),
});

export default ViewPrescription;

const styles = StyleSheet.create({
  view_style1: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view_style2: {width: 100, justifyContent: 'center'},
  view_style3: {color: colors.theme_fg_two, fontSize: 30},
  view_style4: {margin: 5},
  view_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
    marginLeft: 12,
  },
  view_style6: {margin: 5},
  view_style7: {fontFamily: font_title, color: 'grey'},
  view_style8: {
    width: 100,
    height: 70,
    alignSelf: 'center',
    borderColor: colors.theme_bg_three,
    borderWidth: 1,
  },
  view_style9: {fontFamily: font_title, color: colors.theme_fg_two},
  view_style10: {fontFamily: font_description},
  view_style11: {
    fontFamily: font_title,
    color: colors.theme_fg_two,
    fontSize: 20,
  },
  view_style12: {paddingLeft: 20, paddingRight: 20, paddingBottom: 10},
  view_style13: {fontFamily: font_description},
  view_style14: {fontFamily: font_description},
  view_style15: {fontFamily: font_title, color: colors.theme_fg_two},
  view_style16: {width: '100%',color:'black'},
  view_style17: {fontFamily: font_title, width: 100,color:'black'},
  view_style18: {width: '70%'},
  view_style19: {
    fontFamily: font_description,
    // width: '100%',
    paddingHorizontal: 12,
    color:'grey'
  },
  view_style20: {width: 80},
  view_style21: {fontFamily: font_description},
  view_style22: {
    backgroundColor: colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  view_style23: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  view_style24: {fontFamily: font_title},
  view_style25: {width: 80},
  view_style26: {fontFamily: font_description},
  view_style27: {
    backgroundColor: colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  view_style28: {fontFamily: font_title},
  view_style29: {width: 80},
  view_style30: {fontFamily: font_description},
  view_style31: {
    backgroundColor: colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  view_style32: {fontFamily: font_title},
  view_style33: {width: 80},
  view_style34: {fontFamily: font_description},
  view_style35: {marginBottom: 20},
  view_style36: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  view_style37: {
    backgroundColor: colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  view_style38: {fontFamily: font_title},
  view_style39: {width: 80},
  view_style40: {fontFamily: font_title},
  view_style41: {marginBottom: 20},
  view_style42: {backgroundColor: 'transparent'},
  view_style43: {padding: 10},
  view_style44: {backgroundColor: colors.red, fontFamily: font_title},
  view_style45: {width: 10},
  view_style46: {backgroundColor: colors.theme_fg, fontFamily: font_title},

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
  footer_container: {
    width: '100%',
    backgroundColor: colors.theme_bg,
  },
  btn_cart: {
    color: colors.theme_fg_three,
    fontWeight: 'bold',
    backgroundColor: colors.theme_bg,
  },
  boxS:{
    shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 2,
              borderColor: 'white',
              borderWidth: 0.2,
         
              justifyContent: 'space-between',
              flexDirection: 'row',
              // paddingHorizontal: 32,
              padding: 5,
              marginBottom:28,
              paddingBottom:22
  }
});
