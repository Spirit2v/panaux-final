import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {
  Content,
  Container,
  Header,
  Body,
  Title,
  Left,
  Icon,
  Right,
  Button as Btn,
  Card,
  CardItem,
  List,
  ListItem,
  Thumbnail,
  Row,
} from 'native-base';
import * as colors from '../assets/css/Colors';
import back from '../assets/icons/back1.png';
import axios from 'axios';
import {Loader} from '../components/GeneralComponents';
import {
  wallet_icon,
  api_url1,
  get_wallet,
  add_wallet,
  font_description,
  font_title,
  no_wallet_lottie,
} from '../config/Constant';
// import { Button } from "react-native-elements";
import DialogInput from 'react-native-dialog-input';
import Moment from 'moment';
// import RazorpayCheckout from "react-native-razorpay";
import wallet1 from '../assets/icons/wallet.png';
import LottieView from 'lottie-react-native';
class Wallet extends Component<Props> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.open_dialog = this.open_dialog.bind(this);
    this.add_wallet = this.add_wallet.bind(this);
    this.state = {
      isDialogVisible: false,
      wallet: 0,
      wallet_histories: [],
      isLoding: false,
      api_status: 0,
      transactionHistory: [],
      load: false,
      load1: false,
    };
    this.getWallet();
    this.getTransaction();
  }

  // get_wallet = async() =>{
  componentDidMount() {
    this.getWallet();
    this.getTransaction();
  }

  getWallet = async () => {
    this.setState({isLoding:true});
    await axios
      .get(`${api_url1}/wallet/client/CBalance`, {
        headers: {Authorization: `Bearer ${global.fcm_token}`},
      })
      .then(res => {
        this.setState({wallet: res.data.data.balance,isLoding:false});
      })
      .catch(error => {
        console.log(error);
   alert(error);
        this.setState({isLoding:false});
      });
    this.setState({load: true});
  };
  getTransaction = async () => {
    await axios
      .get(`${api_url1}/wallet/client/transactions`, {
        headers: {Authorization: `Bearer ${global.fcm_token}`},
      })
      .then(res => {
        this.setState({transactionHistory: res.data.data});
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({load: true});
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  open_dialog() {
    this.setState({isDialogVisible: true});
  }

  add_wallet(amount) {
    let num = Number(amount);

    if (Number.isInteger(num) && num > 0) {
      this.props.navigation.navigate('WalletAdd', {data: amount});
      this.setState({isDialogVisible: false});
    } else {
      alert('Enter positive integer');
    }
  }

  show_alert(message) {}

  render() {
    return (
      <>
        <View>
          <View style={styles.wall_style1}>
            <TouchableOpacity
              style={styles.wall_style2}
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
            <View style={styles.wall_style4} />
            <Text style={styles.wall_style5}>Wallet</Text>
          </View>
        </View>
        <View style={{padding: 12}}>
          <View style={{paddingHorizontal: 12}}>
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 2,
                borderColor: 'white',
                borderWidth: 0.2,
               
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 32,
                paddingVertical: 17,
              }}>
              <Image
                style={{
                  width: 27,
                  height: 27,
                  backgroundColor: 'white',
                  marginVertical: 6,
                  marginLeft: 2,
                  marginTop: 12,
                  marginRight: 12,
                }}
                source={wallet1}
              />
              <View style={{marginLeft: -40,marginTop:6}}>
                <Text style={styles.wall_style10}>
                  {global.currency}
                  {this.state.wallet.toFixed(2)} ₹

                </Text>
                <Text style={styles.wall_style11}>Your balance</Text>
              </View>
              {/* <Button
                title="+ Add Money"
                onPress={this.open_dialog}
                type="outline"
              /> */}
              <TouchableOpacity
               onPress={this.open_dialog}
                style={{
                  height: 53,
                  width: 126,
                  backgroundColor: '#white',
                  borderColor: '#0c0a8d',
                  borderWidth: .6,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#0c0a8d',fontSize:17,fontWeight:'bold'}}>+ Add Money</Text>
              </TouchableOpacity>
            </View>

            {/* </Left> fontStyle:'bold'
              <Right> */}
          </View>
          <View></View>

          {/* </Right>
            </CardItem>
          </Card> */}
          <View style={styles.wall_style12} />

          <Text style={styles.wall_style13}>Wallet transactions</Text>

          {/* <List> */}
          <FlatList
            inverted={true}
            data={this.state.transactionHistory}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  height: 66,
                  justifyContent: 'space-around',
                  marginBottom: 12,
                  borderBottomWidth: 0.4,
                  borderColor: 'grey',
                }}>
                <Image source={wallet_icon} style={styles.wall_style14} />
                <View style={{width: '40%'}}>
                  <Text style={styles.wall_style15}>{item.referenceId}</Text>
                  <Text style={styles.wall_style16}>
                    {Moment(item.createdAt).format('DD MMM-YYYY hh:mm')}
                  </Text>
                </View>

                <Text style={styles.wall_style17}>
                  {global.currency}
                  {item.amount.toFixed(2)} ₹

                  {'\n'}
                  {item.transaction_type == 'PAYMENT' ? (
                    <Text style={styles.wall_style18}>Paid</Text>
                  ) : (
                    <Text style={styles.wall_style19}>Deposite</Text>
                  )}
                </Text>
              </View>
            )}
            keyExtractor={item => item.menu_name}
          />

          <Loader visible={this.state.isLoding} />
          {this.state.load && this.state.transactionHistory.length == 0 && (
            <View>
              <View style={styles.wall_style20}>
                <LottieView source={no_wallet_lottie} autoPlay loop />
              </View>
              <Text style={styles.wall_style21}>No transactions found</Text>
            </View>
          )}

          <DialogInput
            textInputProps={{
              autoCorrect: false,
              keyboardType: 'numeric',
              color: 'grey',
            }}
            isDialogVisible={this.state.isDialogVisible}
            title={'Add Wallet'}
            titleColor={'grey'}
            message={'Please enter your amount here'}
            hintInput={'Enter amount'}
            hintTextColor="black"
            keyboardType="numeric"
            submitInput={inputText => {
              this.add_wallet(inputText);
            }}
            closeDialog={() => {
              this.setState({isDialogVisible: false});
            }}
          />
        </View>
      </>
    );
  }
}

