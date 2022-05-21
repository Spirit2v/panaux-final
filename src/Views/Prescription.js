import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import {
  api_url,
  list,
  prescription_list,
  font_description,
  font_title,
  tablet,
  no_prescription_lottie,
  api_url1,
  no_order_lottie
} from "../config/Constant";
import * as colors from "../assets/css/Colors";
import { waiting_lottie } from "../config/Constant";
// import { Loader } from "../components/GeneralComponents";
import Moment from "moment";
import axios from "axios";
// import { connect } from "react-redux";
// import {
//   serviceActionPending,
//   serviceActionError,
//   serviceActionSuccess,
// } from "../actions/PrescriptionActions";
import ProgressCircle from "react-native-progress-circle";
import back from "../assets/icons/back1.png";
import LottieView from "lottie-react-native";
class Prescription extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      result: [],
      api_status: 0,
      activee: true,

      dataExist: false,
      lotie:false
    };
  }

  async componentDidMount() {

    this.getOrders();

  }



  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  view_prescription = (data) => {
    this.props.navigation.navigate("ViewPrescription", { data: data });
  };

  getOrders = async () => {
    this.setState({ load1: true });
    await axios
      .get(`${api_url1}/client/prescription/clientView`, {
        headers: { Authorization: `Bearer ${global.fcm_token}` },
      })
      .then((res) => {
        console.log(res);
        this.setState({ result: res.data });
        if (!res.data[0]) {
          this.setState({ lotie: true });
        };
        // console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };



  render() {
    const { isLoding, error, data, message, status } = this.props;

    return (
      <View>
             {this.state.lotie &&

<LottieView source={no_order_lottie} autoPlay loop />
     }
        <View>
          <View style={styles.pre_style1}>
            <TouchableOpacity
              style={styles.pre_style2}
              onPress={this.handleBackButtonClick}
              activeOpacity={1}
            >
              {/* <Icon onPress={this.handleBackButtonClick} style={styles.pre_style3} name='arrow-back' /> */}
              <Image
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "white",
                  marginVertical: 6,
                  marginLeft: 2,
                }}
                source={back}
              />
            </TouchableOpacity>
            <View style={styles.pre_style4} />
            <Text style={styles.pre_style5}>Prescription</Text>
          </View>
        </View>
        {/* <View style={styles.pre_style6} /> */}

        <View
        style={{}}
        >
          <View>
            {this.state.result.map((row, index) => (
              <TouchableOpacity
              style={{borderBottomColor:'grey',borderBottomWidth:.3,padding:18}}
              onPress={() => this.view_prescription(row)}
              >

              
            
   
                <View style={styles.pre_style10}>
                  <Text style={styles.pre_style11}> {row.doctor.name}</Text>
                  <Text style={styles.pre_style10}>
                    Prescription Id : #{row._id}
                  </Text>
                  {/* <Text style={styles.pre_style10}>{row.createdAt}</Text> */}
                  <View style={styles.pre_style12} />
                  <Text style={styles.pre_style10}>
                    {Moment(row.createdAt).format("DD MMM-YYYY hh:mm A")}
                  </Text>
                  {/* {row.status == 9 ? (
                    <Text style={styles.pre_style10}>{row.status_name}</Text>
                  ) : (
                    <Text style={styles.pre_style10}>{row.status_name}</Text>
                  )} */}
                </View>
                </TouchableOpacity>
            ))}
          </View>


          {this.state.lotie && (
            <View>
              <View style={styles.pre_style16}>
                <LottieView source={no_prescription_lottie} autoPlay loop />
              </View>
              <Text style={styles.pre_style17}>
                No doctor have sent any prescription yet
              </Text>
            </View>
          )}
        </View>
        {/* <Loader visible={isLoding} /> */}
      </View>
    );
  }
}



export default Prescription;

const styles = StyleSheet.create({
  pre_style1: {
    alignItems: "flex-start",
    margin: 10,
  },
  pre_style2: { width: 100, justifyContent: "center" },
  pre_style3: { color: colors.theme_fg_two, fontSize: 30 },
  pre_style4: { margin: 5 },
  pre_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  pre_style6: { margin: 20 },
  pre_style7: { width: "30%" },
  pre_style8: { height: 30, width: 30 },
  pre_style9: { flex: 1, width: undefined, height: undefined },
  pre_style10: { width: "100%",fontSize: 14,color:'grey',marginTop:2 },
  pre_style11: { fontFamily: font_description,fontSize: 15 ,fontWeight:'bold',color:'black',marginLeft:-3,marginBottom:5},
  pre_style12: { margin: 1 },
  pre_style13: { fontSize: 13, fontFamily: font_description },
  pre_style14: { color: colors.red },
  pre_style15: { color: colors.theme_fg },
  pre_style16: { height: 250, marginTop: "20%" },
  pre_style17: { alignSelf: "center", fontFamily: font_title,color:'grey' },

  header: {
    justifyContent: "flex-start",
    height: "10%",
    backgroundColor: colors.theme_bg,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  header_card: {
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
  },
  header_card_item: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowOffset: { width: 0, height: 15 },
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
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    color: colors.theme_fg_two,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: font_title,
  },
  footer: {
    backgroundColor: "transparent",
  },
  footer_container: {
    width: "100%",
    backgroundColor: colors.theme_bg,
  },
  view_cart_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  view_cart: {
    color: colors.theme_fg_three,
    fontWeight: "bold",
  },
});
