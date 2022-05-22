import { Text, View ,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { NativeBaseProvider, Box,Tabs,Tab,
  TabHeading,
  Icon,} from "native-base";


import * as colors from "../assets/css/Colors";


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
} from "../config/Constant";




























export default class MyOrders extends Component {
  render() {
    return (
      <View>
        
      </View>
    )
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