export default Wallet;

const styles = StyleSheet.create({
  wall_style1: {alignItems: 'flex-start', margin: 10},
  wall_style2: {width: 100, justifyContent: 'center'},
  wall_style3: {color: colors.theme_fg_two, fontSize: 30},
  wall_style4: {margin: 5},
  wall_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  wall_style6: {borderRadius: 8},
  wall_style7: {borderRadius: 8},
  wall_style8: {fontSize: 30, color: colors.theme_fg},
  wall_style9: {margin: 5},
  wall_style10: {
    fontSize: 18,
    fontFamily: font_description,
    color: 'black',
  },
  wall_style11: {
    fontSize: 13,
    color: colors.theme_fg,
    fontFamily: font_title,
  },
  wall_style12: {margin: 10},
  wall_style13: {fontSize: 16, marginVertical: 23, color: 'grey'},
  wall_style14: {height: 35, width: 35},
  wall_style15: {
    fontSize: 14,
    color: colors.theme_fg_two,
    fontFamily: font_description,
  },
  wall_style16: {
    fontSize: 12,
    color: colors.theme_fg_four,
    fontFamily: font_description,
  },
  wall_style17: {
    fontSize: 16,
    color: colors.theme_fg_two,
    fontFamily: font_description,
  },
  wall_style18: {color: 'red'},
  wall_style19: {color: 'green'},
  wall_style20: {height: 200, marginTop: '30%'},
  wall_style21: {alignSelf: 'center', fontFamily: font_title},

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
  margin_20: {
    margin: 20,
  },
  margin_50: {
    margin: 50,
  },
  padding_20: {
    padding: 20,
  },
  description: {
    color: colors.theme_fg_four,
  },
});
