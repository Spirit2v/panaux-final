import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Button} from 'react-native';
import axios from 'axios';
import {
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Col,
  Row,
  Title,
  Icon,
  Thumbnail,
  Picker,
} from 'native-base';
import RazorpayCheckout from 'react-native-razorpay';
import {
  api_url,
  height_35,
  height_40,
  get_profile,
  profile_update,
  profile_picture,
  font_description,
  font_title,
  get_blood_list,
  api_url1,
} from '../config/Constant';
import {  Loader } from "../components/GeneralComponents";
import * as colors from '../assets/css/Colors';
export default class WalletAdd2 extends Component {
  constructor(props) {
    super(props);
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.open_dialog = this.open_dialog.bind(this);
    // this.add_wallet = this.add_wallet.bind(this);
    this.state = {
      data: this.props.route.params.data,
      loaderValue: false,
      razorId: '',
      razorpay_order_id: '',
      razorpay_payment_id: '',
      razorpay_signature: '',
    };
    // this.get_wallet();
  }
  razor = id => {
    var options = {
      currency: 'INR',
      key: 'rzp_test_GVJRdB4KaByL9z',
      amount: this.state.data,
      name: 'global.application_name',
      description: 'test description',
      order_id: id,
      // prefill: {
      //   email: "asdf@asdf.com",
      //   contact: "global.phone_number",
      //   name: "global.customer_name",
      // },
      // theme: { color: colors.theme_fg },
    };
    RazorpayCheckout.open(options)
      .then(async data => {
        console.log(data);
        this.setState({
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
        });

        //
        await axios
          .patch(
            `${api_url1}/wallet/client/deposite`,

            {
              razorpay_order_id: data.razorpay_order_id,
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_signature: data.razorpay_signature,
            },
            {headers: {Authorization: `Bearer ${global.fcm_token}`}},
          )
          .then(res => {
            console.log(res);
            alert(`₹ ${this.state.data} Added to wallet`)
          });
      })
      .catch(error => {
        alert(error);
      });
  };

  deposit = async () => {
    await axios
      .post(
        `${api_url1}/wallet/client/deposite`,

        {
          razorpay_order_id: data.razorpay_order_id,
          razorpay_payment_id: data.razorpay_payment_id,
          razorpay_signature: data.razorpay_signature,
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res);

        // this.props.navigation.navigate("More");
        // alert(`Rs ${this.state.data} Added Successfully`);
        // this.setState({loaderValue:false,razorId:res.data.razorpayOrder.id});
        // this.razor(res.data.razorpayOrder.id);
      })
      .catch(error => {
        alert(error);
        this.setState({loaderValue: false});
      });
  };
  newConfirm = async () => {
    this.setState({loaderValue: true});
    await axios
      .post(
        `${api_url1}/wallet/client/deposite`,

        {
          amount: this.state.data,
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res.data.razorpayOrder.id);

     
        this.setState({loaderValue: false, razorId: res.data.razorpayOrder.id});
        this.razor(res.data.razorpayOrder.id);
        this.props.navigation.navigate('More');
        alert('Money added successfully');
        // this.setState({loaderValue: false});
      })
      .catch(error => {
        alert(error);
        this.setState({loaderValue: false});
      });
  };
  confirm = async () => {
    let keyVar = Math.random();

    this.setState({loaderValue: true});
    await axios
      .post(
        `${api_url1}/wallet/client/deposite`,

        {
          amount: this.state.data,
          referenceId: Math.random(),
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res.data);

        this.props.navigation.navigate('More');
        alert(`Rs ${this.state.data} Added Successfully`);
        this.setState({loaderValue: false});
      })
      .catch(error => {
        alert(error);
        this.setState({loaderValue: false});
      });


  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Loader visible={this.state.loaderValue} />
        <Text style={{fontSize: 20,color:'grey'}}>Do you wanna proceed to add this </Text>
        <Text style={{fontSize: 20,color:'grey'}}>
          amount to Wallet : {this.state.data}{' '}
        </Text>

        <TouchableOpacity
          style={{paddingHorizontal: -23, marginVertical: 23, width: '40%'}}
          onPress={this.confirm}>
          <View>


            <Button
              onPress={this.newConfirm}
              title="Confirm"
              color={colors.theme_bg}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
