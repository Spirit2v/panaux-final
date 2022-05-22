import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity,Image, Text,View,FlatList } from 'react-native';
// import { Container, Header, Content, List, ListItem, Left, Body, Right, Title, Button, Icon, Row,Col,Card, CardItem, Footer, View } from 'native-base';
import { api_url1, faq, font_title, font_description } from '../config/Constant';
// import Accordian from '../config/Accordian';
import Icon from 'react-native-vector-icons/Ionicons';

import back from "../assets/icons/back1.png";
import * as colors from '../assets/css/Colors';
// import { Loader } from '../components/GeneralComponents';
import axios from 'axios';


class Faq extends Component<Props> {

  constructor(props) {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.Faq();
      this.state={faqArray:[]}
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  faq_details = (data) => {
    this.props.navigation.navigate('FaqDetails',{ data : data });  
  }

  Faq = async () => {
    // this.props.serviceActionPending();
    await axios({
      method: 'get', 
      url: ` ${api_url1}/faq`
    })
    .then(async response => {
        // await this.props.serviceActionSuccess(response.data);
        this.setState({faqArray:response.data.PrivacyPolicy});
        console.log(response.data.PrivacyPolicy);
    })
    .catch(error => {
        this.props.serviceActionError(error);
    });
  }


  render() {

    const { isLoding, error, data, message, status } = this.props

    return (
      <View>
        <View>
          <View style={styles.faq_style1}>
            <TouchableOpacity style={styles.faq_style2} onPress={this.handleBackButtonClick} activeOpacity={1} >
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
            <View style={styles.faq_style4} />
            <Text style={styles.faq_style5}>Faq</Text>
          </View>
        </View>
        <View>
          <View>
            <View
            style={{height:12}}
            />
            <FlatList
           inverted={true}
              data={this.state.faqArray}
              renderItem={({ item,index }) => (
             
             <TouchableOpacity
             onPress={() => this.faq_details(item)}>
       
           <View
           style={{flexDirection:'row',height:52,borderTopWidth:.3,borderColor:'grey',justifyContent:'center',alignContent:'center',alignItems:'center'}}
           >

           <Icon style={{marginTop:3}} name="ios-arrow-forward" />
                    <Text style={styles.faq_style6} >{item.title}</Text>
           </View>
     
                 
                  
             </TouchableOpacity>
    
              )}

              // <FlatList
              // inverted={true}
              //    data={this.state.faqArray}
              //    renderItem={({ item,index }) => (
              keyExtractor={item => item.question}
            />
          </View>
        </View>
        {/* <Loader visible={isLoding} /> */}
      </View>
    );
  }
}



export default Faq;

const styles = StyleSheet.create({
  faq_style1:{alignItems:'flex-start', margin:10},
  faq_style2:{width:100, justifyContent:'center'},
  faq_style3:{color:colors.theme_fg_two, fontSize:30},
  faq_style4:{margin:5},
  faq_style5:{fontSize:25, color:colors.theme_fg_two, fontFamily: font_title},
  faq_style6:{color: colors.theme_fg_two,fontFamily:font_title,fontSize: 15},
  faq_style7:{color:colors.theme_fg_two},
  
  container: {
    alignItems: 'center'
  },
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
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  title:{
    alignSelf:'center', 
    color:colors.theme_fg_two,
    alignSelf:'center', 
    fontSize:16, 
    fontFamily:font_title,
  },
  
});
