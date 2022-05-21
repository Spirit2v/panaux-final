import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {Loader} from '../components/GeneralComponents';
import back from '../assets/icons/back1.png';
import {
  doctor_image,
  create_booking,
  api_url,
  font_title,
  font_description,
  check_available_timing,
  api_url1,
} from '../config/Constant';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
// import {
//   img_url,

//   font_title,
//   font_description,
//   home_details,
//   get_doctors,
//   api_url1,
// } from "../config/Constants";
export default class CreateAppointment2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingId: '',
      wallet: '',
      load: false,
      data: this.props.route.params.data,
      doctor_id: this.props.route.params.doctor,
      start_time: this.props.route.params.appointmentTime,
      title: this.props.route.params.title,
      description: this.props.route.params.description,

      appointmentMode: this.props.route.params.appointmentMode,
      amount: this.props.route.params.amount,
      loaderValue: false,
      razorpay_order_id: '',
      razorpay_payment_id: '',
      razorpay_signature: '',
    };
  }
  componentDidMount() {
    this.getWallet();
    this.ActualAmount();
  }

  ActualAmount = () => {
    // if(this.state.appointmentMode=='Online'){
    //   this.setState({
    //     amount:this.state.data.commission.online["fees"]
    //   });
    //   // mode1=this.state.data.commission.offline["fees"]
    //   }
    //   else{
    //     this.setState({
    //       amount:this.state.data.commission.offline["fees"]
    //     });
    //   }
  };

  check_validation2 = async () => {
    this.setState({loaderValue: true});
    // alert('here');
    await axios
      .post(
        `${api_url1}/doctor_booking/`,

        {
          doctor: this.state.doctor_id,
          description: this.state.description,
          title: this.state.title,
          appointmentTime: this.state.start_time,

          appointmentMode: this.state.appointmentMode,
          appointmentFees: this.state.amount,
          paymentType: 'paymentgateway',
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        // alert('Payment sucess')
        // console.log(res.data.razorpayOrder.id);
        // console.log(res.data.razorpayOrder.amount);
        this.check_validation3(
          res.data.razorpayOrder.id,
          res.data.razorpayOrder.amount,
        );
        // console.log(res.data.data._id);
        // this.setState({ bookingId:res.data.data._id,loaderValue: false });
        // this.props.navigation.navigate("MyOrders", { change: true });
        // alert("Appointment fixed");
        // this.Pay();
      })
      .catch(err => {
        console.log(err);
        this.setState({loaderValue: false});
      });
    // this.setState9({ loaderValue: false });
  };
  check_validation3 = (id, amount) => {
    var options = {
      currency: 'INR',
      key: 'rzp_test_GVJRdB4KaByL9z',
      amount: amount,
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
    RazorpayCheckout.open(options).then(async data => {
      console.log(data);
      this.setState({
        razorpay_order_id: data.razorpay_order_id,
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
      });
      this.razor();
      //  alert('sdvs');

      //   await axios
      //   .patch(
      //     `${api_url1}/api/doctor_booking`,{
      //       razorpay_order_id: data.razorpay_order_id,
      //       razorpay_payment_id: data.razorpay_payment_id,
      //       razorpay_signature: data.razorpay_signature,
      //     },
      //     {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      //   )
      //   .then(res => {
      //     console.log(res);
      //     alert('Success payment')
      //   }
      //   )

      // .catch(error => {
      // alert(error);
      // });

      //   //
    });
    // .catch(error => {
    //   alert(error);
    // });
  };
  //
  //   await axios
  //     .patch(
  //       `${api_url1}/api/doctor_booking`,

  //       {
  //         razorpay_order_id: data.razorpay_order_id,
  //         razorpay_payment_id: data.razorpay_payment_id,
  //         razorpay_signature: data.razorpay_signature,
  //       },
  //       {headers: {Authorization: `Bearer ${global.fcm_token}`}},
  //     )
  //     .then(res => {
  //       console.log(res);
  //     });
  // })

  razor = async () => {
    // alert(global.fcm_token);
    await axios
      .patch(
        `${api_url1}/doctor_booking`,
        {
          razorpay_order_id: this.state.razorpay_order_id,
          razorpay_payment_id: this.state.razorpay_payment_id,
          razorpay_signature: this.state.razorpay_signature,

          // razorpay_order_id: this.state.razorpay_order_id,
          // razorpay_payment_id: this.state.razorpay_payment_id,
          // razorpay_signature: this.state.razorpay_signature,
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        // console.log(res);
        alert('Success');
        this.props.navigation.navigate('MyOrders', {change: true});
        this.setState({loaderValue: false});
        global.appointmentAdd = true;
      })

      .catch(error => {
        this.setState({loaderValue: false});
        alert(error);
      });
  };

  check_validation = async () => {
    this.setState({loaderValue: true});
    // alert('here');
    await axios
      .post(
        `${api_url1}/doctor_booking/`,

        {
          doctor: this.state.doctor_id,
          description: this.state.description,
          title: this.state.title,
          appointmentTime: this.state.start_time,

          appointmentMode: this.state.appointmentMode,
          appointmentFees: this.state.amount,
          paymentType: 'wallet',
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        alert('Payment sucess');
        console.log(res.data.data._id);
        this.setState({bookingId: res.data.data._id, loaderValue: false});
        this.props.navigation.navigate('MyOrders', {change: true});
        alert('Appointment fixed');
        // this.Pay();
      })
      .catch(err => {
        console.log(err);
        this.setState({loaderValue: false});
      });
    // this.setState({ loaderValue: false });
  };

  Pay = async () => {
    this.setState({loaderValue: true});
    let keyVar = Math.random();

    // this.setState({loaderValue:true});
    await axios
      .post(
        `${api_url1}/wallet/client/payment`,

        {
          amount: this.state.amount,
          receiverId: this.state.data._id,
          receiverAccountType: 'DOCTOR',
          receiverEmail: this.state.data.email,
          referenceId: this.state.bookingId,
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        // console.log(res.data);
        this.setState({loaderValue: false});
      })
      .catch(error => {
        console.log(this.state.bookingId);
        alert(error);
        this.setState({loaderValue: false});
      });

    //    alert('')
  };

  getWallet = async () => {
    this.setState({loaderValue: true});
    await axios
      .get(`${api_url1}/wallet/client/CBalance`, {
        headers: {Authorization: `Bearer ${global.fcm_token}`},
      })
      .then(res => {
        console.log(res.data.data.balance);
        this.setState({wallet: res.data.data.balance, loaderValue: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loaderValue: false});
      });
    this.setState({load: true});
  };

  render() {
    return (
      <View style={{flex: 1, padding: 12}}>
        <Loader visible={this.state.loaderValue} />
        <View
          style={{
            alignItems: 'center',
            marginBottom: 23,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{width: 100, justifyContent: 'center'}}
            onPress={() => {
              this.props.navigation.goBack();
            }}
            activeOpacity={1}>
            <Image
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'white',
                marginVertical: 12,
              }}
              source={back}
            />
         
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              color: colors.theme_fg_two,
              fontFamily: font_title,
              marginLeft: -53,
            }}>
            Mode of Payment
          
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 23,
            fontFamily: font_description,
            color: 'black',
          }}>
          Amount to be paid : {this.state.amount}
          {}
        </Text>
        <TouchableOpacity style={{}} onPress={this.check_validation2}>
          <Text
            style={{
              height: 33,
              fontSize: 17,
              fontFamily: font_description,
              marginVertical: 12,
              color: 'blue',
              borderColor: 'grey',
              borderBottomWidth: 0.6,
            }}>
            1. Payment Gateway
          </Text>
        </TouchableOpacity>

        {this.state.wallet < this.state.amount ? (
          <View>
            <TouchableOpacity
            
              onPress={() => {
                this.props.navigation.navigate('Wallet');
              }}>
              <Text
                style={{
                  height: 33,
                  color: 'blue',
                  fontSize: 17,
                  fontFamily: font_description,
                  borderColor: 'grey',
                  borderBottomWidth: 0.6,
                }}>
                2. Pay using Wallet (Add Money)
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={{borderColor: 'grey', borderBottomWidth: 0.4}}
            
              onPress={this.check_validation}
           
            >
              <Text
                style={{
                  color: 'blue',
                  fontSize: 17,
                  fontFamily: font_description,
                  borderColor: 'grey',
                  borderBottomWidth: 0.6,
                  height: 33,
                }}>
                2. Pay using Wallet (Availble Balance : {this.state.wallet})
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
