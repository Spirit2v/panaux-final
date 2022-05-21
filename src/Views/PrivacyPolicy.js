import React, { Component } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image,Dimensions,ScrollView  } from "react-native";
import back from "../assets/icons/back1.png";
import RenderHtml from 'react-native-render-html';
// import {
//   Container,
//   Header,
//   Content,
//   Left,
//   Body,
//   Right,
//   Title,
//   Button,
//   Icon,
//   Row,
//   Card,
// } from "native-base";
import * as colors from "../assets/css/Colors";
// import { Loader } from "../components/GeneralComponents";
import {
  api_url1,
  privacy,
  font_title,
  font_description,
} from "../config/Constant";
import axios from "axios";
// import { connect } from "react-redux";
// import {
//   serviceActionPending,
//   serviceActionError,
//   serviceActionSuccess,
// } from "../actions/PrivacyActions";
// import { ScrollView } from "react-native-gesture-handler";

class PrivacyPolicy extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.privacy_policy();
    this.state = {
      privacyy: "",
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  privacy_policy = async () => {
    // this.props.serviceActionPending();
    await axios({
      method: "get",
      url: ` ${api_url1}/privacy_policy`,
    })
      .then(async (response) => {
        this.setState({
          privacyy: response.data.PrivacyPolicy.content,
        });
        // console.log(response.data.PrivacyPolicy.content);
      })
      .catch((error) => {
        this.props.serviceActionError(error);
      });
  };

  render() {
    // const { isLoding, error, data, message, status } = this.props;
    // const { width } = useWindowDimensions();
    const windowWidth = Dimensions.get('window').width;
    
  const source = {
    html: this.state.privacy
  };
    return (
      <>
        {/* <WebView
      source={{
        uri: 'https://admin.panaux.com/privacy_policy'
      }}
      style={{ marginTop: 20 }}
    />  */}
        <View>
          <View>
            <View style={styles.pri_style1}>
              <TouchableOpacity
                style={styles.pri_style2}
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
              <View style={styles.pri_style4} />
              {/* <Text style={styles.pri_style5}>Privacy Policy</Text> */}
            </View>
          </View>
       
          <ScrollView
          style={{paddingHorizontal:12}}>
        <RenderHtml
      contentWidth={windowWidth-12}
      source={{html:this.state.privacyy}}
    />
    </ScrollView>
          {/* <Content style={styles.pri_style6}>
            <View>
              <Row>
                <Text style={styles.pri_style8}>{this.state.privacyy}</Text>
                {/* <Text style={styles.pri_style7}>{privacy}</Text> */}
              {/* </Row>
              <Row>
                <Text style={styles.pri_style8}>{this.state.privacyy}</Text>
              </Row>
              <View style={styles.pri_style9} />
            </View>
          // </Content> */} 
          {/* <Loader visible={isLoding} /> */}
        </View>

      </>
    );
  }
}



export default PrivacyPolicy;

const styles = StyleSheet.create({
  pri_style1: { alignItems: "flex-start", margin: 10 },
  pri_style2: { width: 100, justifyContent: "center" },
  pri_style3: { color: colors.theme_fg_two, fontSize: 30 },
  pri_style4: { margin: 5, },
  pri_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  pri_style6: { padding: 10 },
  pri_style7: { fontSize: 16, fontFamily: font_title, color: "#202028" },
  pri_style8: { fontSize: 13, marginTop: 5, fontFamily: font_description },
  pri_style9: { margin: 10 },

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
});
