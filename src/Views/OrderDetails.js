import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Button,
} from 'react-native';
// import {
//   View,
//   Header,
//   Content,
//   View,
//   View,
//   View,
//   Title,
//   Button,
//   Icon,
//   View,
//   View,
//   View,
//   View,
//   View,
//   Radio,
//   Card,
// } from "native-base";
import * as Colors from '../assets/css/Colors';
import ProgressCircle from 'react-native-progress-circle';
// import { Divider } from "react-native-elements";
import Moment from 'moment';
import axios from 'axios';

import wallet1 from '../assets/icons/back1.png';
import {
  tablet,
  cancelation_reasons,
  api_url,
  cancel_order,
  font_description,
  font_title,
  order_details,
  api_url1,
} from '../config/Constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default class OrderDetails extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.route.params.data,
      products: this.props.route.params.data.product,
      TotalPrice: '',
    };

  }
  componentDidMount() {
    // console.log(`data log >> ${JSON.stringify(this.state.data)}`);
  }
  payNow = async () => {
    this.props.navigation.navigate('Payment', {data: this.state.data});
  };
  cancelNow = async () => {
    await axios
      .patch(
        `${api_url1}/order/update_orderStatus`,
        {id: this.state.data._id, status: 'cancelled'},
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res);
        alert('Order Cancelled');
      })
      .then(this.props.navigation.navigate('MyOrders'));

    // .catch((error) => alert(error));
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.od_style1}>
            <TouchableOpacity
              style={styles.od_style2}
              onPress={this.handleBackButtonClick}
              activeOpacity={1}>
              <Image
                style={{
                  width: 20,
                  height: 20,

                  marginVertical: 6,
                  marginView: 7,
                }}
                source={wallet1}
              />
            </TouchableOpacity>
            <View style={styles.od_style4} />
            <Text style={styles.od_style5}>
              {this.state.data.vendor?.storeName}
            </Text>
          </View>
        </View>
        <View style={{padding: 12}}>
          <View>
            <View>
              <View style={{flexDirection: 'row'}}></View>

              <Text style={styles.od_style6}>
                Order Id - {this.state.data._id}
              </Text>
              <Text style={styles.od_style7}>
                {Moment(this.state.data.createdAt).format('DD MMM-YYYY hh:mm')}
              </Text>
            </View>
          </View>
          <View style={styles.od_style8}>
            <View>
              <ImageBackground
                source={{uri: this.state.data.prescription}}
                resizeMode="cover"
                style={{flex: 1, height: 244, width: '100%'}}></ImageBackground>
            </View>
          </View>
          {/* <Divider style={styles.od_style12} /> */}
          <View style={styles.od_style13}>
            {/* <View>
              <Text style={styles.od_style14}>Delivery Address -</Text>
              <Text style={styles.od_style15} />
            </View> */}
            <View>
            <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="home"
            size={18}
            color={Colors.theme_bg}
            style={{marginTop:4}}
          />
            <View style={{height: 8, width: 8}} />
    <Text style={styles.od_style14}>Delivery Address -</Text>
        </View> 
              {/* <Text style={styles.od_style18}>
                {this.state.data.vendor.address &&
                <Text>
                      {this.state.data.vendor.address}
                  </Text> 
                  } */}
              <Text
              style={{marginTop:9,color:'grey'}}
              >
                {this.state.data.vendor?.address.addressLine1}
                {this.state.data.vendor?.address.addressLine2}
              </Text>

              {/*             
              </Text> */}
            </View>
          </View>
          <View 
          style={styles.line}
          />
          <View style={styles.od_style16}>
            {this.state.data.paymentMode && (
              <>
                <View style={{flexDirection: 'row'}}>
          <FontAwesome
            name="money-check"
            size={18}
            color={Colors.theme_bg}
            style={{marginTop:4}}
          />
            <View style={{height: 12, width: 12}} />
                  <Text style={styles.od_style14}>Payment Mode -</Text>
                </View>
                <View>
                  <Text  style={{marginTop:9,color:'grey'}}>
                    {this.state.data.paymentMode}
                  </Text>
                </View>
                <View style={styles.od_style19} />
          {/* <Divider style={styles.od_style20} /> */}
          <View 
          style={styles.line}
          />
              </>
            )}
          </View>
    {
this.state.products[0] &&
<>
          <View style={styles.od_style21}>
          <FontAwesome
            name="flask"
            size={18}
            color={Colors.theme_bg}
            style={{marginTop:4}}
          />
          <View 
          style={{height:12,width:6}}
          />
            <View>
              <Text style={styles.od_style14}>Your items:</Text>
            </View>
          </View>
    
          <View>
            {this.state.products?.map((item, index) => (
              <View>
                <View>
                  <View style={styles.od_style23}>
                    <Text style={styles.od_style22}>{item.product.title}</Text>
                  </View>
                  <View>
                    <Text style={styles.od_style22}>
                      {item.product.description}
                    </Text>
                  </View>
                  <View style={styles.od_style26}>
                    <Text style={styles.od_style27}>
                      {global.currency}
                      {item.product.price}
                    </Text>
                    {/* {this.setState({TotalPrice:(View.product.price)})} */}
                  </View>
                </View>
              </View>
            ))}
            <View
            style={{height:12}}
            />
          </View>
          <View 
          style={styles.line}
          />
          </>
          }
          {/* <View style={styles.od_style28}>
            {/* <View>
              <Text style={styles.od_style22}>
                Subtotal -{this.state.data.vendor?.status}
              </Text>
            </View>
            <View style={styles.od_style30}>
              <Text style={styles.od_style22} >{global.currency}{this.state.data.sub_total}</Text>
            </View> */}
          {/* <View>
              <Text style={styles.od_style22}>-</Text>
            </View>
          </View> */}
          {/* <View style={styles.od_style32}>
            <View>
              <Text style={styles.od_style22}>Discount -</Text>
            </View>
            <View style={styles.od_style34}>
              <Text style={styles.od_style22} >{global.currency}{this.state.data.discount}</Text>
            </View>
            <View>
              <Text style={styles.od_style22}>-</Text>
            </View>
          </View> */}
          {/* <View style={styles.od_style36}>
            <View>
              <Text style={styles.od_style22}>Delivery Charge -</Text>
            </View>
            <View style={styles.od_style38}>
              {/* <Text style={styles.od_style39} >{global.currency}{this.state.data.delivery_charge}</Text> */}
          {/* </View>
            <View>
              <Text style={styles.od_style22}>-</Text>
            </View>
          </View>
          <View style={styles.od_style40}>
            <View>
              <Text style={styles.od_style22}>Tax -</Text>
            </View>

            <View style={styles.od_style42}>
              <Text style={styles.od_style43} >{global.currency}{this.state.data.tax}</Text>
            </View>
            <View>
              <Text style={styles.od_style22}>-</Text>
            </View>
          </View> */}

          <View style={styles.od_style40}>
            <View style={styles.od_style21}>
          <FontAwesome
            name="money-bill"
            size={18}
            color={Colors.theme_bg}
            style={{marginTop:4}}
          />
          <View 
          style={{height:12,width:6}}
          />
              <Text style={styles.od_style14}>Total Amount -</Text>
            </View>
            <View>
              <Text style={styles.od_style41}>{this.state.data.amount}</Text>
            </View>
          </View>
          <View style={styles.od_style44} />
          {/* <Divider style={styles.od_style45} /> */}
          <View style={styles.od_style46}>
            <View />
            <View style={styles.od_style48}>
              {/* <Text style={styles.od_style49} >{global.currency}{this.state.data.total}</Text> */}
            </View>
          </View>
          <View style={styles.od_style50} />
          {/* <Loader visible={this.state.isLoding} /> */}
        </View>
        {/* {this.state.data.status <= 2 &&  */}
        {this.state.data.status == 'processing' ||
        this.state.data.status == 'new' ? (
          <View>
            <View style={styles.od_style511}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  marginBottom: 23,
                }}>
                <Text style={styles.od_style47}>Total </Text>
                <Text style={styles.od_style47}>{this.state.data.amount}</Text>
              </View>
            </View>
            {this.state.data.status == 'processing' &&
            this.state.data.payment == false ? (
              <View style={styles.od_style51}>
                <View style={styles.od_style52}>
                  <Button
                    title="Pay now"
                    onPress={this.payNow}
                    // style={{ color:"#0c0a8d"}}
                    color={'#0c0a8d'}
                    // buttonStyle={styles.od_style53}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.od_style51}>
                <View style={styles.od_style52}>
                  <Button
                    title="Cancel"
                    onPress={this.cancelNow}
                    color={'#0c0a8d'}
                    // buttonStyle={styles.od_style53}
                  />
                </View>
              </View>
            )}
          </View>
        ) : (
          <View>
            {this.state.data.status == 'paid' && (
              <View
                style={{
                  paddingHorizontal: 23,
                  height: 42,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 12,
                }}>
                <Text style={{fontSize: 20}}>Status -</Text>
                <View
                  style={{
                    backgroundcolor: 'white',
                    padding: 6,
                    borderRadius: 4,
                    width: 62,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#4CAF50',
                      fontWeight: 'bold',
                    }}>
                    Paid
                  </Text>
                  <TouchableOpacity onPress={this.payNow}>
                    {/* <Text>
                      testPaid
                    </Text> */}
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {this.state.data.status == 'cancelled' && (
              <View
                style={{
                  paddingHorizontal: 23,
                  height: 42,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 12,
                }}>
                <Text style={{fontSize: 20}}>Status - </Text>
                <View
                  style={{
                    backgroundcolor: 'white',
                    padding: 6,
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 20, color: '#f44336'}}>
                    Cancelled
                  </Text>
                </View>
              </View>
            )}
            {this.state.data.status == 'delivered' && (
              <View
                style={{
                  paddingHorizontal: 23,
                  height: 42,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginVertical: 12,
                }}>
                <Text style={{fontSize: 20}}>Status - </Text>
                <View
                  style={{
                    backgroundcolor: 'white',
                    padding: 6,
                    borderRadius: 6,
                    alignContent: 'center',
                    paddingHorizontal: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 20, color: '#008CBA'}}>
                    Delivered
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  line:{height:.7,backgroundColor:'grey',marginBottom:5,marginTop:11},
  od_style1: {alignItems: 'flex-start', margin: 10},
  od_style2: {width: 100, justifyContent: 'center'},
  od_style3: {color: Colors.theme_fg_two, fontSize: 30},
  od_style4: {margin: 5},
  od_style5: {
    fontSize: 25,
    color: Colors.theme_fg_two,
    fontFamily: font_title,
  },
  od_style6: {
    marginTop: 10,
    fontSize: 15,
    color: Colors.theme_fg_two,
    fontFamily: font_title,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  od_style7: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: font_description,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'grey',
  },
  od_style8: {margin: 20},
  od_style9: {height: 60, width: 60},
  od_style10: {flex: 1},
  od_style11: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.theme_fg,
    fontFamily: font_title,
  },
  od_style12: {
    backgroundcolor: Colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  od_style13: {marginView: 20, marginView: 20, marginTop: 10},
  od_style14: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.theme_bg,
    fontFamily: font_title,
    fontWeight:'900'
    ,marginBottom:7

    // color: 'blue',
  },
  my_style11: {fontSize: 14, fontFamily: font_description, color: 'black'},
  od_style15: {marginTop: 5, fontSize: 13, fontFamily: font_description},
  od_style16: { marginTop: 1},
  od_style17: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.theme_fg_two,
    fontFamily: font_title,
  },
  od_style18: {marginTop: 5, fontSize: 13, fontFamily: font_description},
  od_style19: {marginTop: 10},
  od_style20: {
    backgroundcolor: Colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  od_style21: {flexDirection:'row'},
  od_style22: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.theme_fg_two,
    fontFamily: font_title,
  },
  od_style23: {width: 40},
  od_style24: {
    fontSize: 15,
    color: Colors.theme_fg,
    fontFamily: font_title,
    width: 121,
  },
  od_style25: {fontFamily: font_description},
  od_style26: {width: 70},
  od_style27: {fontFamily: font_description},
  od_style28: {marginView: 20, marginView: 20, marginTop: 10},
  od_style29: {fontFamily: font_title},
  od_style30: {width: 70},
  od_style31: {fontFamily: font_title},
  od_style32: {marginView: 20, marginView: 20, marginTop: 10},
  od_style33: {fontFamily: font_title},
  od_style34: {width: 70},
  od_style35: {fontFamily: font_title},
  od_style36: {marginView: 20, marginView: 20, marginTop: 10},
  od_style37: {fontFamily: font_title},
  od_style38: {width: 70},
  od_style39: {fontFamily: font_title},
  od_style40: {marginView: 20, marginView: 20, marginTop: 10},
  od_style41: {fontFamily: font_title},
  od_style42: {width: 70},
  od_style43: {fontFamily: font_title},
  od_style44: {marginBottom: 20},
  od_style45: {
    backgroundcolor: Colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  od_style46: {marginView: 20, marginView: 20, marginTop: 10},
  od_style47: {
    fontFamily: font_title,
    color: Colors.theme_fg_two,
    fontSize: 18,
  },
  od_style48: {width: 80},
  od_style49: {
    fontFamily: font_title,
    color: Colors.theme_fg_two,
    fontSize: 18,
  },
  od_style50: {margin: 10},
  od_style51: {backgroundcolor: Colors.theme_bg_three},
  od_style511: {
    backgroundcolor: Colors.theme_bg_three,
    marginVertical: -12,
    paddingVertical: 12,
  },
  od_style52: {width: '100%', justifyContent: 'center'},
  od_style53: {backgroundcolor: Colors.theme_bg, fontFamily: font_title},
  od_style54: {fontSize: 16, color: Colors.theme_fg_two},
  od_style55: {fontSize: 16, color: Colors.theme_fg_two},
  od_style56: {fontFamily: font_description},
  od_style57: {width: '15%', alignItems: 'flex-end'},

  header: {
    justifyContent: 'flex-start',
    height: '10%',
    backgroundcolor: Colors.theme_bg,
    borderBottomViewRadius: 45,
    borderBottomViewRadius: 45,
    shadowOffset: {width: 0, height: 15},
    shadowcolor: Colors.theme_bg,
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
    borderTopViewRadius: 15,
    borderTopViewRadius: 15,
    borderBottomViewRadius: 15,
    borderBottomViewRadius: 15,
    shadowOffset: {width: 0, height: 15},
    shadowcolor: Colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  icon: {
    color: Colors.theme_fg_two,
  },
  header_View: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    color: Colors.theme_fg_two,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: font_title,
  },
  delivery_date_label: {
    marginTop: 10,
    fontSize: 13,
    color: Colors.theme_fg_two,
    fontFamily: font_title,
  },
  delivery_date: {
    marginTop: 5,
    fontSize: 13,
  },
});
