import React, {Component} from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Content, Container, Header, Body, Title, Left,  Row, Icon, Right, Button as Btn, Card } from 'native-base';
import * as colors from '../assets/css/Colors';
import {  logo_with_name, font_title, font_description } from '../config/Constants';
import back from "../assets/icons/back1.png";
import { StatusBar } from '../components/GeneralComponents';
import { Button, Divider } from 'react-native-elements';
import { app_name } from '../config/Constants';
import wallet from '../assets/icons/wallet.png'

class ContactUs extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick= () => {
    this.props.navigation.goBack(null);
  }

  show_alert(message){
    this.dropDownAlertRef.alertWithType('error', 'Error',message);
  }

  render() {
    return (
      <Container>
        <View>
          <View style={styles.con_style1}>
            <TouchableOpacity style={styles.con_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
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
            <View style={styles.con_style4} />
            <Text style={styles.con_style5}>Contact Us</Text>
          </View>
        </View>

        <Content padder>
          <View style={styles.con_style6} />
          <Row>
            <Body>
                <View style={styles.con_style7}>
                  <Image
                    style= {styles.con_style8}
                    source={logo_with_name}
                  />
                </View>
            </Body>
          </Row>
          <Divider style={styles.con_style9} />
          <View style={styles.con_style10} />
          <Row>
            <Text style={styles.con_style11}>Contact details</Text>
          </Row>
          <View style={styles.con_style12} />
          <Row>
            <Icon style={styles.con_style13} name='call' /><Text style={styles.con_style14}>{global.admin_phone}</Text>
          </Row>
          <View style={styles.con_style15} />
          <Row>
            <Icon style={styles.con_style16} name='mail' /><Text style={styles.con_style17}>{global.admin_email}</Text>
          </Row>
          <View style={styles.con_style18} />
          <Row>
            <Icon style={styles.con_style19} name='pin' /><Text style={styles.con_style20}>{global.admin_address}</Text>
          </Row>
        </Content>
      </Container>
    );
  }
}

export default ContactUs;

const styles = StyleSheet.create({
  con_style1:{alignItems:'flex-start', margin:10},
  con_style2:{width:100, justifyContent:'center'},
  con_style3:{color:colors.theme_fg_two, fontSize:30},
  con_style4:{margin:5},
  con_style5:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  con_style6:{margin:10},
  con_style7:{height:100,width:100},
  con_style8:{flex:1 , width: undefined, height: undefined, borderRadius:50},
  con_style9:{marginTop:20,marginBottom:20},
  con_style10:{margin:10},
  con_style11:{fontSize:18, fontFamily:font_title, color:colors.theme_fg_two},
  con_style12:{margin:10},
  con_style13:{fontSize:18, marginRight:10},
  con_style14:{fontSize:14, color:colors.theme_fg_four},
  con_style15:{margin:5},
  con_style16:{fontSize:18, marginRight:10},
  con_style17:{fontSize:14, color:colors.theme_fg_four},
  con_style18:{margin:5},
  con_style19:{fontSize:18, marginRight:10},
  con_style20:{fontSize:14, color:colors.theme_fg_four},
 
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

  icon:{
    color:colors.theme_fg_two
  },
  flex_1:{
    flex: 1
  },
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  title:{
    alignSelf:'center', 
    color:colors.theme_fg_two,
    alignSelf:'center', 
    fontSize:20, 
    fontFamily:font_title
  },
  margin_20:{
    margin:20
  },
  margin_10:{
    margin:10
  },
  margin_50:{
    margin:50
  },
  padding_20:{
    padding:20
  },
  
});
