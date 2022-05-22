import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
// import {
//   View,
//   Header,
//   Content,
//   Left,
//   Body,
//   Right,
//   Title,
//   Button as Btn,
//   Icon,
//   Row,
//   Card,
// } from "native-base";
import {
  api_url,
  place_order,
  order_generation,
  get_payment_list,
  font_title,
  font_description,
  api_url1,
} from '../config/Constant';
import {Loader} from '../components/GeneralComponents';
import back from '../assets/icons/back1.png';
import {CommonActions} from '@react-navigation/native';
import * as colors from '../assets/css/Colors';
// import { Loader } from "../components/GeneralComponents";
import axios from 'axios';
// import { connect } from "react-redux";
// import {
//   orderServicePending,
//   orderServiceError,
//   orderServiceSuccess,
//   paymentListPending,
//   paymentListError,
//   paymentListSuccess,
// } from "../actions/PaymentActions";
// import { reset } from "../actions/CartActions";
// import { productReset } from "../actions/ProductActions";
import RazorpayCheckout from 'react-native-razorpay';

// var radio_props = [{ label: "Cash", value: 1 }];

class Payment extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.select_payment_method = this.select_payment_method.bind(this);
    this.state = {
      data: this.props.route.params.data,
      // from:this.props.route.params.from,
      // prescription_id:this.props.route.params.prescription_id,
      // prescription_total:this.props.route.params.prescription_total,
      isLoding:false
    };
    // this.get_payment_modes();
  }
  componentDidMount() {
    console.log(this.state.data._id);
  }
  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  // get_payment_modes = async () => {
  //   this.setState({ isLoding: true });
  //   // this.props.paymentListPending();
  //   await axios({
  //     method: "get",
  //     url: api_url + get_payment_list,
  //   })
  //     .then(async (response) => {
  //       this.setState({ isLoding: false });
  //       await this.props.paymentListSuccess(response.data);
  //     })
  //     .catch((error) => {
  //       this.setState({ isLoding: false });
  //       this.props.paymentListError(error);
  //     });
  // };

  place_order = async payment_mode => {
    this.setState({isLoding: true});
    console.log({
      customer_id: global.id,
      expected_delivery_date: this.props.delivery_date,
      vendor_id: this.props.current_vendor,
      payment_mode: payment_mode,
      delivery_charge: this.props.delivery_charge,
      tax: this.props.tax,
      total: this.props.total,
      discount: this.props.discount,
      sub_total: this.props.sub_total,
      promo_id: this.props.promo_id,
      items: JSON.stringify(Object.values(this.props.items)),
    });
    this.props.orderServicePending();
    await axios({
      method: 'post',
      url: api_url + place_order,
      data: {
        customer_id: 'global.id',
        expected_delivery_date: '22 march',
        vendor_id: this.props.current_vendor,
        payment_mode: payment_mode,
        delivery_charge: this.props.delivery_charge,
        tax: this.props.tax,
        total: this.props.total,
        discount: this.props.discount,
        sub_total: this.props.sub_total,
        promo_id: this.props.promo_id,
        items: JSON.stringify(Object.values(this.props.items)),
      },
    })
      .then(async response => {
        this.setState({isLoding: false});
        await this.props.orderServiceSuccess(response.data);
        if (response.data.status == 1) {
          await this.move_orders();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        this.setState({isLoding: false});
        this.props.orderServiceError(error);
      });
  };

  async move_orders() {
    await this.props.reset();
    await this.props.productReset();
    this.props.navigation.navigate('MyOrders');
  }

  payNow = async () => {
    this.setState({isLoding:true})
    await axios
      .patch(
        `${api_url1}/order/update_orderStatus`,
        {
          id: this.state.data._id,
          status: 'paid',
          paymentMode: 'paymentgateway',
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        console.log(res);
        this.setState({isLoding:false});

        //razorpay code

        var options = {
          currency: 'INR',
          key: 'rzp_test_GVJRdB4KaByL9z',
          amount: Math.floor(this.state.data.amount*100),
          name: 'global.application_name',
          description: 'test description',
          order_id:  res.data.razorpayOrder.id,
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

          this.setState({isLoding:true})
          await axios
            .patch(
              `${api_url1}/order/verify_order_payment`,
              {
                razorpay_order_id: data.razorpay_order_id,
                razorpay_payment_id:data.razorpay_payment_id,
                razorpay_signature:data.razorpay_signature,

                // razorpay_order_id: this.state.razorpay_order_id,
                // razorpay_payment_id: this.state.razorpay_payment_id,
                // razorpay_signature: this.state.razorpay_signature,
              },
              {headers: {Authorization: `Bearer ${global.fcm_token}`}},
            )
            .then(res => {
              // console.log(res);
              alert('Success');
              this.setState({isLoding:false});
              this.props.navigation.navigate('MyOrders');
            })

            .catch(error => {
              alert(error);
              this.setState({isLoding:false})
            });
        });

        //

        // alert("Payment Success");
      })
      // .then(this.props.navigation.navigate('Success',{data:this.state.data}))
      .catch(error => {
        alert(`error1${error}`);
        this.setState({isLoding:false})
      });
  };
  // COD = async () => {
  //    await axios
  //     .patch(
  //       `${api_url1}/order/update_orderStatus`,
  //       { id: this.state.data._id, status: "paid", payment: true ,paymentMode : "cod"},
  //       { headers: { Authorization: `Bearer ${global.fcm_token}` } }
  //     )
  //     .then((res) => {
  //       // console.log(res);
  //       console.log("Payment Success");
  //     })
  //    .then(this.props.navigation.navigate("Success",{data:this.state.data}))
  //     .catch((error) => alert(error));
  // };

  payNowWallet = async () => {
    this.setState({
isLoding:true
    });
    await axios
      .patch(
        `${api_url1}/order/update_orderStatus`,
        {
          //   id: this.state.data._id, status: "paid"
          // ,paymentMode : "wallet"
          id: this.state.data._id,
          status: 'paid',
          paymentMode: 'wallet',
        },
        {headers: {Authorization: `Bearer ${global.fcm_token}`}},
      )
      .then(res => {
        // console.log(res);
        alert('Payment Success');
        this.setState({
          isLoding:false
              });
              this.props.navigation.navigate('MyOrders');
      })
      // .then(this.props.navigation.navigate("Success",{data:this.state.data}))
      .catch(error => {
        alert(error);
        this.setState({
          isLoding:false
              });
      });
  };

  place_prescription_order = async payment_mode => {
    this.setState({isLoding: true});
    this.props.orderServicePending();
    await axios({
      method: 'post',
      url: api_url + order_generation,
      data: {
        customer_id: global.id,
        payment_mode: payment_mode,
        prescription_id: this.state.prescription_id,
      },
    })
      .then(async response => {
        this.setState({isLoding: false});
        await this.props.orderServiceSuccess(response.data);
        if (response.data.status == 1) {
          await this.move_orders();
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        this.setState({isLoding: false});
        this.props.orderServiceError(error);
      });
  };

  // async select_payment_method(payment_mode) {
  //   if (this.state.from == "prescription") {
  //     if (payment_mode == 1 || payment_mode == 3) {
  //       await this.place_prescription_order(payment_mode);
  //     } else {
  //       var options = {
  //         currency: 356,
  //         key: global.razorpay_key,
  //         amount: 1000 * 100,
  //         // name: "global.application_name",
  //         // prefill: {
  //         //   email: "asdf@asdf.com",
  //         //   contact: "global.phone_number",
  //         //   name: "global.customer_name",
  //         // },
  //         // theme: { color: colors.theme_fg },
  //       };
  //       RazorpayCheckout.open(options)
  //         .then((data) => {
  //           console.log()
  //           // this.place_prescription_order(payment_mode);
  //         })
  //         .catch((error) => {
  //           alert("Your transaction is declined");
  //         });
  //     }
  //   } else {
  //     if (payment_mode == 1 || payment_mode == 3) {
  //       await this.place_order(payment_mode);
  //     } else {
  //       var options = {
  //         currency: 356,
  //         key: "global.razorpay_key",
  //         amount: 1000 * 100,
  //         name: "global.application_name",
  //         prefill: {
  //           email: "asdf@asdf.com",
  //           contact: "global.phone_number",
  //           name: "global.customer_name",
  //         },
  //         theme: { color: colors.theme_fg },
  //       };
  //       RazorpayCheckout.open(options)
  //         .then((data) => {
  //           // handle success
  //           //alert(`Success: ${data.razorpay_payment_id}`);
  //           this.place_order(payment_mode);
  //         })
  //         .catch((error) => {
  //           alert("Your transaction is declined.");
  //           //alert(JSON.stringify(error));
  //           // handle failure
  //           //alert(`Error: ${error.code} | ${error.description}`);
  //         });
  //     }
  //   }
  // }

  render() {
    const {isLoding, error, data, message, status, payment_modes} = this.props;

    return (
      <View>
        <View>
          <View style={styles.pay_style1}>
            <TouchableOpacity
              style={styles.pay_style2}
              onPress={this.handleBackButtonClick}
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
            <View style={styles.pay_style4} />
            <Text style={styles.pay_style5}>Payment</Text>
          </View>
        </View>
        <View style={styles.pay_style6} />
        <View style={styles.pay_style7}>
          {/* {payment_modes.map((row, index) => ( */}
          <Text style={styles.pay_style8} onPress={this.payNow}>
            Payment Gateway
          </Text>
          <Text style={styles.pay_style8} onPress={this.payNowWallet}>
            Pay through Wallet
          </Text>
          <TouchableOpacity>
            {/* <Text style={styles.pay_style8} >
            Cash on delivery
          </Text> */}
          </TouchableOpacity>
          
          {/* ))} */}
        </View>
        {/* {/* <Loader visible={isLoding} /> */}
        <Loader visible={this.state.isLoding} /> 
      </View>
    );
  }
}

export default Payment;

const styles = StyleSheet.create({
  pay_style1: {alignItems: 'flex-start', margin: 10},
  pay_style2: {width: 100, justifyContent: 'center'},
  pay_style3: {color: colors.theme_fg_two, fontSize: 30},
  pay_style4: {margin: 5},
  pay_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  pay_style6: {margin: 20, marginTop: -12},
  pay_style7: {padding: 20},
  pay_style8: {
    padding: 10,
    color: colors.theme_fg,
    fontSize: 16,
    fontFamily: font_title,
    borderBottomWidth: 1,
    borderColor: '#a3ada6',
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
  radio_style: {
    marginLeft: 20,
    fontSize: 17,
    color: colors.theme_bg,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'transparent',
  },
  footer_content: {
    width: '90%',
  },
  place_order: {
    backgroundColor: colors.theme_bg,
  },
});
