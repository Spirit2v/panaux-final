import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Button,
  ScrollView,
} from 'react-native';
// import Geocoder from "react-native-geocoder";
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// import opencage from "opencage-api-client";
import {Marker} from 'react-native-maps';
import {
  api_url1,
  address_list,
  address_delete,
  img_url,
  last_active_address,
  font_title,
  font_description,
  no_address_lottie,
} from '../config/Constant';
import * as colors from '../assets/css/Colors';
// import { Button } from "react-native-elements";
// import { address } from "../config/Constants";

export default class AddressMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      latitude: 0,
      longitude:0,
      coords: '',
      address1: '',
    };

    this.handleUserNavigation();
  }

  componentDidMount() {
    this.handleUserNavigation();
    this.requestLocationPermission();
  }
  async componentDidMount() {
    await this.requestLocationPermission;
    if (Platform.OS === 'android') {
      this.requestLocationPermission();
      this.handleUserNavigation();
    } else {
      this.handleUserNavigation();
    }
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        // alert("You can use the location");
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  _getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        this.setState({error: error.message});
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
    );
  };
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'MyMapApp needs access to your location',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this._getCurrentLocation();
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  handleUserNavigation = async () => {
    try {
      await Geolocation.getCurrentPosition(info => {
        this.setState({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          coords: info.coords,
        });

        console.log(info);
      });
    } catch (err) {
      alert(err);
    }
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={false}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.03,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title={'Home'}
            description={this.state.address}
          />
        </MapView>
        <View
          style={{
            height: '20%',
            paddingHorizontal: -22,
          }}>
         
          <Text style={{marginLeft:-102}}>
            Accuracy:({this.state.coords.accuracy}) {"\n"}
            Your location : {this.state.latitude} , {this.state.longitude}
          </Text>
          <Button
            title="Next"
            color="#0c0a8d"
            onPress={() => this.props.navigation.navigate('AddressEnter')}
          />
          <View
          style={{height:12}}
          />
          <View
          style={{width:'83%'}}
          >
          <Button
            title="Add your friend location"
            color="#0c0a8d"
            style={{width:234}}
            width={234}
            onPress={() => this.props.navigation.navigate('AddressEnter2')}
          />
          </View>
          
               {/* <Text style={{ fontSize: 20,color:'black' }}>
               Accuracy:({this.state.coords.accuracy})    Your location : {this.state.latitude} , {this.state.longitude}
          </Text> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    flex: 1,
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '80%',
  },
});
