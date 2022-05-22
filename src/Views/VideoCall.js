import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import RNCallKeep from 'react-native-callkeep';

import AgoraUIKit from 'agora-rn-uikit';

import { Container, Header, Content, List, ListItem, Left, Body, Right, Title, Icon, Row, Col } from 'native-base';

import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import * as colors from '../assets/css/Colors';
import { api_url, get_access_token_for_video } from '../config/Constant';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
export default class VideoCall extends Component {

   constructor(props) {
    super(props)
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      call: this.props.route.params.call,
      isVideoEnabled: true,

    }
     }
     componentDidMount(){
      RNCallKeep.setup(options).then(accepted => {});

     }

  getAccessTokenFromServer = async () => {
    this.setState({ isLoading : true });
      await axios({
      method: "get",
      url: api_url + get_access_token_for_video+'/'+this.state.booking_id
      })
      .then(async (response) => {
        this.setState({ isLoading : false });
        this.refs.twilioVideo.connect({ roomName: this.state.booking_id.toString(), accessToken: response.data.result, status: 'connecting' })
      })
      .catch((error) => {
       this.setState({ isLoading : false });
      });
  };

  
   render() {
    const options = {
      ios: {
        appName: 'My app name',
      },
      android: {
        alertTitle: 'Permissions required',
        alertDescription: 'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'phone_account_icon',
        additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
        // Required to get audio in background when using Android 11
        foregroundService: {
          channelId: 'com.company.my',
          channelName: 'Foreground service for my app',
          notificationTitle: 'My app is running on background',
          notificationIcon: 'Path to the resource icon of the notification',
          selfManaged: true
        }, 
      }
    };
    const rtcProps = {
      appId: '36e2c78fc33940ab84a863c6d7b013a6',
      channel: 'panaux1',
      token: this.state.call
      };
    const callbacks = {
      EndCall: () => this.setState({isVideoEnabled:false}),
    };
    return (

<View>
{this.state.isVideoEnabled ?
  <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  
:
this.props.navigation.goBack()

}

</View>
    );
  }
}

const styles = StyleSheet.create({
  vid_style1:{flex: 1,backgroundColor: 'white'},
  vid_style2: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0
  },
  vid_style3: {
    flex: 1,
    flexDirection: "row",
    flexWrap: 'wrap'
  },
  vid_style4: {
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    height: '100%',
  },
  vid_style5: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    backgroundColor: 'transparent',
    flexDirection: "row",
    alignItems: "center"
  },
  vid_style6:{ alignItems:'center', justifyContent:'center'},
  vid_style7: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: "center"
  },
  vid_style8:{color:colors.theme_fg_three},
  vid_style9:{color:colors.theme_fg_three},
  vid_style10:{ alignItems:'center', justifyContent:'center'},
  vid_style11: {
    width: 70,
    height: 70,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: "center"
  },
  vid_style12:{color:colors.theme_fg_three},
  vid_style13:{alignItems:'center', justifyContent:'center'},
  vid_style14: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: "center"
  },
  vid_style15:{color:colors.theme_fg_three},
  vid_style16: {
    flex: 1,
    width: 130,
    height: 200,
    position: "absolute",
    right: 10,
    bottom: 100
  },
  
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginTop: 100
  },
  
});

AppRegistry.registerComponent('VideoCall', () => VideoCall);