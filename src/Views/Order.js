import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import ProgressCircle from "react-native-progress-circle";
import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
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

import Moment from 'moment';
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_status: '',
      isLoding: false,
      api_status: 0,
      orders: [],
      order2: [],
      booking_requests: [],
      bookingData: [],
      load: false,
      load1: false,
      lotie:false
    };
 
    this.getOrders();
  }

componentDidMount(){
  this.getOrders();
}

myorders_details = (data) => {
  this.props.navigation.navigate("OrderDetails", { data: data });
};
getOrders = async () => {
  this.setState({load1:true,isLoding:true});
  await axios
    .get(`${api_url1}/order/user_order`, {
      headers: { Authorization: `Bearer ${global.fcm_token}` },
    })
    .then((res) => {
      this.setState({ order2: res.data.userOrder, load: true,isLoding:false });
      if (!res.data.userOrder[0]){
        this.setState({lotie:true});
                }
      console.log(res);
    })
      .catch((res) => {
        console.log(res);
        this.setState({ isLoding:false });
      });
   
  
};

  render() {
    return (<>
       <Loader visible={this.state.isLoding} />
        {this.state.lotie &&

<LottieView source={no_orders_lottie} autoPlay loop />
     }
     <TouchableOpacity
                  onPress={()=>{
                    this.getOrders();
                  }}
                  >
                  <Text
                  style={{color:'blue'}}
                  >Refresh</Text> 

                  </TouchableOpacity>
      <FlatList
        data={this.state.order2}
        renderItem={({item, index}) => (
        <TouchableOpacity
        onPress={() => this.myorders_details(item)}
        style={{flexDirection:'row',justifyContent:'space-between',padding:22,borderBottomColor:'grey',borderBottomWidth:.3}}
        >
          <View></View>
        <View
        style={{marginLeft:-22}}
        >
    
         
           <ProgressCircle
                        percent={item.status * 16.666}
                        radius={30}
                        borderWidth={3}
                        color={colors.theme_fg}
                        shadowColor="#e6e6e6"
                        bgColor="#FFFFFF"
                      >
                        <View style={styles.order_style20}>
                          <Image style={styles.order_style21} source={tablet} />
                        </View>
                      </ProgressCircle>
                      </View>
                      <View>
                      <Text style={styles.order_style23}>
                        Order Id : {item._id}
                      </Text>
                      <Text style={styles.order_style23}>
                    
                        Pharmacy:
                         {/* {item.vendor.storeName} */}
                      </Text>
                      <View style={styles.order_style24} />
                      <Text style={styles.order_style23}>
                        {Moment(item.createdAt).format("DD MMM-YYYY hh:mm")}
                      </Text>
                      <Text style={styles.order_style26}>{item.label_name}</Text>

                      <Text style={styles.order_style23}>
                        Status: {item.status}
                      </Text>
                      </View>
                      <View>
                        <Text style={styles.order_style30}>
                        {global.currency}
                        {item.amount}
                      </Text>
                      </View>

        </TouchableOpacity>)}
        keyExtractor={item => item.id}
      />
      </>
    );
        }
}

const styles = StyleSheet.create({
  order_style1: { backgroundColor: colors.theme_bg },
  order_style2: { backgroundColor: colors.theme_bg_three },
  order_style3: { color: colors.theme_fg },
  order_style4: {
    color: colors.theme_fg,
    marginLeft: 10,
    fontFamily: font_title,
  },
  order_style5: { width: "20%" },
  order_style6: { width: "60%" },
  order_style7: {
    fontSize: 15,
    fontFamily: font_title,
    color: colors.theme_fg_two,
  },
  order_style8: { margin: 1 },
  order_style9: {
    color: colors.grey,
    marginRight: 10,
    fontFamily: font_description,
  },
  order_style10: { margin: 3 },
  order_style11: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
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
  order_style14: { height: 250, marginTop: "40%" },
  order_style15: { alignSelf: "center", fontFamily: font_title },
  order_style16: { backgroundColor: colors.theme_bg_three },
  order_style17: { color: colors.theme_fg },
  order_style18: {
    color: colors.theme_fg,
    marginLeft: 10,
    fontFamily: font_title,
  },
  order_style19: { width: "30%" },
  order_style20: { height: 30, width: 30 },
  order_style21: { flex: 1, width: undefined, height: undefined },
  order_style22: { width: "30%" },
  order_style23: {
    width: "190%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.theme_fg,
    color:'black'
  },
  order_style24: { margin: 1 },
  order_style25: { fontSize: 10, fontFamily: font_description },
  order_style26: { color: colors.theme_fg, fontFamily: font_description },
  order_style27: { margin: 3 },
  order_style28: {
    width: 100,
    height: 30,
    backgroundColor: colors.theme_bg,
    fontFamily: font_title,
  },
  order_style29: { fontSize: 12, fontFamily: font_title },
  order_style30: {
    fontSize: 15,
    fontFamily: font_title,
    color: colors.theme_fg_two,
  },
  order_style31: { height: 250, marginTop: "40%" },
  order_style32: { alignSelf: "center", fontFamily: font_title },

  header: {
    backgroundColor: colors.theme_bg_three,
  },
  icon: {
    color: colors.theme_fg_two,
  },
  header_body: {
    flex: 3,
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    color: colors.theme_fg_two,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: font_title,
  },
});
