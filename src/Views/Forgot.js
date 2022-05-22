import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,Button,StatusBar
} from "react-native";

import Snackbar from "react-native-snackbar";
// import Modal from "react-native-modal";
import {
  api_url1,
  height_60,
  height_20,
  forgot,
  forgot_password,
  logo,
  font_title,
  font_description,
} from "../config/Constant";
import Icon from 'react-native-vector-icons/Ionicons';
// import { StatusBar, Loader } from "../components/GeneralComponents";
import axios from "axios";
// import { connect } from "react-redux";
// import {
//   serviceActionPending,
//   serviceActionError,
//   serviceActionSuccess,
// } from "../actions/ForgotActions";
import back from "../assets/icons/back1.png";
import * as colors from "../assets/css/Colors";
// import CodeInput from "react-native-confirmation-code-input";
// import { Input } from "react-native-elements";
// import { subTotal } from "../actions/CartActions";

class Forgot extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: "",
      validation: true,
      isModalVisible: false,
      isLoding: false,
    };
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  forgot_password = async () => {
    if (this.state.email == "") {
      
      this.showSnackbar("Please enter email address");
      this.setState({ isLoding: false });
   
    }
    else{

      this.setState({ isLoding: true });
      Keyboard.dismiss();
      await this.checkValidate();
      if (this.state.validation) {
  
      //   this.props.serviceActionPending();
        await axios
          .post(
            "https://desi-health-api.herokuapp.com/api/clients/forgotPassword",
            {
              email:this.state.email,
            }
          )
  
  
          .then(async (response) => {
            console.log(response.data);
            await this.props.serviceActionSuccess(response.data);
          
          
            
            // await this.otp();
            alert(response.data.message);
            if(response.data.status=="success"){  this.props.navigation.navigate("Login")};
            this.setState({ isLoding: false });
          })
          .catch((error) => {
            alert("Something didnt work");
            console.log(error.data.message);
            this.setState({ isLoding: false });
            
            this.props.serviceActionError(error);
          });
        }
    
    }
  };

  // otp() {
  //   this.props.navigation.navigate("Otp");
  //   if (this.props.status == 1) {
  //   } else {
  //     alert(this.props.message);
  //   }
  // }

  checkValidate=()=> {
    if (this.state.email == "") {
      this.state.validation = false;
      this.showSnackbar("Please enter email address");
      this.setState({ isLoding: false });
      return true;
    }
  }

  showSnackbar=(msg)=> {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    const { isLoding, error, data, message, status } = this.props;

    return (
      <View style={styles.for_style1}>
        <View>
          <StatusBar />
        </View>
        {/* <Loader visible={isLoding} />*/}
          {/* <Loader visible={this.state.isLoding}/> */}
        <View>
          <View style={styles.for_style2}>
            <TouchableOpacity
              style={styles.for_style3}
              onPress={this.handleBackButtonClick}
              activeOpacity={1}
            >
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
            <View style={styles.for_style5} />
            <Text style={styles.for_style6}>Forgot password</Text>
          </View>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.for_style7}>
            <View style={styles.for_style8} />
            <View style={styles.for_style9}>
              <Image style={styles.for_style10} source={forgot_password} />
            </View>
            <View style={styles.for_style11} />
            <View style={styles.for_style12}>
              <Text style={styles.for_style13}>
                We just need your registered E-Mail Address to send you a new
                password
              </Text>
            </View>
            <View style={styles.for_style14} />

            <View style={styles.for_style15}>
            <Icon
                    name="mail"
                    size={20}
                    color="black"
                    style={{marginTop:14,marginRight:12}}
                  />
            <TextInput
                style={{color:'grey'}}
                placeholder="adcb@gmail.com"
                keyboardType="email-address"
                placeholderTextColor={'grey'}
                onChangeText={(TextInputValue) =>
                  this.setState({ email: TextInputValue })
                }
                // value={text}
              />
             </View>
            <View style={styles.for_style19} />

            <View style={styles.for_style20}>
              <Button
                title="GET PASSWORD"
                style={styles.for_style21}
                onPress={this.forgot_password}
                color={"#0c0a8d"}
            />
            </View>
            <View style={styles.for_style23} />
          </View>
        </ScrollView>
      </View>
    );
  }
}


export default Forgot;
const styles = StyleSheet.create({
  for_style1: { flex: 1, flexDirection: "column" },
  for_style2: { alignItems: "flex-start", margin: 10 },
  for_style3: { width: 100, justifyContent: "center" },
  for_style4: { color: colors.theme_fg_two, fontSize: 30 },
  for_style5: { margin: 5 },
  for_style6: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  for_style7: { height: "80%", justifyContent: "center", alignItems: "center" },
  for_style8: { marginTop: "20%" },
  for_style9: { height: 120, width: 120 },
  for_style10: { flex: 1, width: undefined, height: undefined },
  for_style11: { marginTop: "10%" },
  for_style12: { width: "80%" },
  for_style13: {
    color: 'grey',
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    fontFamily: font_description,
  },
  for_style14: { marginTop: "5%" },
  for_style15: { width: "80%", alignSelf: "center",flexDirection:'row',borderBottomColor:'grey',borderBottomWidth:.5 },
  for_style16: { fontSize: 14, fontFamily: font_description },
  for_style17: { fontFamily: font_title },
  for_style18: { color: colors.theme_bg },
  for_style19: { marginTop: "5%" },
  for_style20: { width: "80%", alignSelf: "center" },
  for_style21: {
    backgroundColor: colors.theme_bg,
    borderRadius: 5,
    height: 40,
  },
  for_style22: {
    color: colors.theme_fg_three,
    fontFamily: font_title,
    letterSpacing: 0.5,
  },
  for_style23: { marginTop: "2%" },

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
  footer: {
    height: "10%",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    bottom: 0,
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
  text_field: {
    height: 40,
    borderBottomColor: colors.theme_bg,
    borderBottomWidth: 1.5,
    padding: 5,
    fontFamily: font_description,
  },
  forgot_password_container: {
    width: "95%",
    alignItems: "flex-end",
  },
  forgot_text: {
    fontSize: 15,
    color: colors.theme_fg_four,
    fontFamily: font_description,
  },
  forgot_password_container: {
    width: "80%",
    alignItems: "flex-end",
  },
  forgot_text: {
    fontSize: 15,
    color: colors.theme_fg_four,
    fontFamily: font_description,
  },
  signin_text: {
    fontSize: 15,
    color: colors.theme_bg,
    marginTop: "8%",
    fontFamily: font_description,
  },
});
