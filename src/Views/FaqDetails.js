import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { Container, Header, Content, List, ListItem, Left,
// Body, Right, Title, Button, Icon, Row,Col,Card, CardItem, Footer, View } from 'native-base';
import {api_url, faq, font_title, font_description} from '../config/Constant';
// import Accordian from '../config/Accordian';

import back from '../assets/icons/back1.png';
import * as colors from '../assets/css/Colors';
// import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { fb } from '../config/firebaseConfig';
// import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/FaqActions';

export default class FaqDetails extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      data: this.props.route.params.data,
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View>
        <View>
          <View style={styles.detail_style1}>
            <TouchableOpacity
              style={styles.detail_style2}
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
            <View style={styles.detail_style4} />
            <Text style={styles.detail_style5}>Faq Details</Text>
          </View>
        </View>
        <View style={styles.detail_style6} />
        <View>
          <View>
       
              <View>
                <Text>{this.state.data.answer}</Text>
              </View>
        
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detail_style1: {alignItems: 'flex-start', margin: 10},
  detail_style2: {width: 100, justifyContent: 'center'},
  detail_style3: {color: colors.theme_fg_two, fontSize: 30},
  detail_style4: {margin: 5},
  detail_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  detail_style6: {margin: 20},

  container: {
    alignItems: 'center',
  },
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
  faq_title: {
    color: colors.theme_fg_two,
    fontFamily: font_title,
    fontSize: 15,
    fontFamily: font_title,
  },
});
