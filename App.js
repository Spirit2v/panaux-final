//working apk

import {View, Text} from 'react-native';
import React,{useEffect} from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/Views/Home';
import Home12 from './src/Views/Home12';
import Home1 from './src/Views/Home1';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Pharmacy from './src/Views/Pharmacy';
import PharmacyDetail from './src/Views/PharmacyDetail';
import MyOrders from './src/Views/MyOrders';
import Prescription from './src/Views/Prescription';
import ViewPrescription from './src/Views/ViewPrescription';
import More from './src/Views/More';
import {NativeBaseProvider, Box} from 'native-base';
import Appointment from './src/Views/Appointment';
import Login from './src/Views/Login';
import Logout from './src/Views/Logout';
import Register from './src/Views/Register';
import Register1 from './src/Views/Register1';
import Register2 from './src/Views/Register2';
import Profile from './src/Views/Profile';
import DoctorSymptoms from './src/Views/DoctorSymptoms';
import DoctorList from './src/Views/DoctorList';

import Address from './src/Views/Address';
import AddressList from './src/Views/AddressList';
import AddressMap from './src/Views/AddressMap';
import AddressEnter from './src/Views/AddressEnter';
import AddressEnter2 from './src/Views/AddressEnter2';
import Faq from './src/Views/Faq';
import FaqDetails from './src/Views/FaqDetails';
import PrivacyPolicy from './src/Views/PrivacyPolicy';
import BookingDetail from './src/Views/MyBookingDetails';
import VideoCall from './src/Views/VideoCall';
import Forgot from './src/Views/Forgot';

import OrderDetail from './src/Views/OrderDetails';
import Order from './src/Views/Order';
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Splash from './src/Views/Splash';
import { doctor_details, login } from './src/config/Constant';
import Wallet from './src/Views/Wallet';
import Walletadd2 from './src/Views/Walletadd2';
import DoctorDetail from './src/Views/DoctorDetail'
import CreateAppointment from './src/Views/CreateAppointment';
import CreateAppointment2 from './src/Views/CreateAppointment2'
import Payment from './src/Views/Payment';
import Diagnostic from './src/Views/Diagnostic';
import SplashScreen from 'react-native-splash-screen';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const Tab1 = createMaterialTopTabNavigator();
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  // changeIcon('panaux');
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash">
        <Stack.Screen name="Main" component={MyTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Register1" component={Register1} />
        <Stack.Screen name="Register2" component={Register2} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Diagnostic" component={Diagnostic} />
        <Stack.Screen name="WalletAdd" component={Walletadd2} />
        <Stack.Screen name="DoctorDetail" component={DoctorDetail} 
           options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <Stack.Screen name="CreateAppointment" component={CreateAppointment} />
       <Stack.Screen name="CreateAppointment2" component={CreateAppointment2} />
       <Stack.Screen name="PharmacyDetail" component={PharmacyDetail} />
       <Stack.Screen name="OrderDetails" component={OrderDetail} />
       <Stack.Screen name="Payment" component={Payment} />
       <Stack.Screen name="ViewPrescription" component={ViewPrescription} />
       <Stack.Screen name="Logout" component={Logout} />
       <Stack.Screen name="Profile" component={Profile} />
 <Stack.Screen name="AddressList" component={AddressList} />
  <Stack.Screen name="AddressEnter" component={AddressEnter} />
  <Stack.Screen name="AddressEnter2" component={AddressEnter2} />
   <Stack.Screen name="Home12" component={Home12} />
    <Stack.Screen name="AddressMap" component={AddressMap} />
     <Stack.Screen name="Faq" component={Faq} /> 
       <Stack.Screen name="FaqDetails" component={FaqDetails}/>
       <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="BookingDetail" component={BookingDetail} />
         <Stack.Screen name="VideoCall" component={VideoCall} />
          <Stack.Screen name="Forgot" component={Forgot} />
           <Stack.Screen
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
           name="DoctorSymptoms" component={DoctorSymptoms} />
            <Stack.Screen name="DoctorList" component={DoctorList} />
             <Stack.Screen name="Home1" component={Home1} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTab1() {
  return (
    <Tab1.Navigator>
        <Tab1.Screen name="My Appointment" component={Appointment} />
      <Tab1.Screen name="My Orders" component={Order} />
    
    </Tab1.Navigator>
  );
}
function MyTabs() { 
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{  fontFamily: 'GoogleSans-Medium',backgroundColor: '#0c0a8d' }}
    
      tabBarOptions={{
        labeled:true,
        showLabel: true,
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#bfbfbf',
        labelStyle: {fontFamily: 'GoogleSans-Medium',color:'white'}, 
        
        style: {
          backgroundColor: '#0c0a8d',
          fontFamily: 'GoogleSans-Medium',
        },
       
      }}
      labeled="true"
      tabBarLabel={true}
      >
      <Tab.Screen
        name="Home"
        labeled={true}
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
           
            <Ionicons name="ios-home" size={21} color="white" />
       
          ),
        }}
      />
      <Tab.Screen
        name="Pharmacy"
        component={Pharmacy}
        options={{
          tabBarLabel: 'Pharmacy',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-medkit" color={color} size={21} />
         
          ),
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyTab1}
        options={{
          tabBarLabel: 'MyOrders',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-list" color={color} size={21} />
     
          ),
        }}
      />
      <Tab.Screen
        name="Prescription"
        component={Prescription}
        options={{
          tabBarLabel: 'Prescription',
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-document" color={color} size={21} />
       
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <Icon name="ellipsis-horizontal-outline" color={color} size={21} />
            
          ),
        }}
      />
    </Tab.Navigator>
  );
}
