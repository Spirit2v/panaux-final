import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React,{Component} from 'react';
import {
  img_url,
  api_url,
  font_title,
  font_description,
  home_details,
  get_doctors,
  api_url1,
} from '../config/Constant';
import back from '../assets/icons/back1.png';
import * as colors from '../assets/css/Colors';
import DiagnosticButton from '../components/DiagnosticButton';


export default class Diagnostic extends Component {
  render() {
    return (
        <View>
        <View>
          <View style={styles.pre_style1}>
            <TouchableOpacity
              style={styles.pre_style2}
              onPress={()=>this.props.navigation.goBack()}
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
            <View style={styles.pre_style4} />
            <Text style={styles.pre_style5}>Diagnostic</Text>
          </View>
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <DiagnosticButton />
          <DiagnosticButton />
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <DiagnosticButton />
          <DiagnosticButton />
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <DiagnosticButton />
          <DiagnosticButton />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  pre_style1: {
    alignItems: 'flex-start',
    margin: 10,
  },
  pre_style2: {width: 100, justifyContent: 'center'},
  pre_style3: {color: colors.theme_fg_two, fontSize: 30},
  pre_style4: {margin: 5},
  pre_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  pre_style6: {margin: 20},
});
