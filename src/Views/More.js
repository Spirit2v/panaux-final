import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
// import {
//   Container,
//   Content,
//   Left,
//   Body,
//   Right,
//   Icon,
//   List,
//   ListItem,
//   Button,
// } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import * as colors from '../assets/css/Colors';
// import { Divider } from "../components/GeneralComponents";
import {menus, font_description, font_title} from '../config/Constant';
import Dialog from 'react-native-dialog';

export default class More extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
    };
  }

  navigate = route => {
    if (route == 'Logout') {
      this.showDialog();
    } else if (route == 'AddressList') {
      this.props.navigation.navigate(route, {from: 'More'});
    } else {
      this.props.navigation.navigate(route);
    }
  };

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  closeDialog = () => {
    this.setState({dialogVisible: false});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  handleLogout = async () => {
    await this.closeDialog();
    await this.props.navigation.navigate('Logout');
  };

  render() {
    return (
      <>
        <View style={styles.more_style2}>
          <Text style={styles.more_style3}>More</Text>
        </View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>Do you want to logout?.</Dialog.Description>
          <Dialog.Button label="Yes" onPress={this.handleLogout} />
          <Dialog.Button label="No" onPress={this.handleCancel} />
        </Dialog.Container>

        <FlatList
          data={menus}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                borderTopWidth: 0.3,
                paddingTop: 1,
                borderColor: 'grey',
                alignContent:'center',
                // justifyContent:'center',
                // alignItems:'center',
            paddingBottom:-2,
        paddingTop:20
              }}
              onPress={() => this.navigate(item.route)}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  active
                  name={item.icon}
                  size={24}
                  color="#0c0a8d"
                  style={{width: 50, height: 50}}
                />

                <Text style={styles.more_style6}>{item.menu_name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.menu_name}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  more_style1: {backgroundColor: colors.theme_bg_two},
  more_style2: {backgroundColor: colors.theme_bg_three, padding: 10},
  more_style3: {
    fontSize: 16,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  more_style4: {backgroundColor: colors.theme_bg_three},
  more_style5: {backgroundColor: colors.theme_bg},
  more_style6: {
    fontSize: 16,
    color: colors.theme_fg_two,
    fontFamily: font_description,
    marginLeft: -12,
    marginBottom:-32
  },
});
