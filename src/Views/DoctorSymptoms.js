import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  img_url,
  api_url,
  get_doctor_by_specialists,
  get_doctor_by_ratings,
  get_doctor_by_services,
  font_title,
  font_description,
  doctor_list,
  api_url1,
} from "../config/Constant";
import * as colors from "../assets/css/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import back from "../assets/icons/back1.png";
// import { connect } from "react-redux";
import { Loader } from "../components/GeneralComponents";
// import { Rating } from "react-native-ratings";
import LottieView from "lottie-react-native";
export default class DoctorSymptoms extends Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      //   id: this.props.route.params.id,
      //   sub_id: this.props.route.params.sub_id,
      //   type: this.props.route.params.type,
      result: [],
      api_status: 0,
      isLoding: false,
      doctors: [],
      name: this.props.route.params.name,
    };
    this.doctorsList();
  }

  get_doctors = async () => {
    if (this.state.type == 1) {
      this.get_doctors_by_category();
    } else if (this.state.type == 2) {
      this.get_doctors_by_symptoms();
    } else if (this.state.type == 3) {
      this.get_doctors_by_ratings();
    }
  };

  async get_doctors_by_category() {
    this.setState({ isLoding: true });
    await axios({
      method: "post",
      url: api_url + get_doctor_by_specialists,
      data: {
        specialist: this.state.id,
        specialist_sub_category: this.state.sub_id,
      },
    })
      .then(async (response) => {
        this.setState({ isLoding: false, api_status: 1 });
        this.setState({ result: response.data.result });
      })
      .catch((error) => {
        this.setState({ isLoding: false });
        alert("Something went wrong");
      });
  }

  async get_doctors_by_symptoms() {
    this.setState({ isLoding: true });
    await axios({
      method: "post",
      url: api_url + get_doctor_by_services,
      data: { service_id: this.state.id },
    })
      .then(async (response) => {
        this.setState({ isLoding: false, api_status: 1 });
        this.setState({ result: response.data.result });
        //alert(JSON.stringify(response));
      })
      .catch((error) => {
        this.setState({ isLoding: false });
        alert("Something went wrong");
      });
  }

  async get_doctors_by_ratings() {
    this.setState({ isLoding: true });
    await axios({
      method: "post",
      url: api_url + get_doctor_by_ratings,
    })
      .then(async (response) => {
        this.setState({ isLoding: false, api_status: 1 });
        this.setState({ result: response.data.result });
        //alert(JSON.stringify(response));
      })
      .catch((error) => {
        this.setState({ isLoding: false });
        alert("Something went wrong");
      });
  }

  get_symptom_doctors = async (row) => {
    this.setState({ isLoding: true });
    await axios({
      method: "post",
      url: api_url + get_symptom_doctors,
      data: { service_id: this.state.data.id },
    })
      .then(async (response) => {
        this.setState({ isLoding: false, api_status: 1 });
        //alert(JSON.stringify(response));
        this.setState({ result: response.data.result });
      })
      .catch((error) => {
        this.setState({ isLoding: false });
        //alert(error);
        alert("Something went wrong");
      });
  };

  doctorsList = async () => {
    await axios
      .get(
        "https://desi-health-api.herokuapp.com/api/doctors"
        // `${api_url1}/doctors/`
      )
      .then((response) => this.setState({ doctors: response.data.data }));
  };
  doctor_details = (data) => {
    this.props.navigation.navigate("DoctorDetail", { data: data });
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View>
        <View>
          <View style={styles.list_style1}>
            <TouchableOpacity
              style={styles.list_style2}
              onPress={this.handleBackButtonClick}
              activeOpacity={1}
            >
              {/* <Icon onPress={this.handleBackButtonClick} style={styles.list_style3} name='arrow-back' /> */}
              <Image
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "white",
                  marginVertical: 12,
                }}
                source={back}
              />
            </TouchableOpacity>
            <View style={styles.list_style4} />
            <Text style={styles.list_style5}>{this.state.name}</Text>
          </View>
        </View>
        <View>
          <View />
          <View>
            <FlatList
              data={this.state.doctors}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                onPress={this.doctor_details.bind(this, item)}>
             
                  {this.state.name == item.symptoms[0].name && (
                    <View 
                    style={{marginVertical:12,padding:22,flexDirection:'row',borderBottomColor:"grey",borderBottomWidth:.4}}
                    >
                      <View style={{ width: 75 }}>
                        <Image
                        style={{height:50,width:50,borderRadius:52}}
                        source={{ uri: item.profilePicture }} />
                      </View>
                      <View>
                        <Text style={styles.list_style6}>Dr.{item.name}</Text>
                        <View style={styles.list_style7} />
                        <Text style={styles.list_style8}>
                          {item.qualification} ({item.category.name})
                        </Text>
                        {/* <Text>{item._id}</Text> */}
                        <View style={styles.list_style9} />
                        <Text style={styles.list_style10}>
                          {item.experience} Years experience
                        </Text>
                        {/* <Text>.. </Text> */}
                        <View style={styles.list_style11} />
                        {parseInt(item.overall_rating) > 0 && (
                          <Rating
                            ratingCount={5}
                            startingValue={item.overall_rating}
                            imageSize={12}
                            readonly={true}
                          />
                        )}
                      </View>
                    </View>
                  )}
           
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          {this.state.result.length == 0 && this.state.api_status == 1 && (
            <View>
              <View style={styles.list_style15}>
                <LottieView source={doctor_list} autoPlay loop />
              </View>
              <Text style={styles.list_style16}>
                Sorry, no doctor list found
              </Text>
            </View>
          )}
        </View>
        <Loader visible={this.state.isLoding} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list_style1: { alignItems: "flex-start", margin: 10 },
  list_style2: { width: 100, justifyContent: "center" },
  list_style3: { color: colors.theme_fg_two, fontSize: 30 },
  list_style4: { margin: 5 },
  list_style5: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  list_style6: {
    fontSize: 14,
    fontFamily: font_title,
    color: colors.theme_fg_two,
  },
  list_style7: { margin: 1 },
  list_style8: { fontSize: 12, color: colors.grey, fontFamily: font_title },
  list_style9: { margin: 1 },
  list_style10: { fontSize: 12, color: colors.grey, fontFamily: font_title },
  list_style11: { margin: 1 },
  list_style12: { justifyContent: "center" },
  list_style13: {
    fontSize: 18,
    fontFamily: font_title,
    color: colors.theme_fg,
  },
  list_style14: { margin: 5 },
  list_style15: { height: 250, marginTop: "40%" },
  list_style16: { alignSelf: "center", fontFamily: font_title },

  header: {
    justifyContent: "flex-start",
    height: "10%",
    backgroundColor: colors.theme_bg,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: colors.theme_bg,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  header_card: {
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
  },
  header_card_item: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowOffset: { width: 0, height: 15 },
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
    justifyContent: "center",
  },
  title: {
    alignSelf: "center",
    color: colors.theme_fg_three,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: font_title,
  },
  imagetwo: {
    alignSelf: "center",
    height: 130,
    width: 100,
    marginTop: 10,
    marginLeft: 40,
  },
});
