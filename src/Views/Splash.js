import React, { Component } from "react";
import { Image, View, StyleSheet, Text, ImageBackground,StatusBar,Dimensions  } from "react-native";
import { CommonActions } from "@react-navigation/native";
import {
  api_url,
  splash,
  settings,
  app_name,
  font_description,
  font_title,
} from "../config/Constant";
import * as colors from "../assets/css/Colors";
import {  Loader } from "../components/GeneralComponents";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import pana from "../assets/icons/Panaux-Logo2.png";

class Splash extends Component<Props> {
  constructor(){
    super()
    this.state={
      toke:""
    }
  }
  async componentDidMount() {

    setTimeout(async() => {
    
      // await this.checkToken();
      // await this.settings();
      await this.home();
  }, 2000);
  

  }


  checkToken = async () => {
    //get the messeging token
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    global.username = await AsyncStorage.getItem("username");
    

    if (!fcmToken) {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      global.fcm_token = fcmToken;
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      );
    }
  };



  home = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    global.fcm_token=fcmToken;
console.log( `global ${global.fcm_token}`);
    const user_id = await AsyncStorage.getItem("user_id");
    const customer_name = await AsyncStorage.getItem("customer_name");
    const phone_number = await AsyncStorage.getItem("phone_number");
    const email = await AsyncStorage.getItem("email");
    if ( fcmToken  !== null) {
      global.id = user_id;
      global.customer_name = customer_name;
      global.phone_number = phone_number;
      global.email = email;
      global.fcm_token=fcmToken
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      );
    } else {
      global.id = "";
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }
  };

  render() {
  
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 21,
        }}
      
      >
                <StatusBar
          barStyle = "dark-content"
          hidden = {false}
          backgroundColor = 'white'
          translucent = {false}
          networkActivityIndicatorVisible = {true}
        />
      
        <Image
          source={pana}

          style={{ height: windowHeight/4-32, width:windowWidth-24 ,marginRight:"5%"}}

        />
      
      </View>
    );
  }
}


export default Splash;

const styles = StyleSheet.create({
  spl_style1: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.theme_bg,
    justifyContent: "center",
  },
  spl_style2: {
    fontFamily: font_title,
    fontSize: 50,
    color: colors.theme_fg_three,
    letterSpacing: 2,
    textAlign: "center",
  },
  spl_style3: {
    borderWidth: 0.5,
    borderColor: colors.theme_fg_three,
    margin: 5,
  },
  spl_style4: {
    fontFamily: font_description,
    fontSize: 18,
    color: 'black',
    // letterSpacing: 3,
  },
});
