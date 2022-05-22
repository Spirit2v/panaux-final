import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  vertical,
  avatar,
  FlatList,
  TouchableOpacity,
  Button
} from "react-native";

import {
  doc,
  doctorthree,
  api_url,
  doctor_details,
  img_url,
  font_description,
  font_title,
} from "../config/Constant";
import * as colors from "../assets/css/Colors";
import Icon from "react-native-vector-icons/Ionicons";

import axios from "axios";

export default class App extends Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
    };
    this.checkData();
  }
  componentDidMount() {
    this.checkData();
  }
  checkData = () => {
    // console.log(this.state.data);
  };

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  appoinment_details = (type) => {
  
      this.props.navigation.navigate("CreateAppointment", {
        id: this.state.data._id,
        price_per_conversation: 20,
        // this.state.data.booking_settings.online_booking_fee,
        type: type,
        data: this.state.data,
      });

    }
  

  render() {
    return (
      <View
      style={{paddingHorizontal:12}}
      >

        <View>
          <View style={styles.doc_style1}>
            <View style={styles.doc_style2}>
              <View style={styles.doc_style3}>
                <TouchableOpacity
                  style={styles.doc_style4}
                  onPress={this.handleBackButtonClick}
                  activeOpacity={1}
                >
                  <Icon onPress={this.handleBackButtonClick} style={styles.doc_style5} name='arrow-back' />
                </TouchableOpacity>
                <View style={styles.doc_style6} />
                <Text style={styles.doc_style7}>
                  {this.state.data.name}
           
                  
              
                </Text>
          
                <View style={styles.doc_style8} />
                <Text style={styles.doc_style9}>
                  {this.state.data.specialist} ({this.state.data.qualification})
                </Text>
                <View style={styles.doc_style10} />
                <Text style={styles.doc_style11}>
                  {this.state.data.experience} Years experience
                </Text>

                <View style={styles.doc_style12} />
      
              </View>
            </View>
            <View style={styles.doc_style13}>
              <View style={styles.doc_style14}>
                <Image
                  style={{width: 70,
                    height: 70,
                    borderRadius: 150 / 2,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "grey"}}
                  source={{ uri: this.state.data.profilePicture }}
                />
              </View>
            </View>
          </View>
        </View>
      
              <Text style={styles.doc_style15}>About Doctor</Text>
              <View style={styles.doc_style16} />
              <Text style={styles.doc_style17}>
                {this.state.data.description}
              </Text>
           
          <View style={styles.doc_style18} />
     
              <Text style={styles.doc_style19}>Providing Services</Text>
          
 
          <View style={styles.doc_style20} />
          <View style={styles.doc_style21}>
            {/* <FlatList
            data={this.state.data.providing_services}
            renderItem={({ item,index }) => (
              <Col style={styles.doc_style22}> 
                <View style={styles.doc_style23}>
                  <Image square small style={styles.doc_style24} source={{ uri : img_url + item.service_image }} />
                  <Text style={styles.doc_style25}>
                    {item.service_name}
                  </Text> 
                </View>  
              </Col>
            )}
            numColumns={2}
          /> */}
          </View>
          <View style={{ margin: 10 }} />
          {/* // {this.state.data.booking_settings.online_booking_status == 1 && */}
         
            <View
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderColor: "grey",
                borderWidth: 1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: colors.theme_light,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: font_title,
                    fontSize: 15,
                    color: colors.theme_fg_two,
                  }}
                >
                  {this.state.data.speciality == "Specialist" && (
                    <>
                      <Text> Online consultation & Offline consultation</Text>
                    </>
                  )}

                  {this.state.data.speciality == "Super-specialist" && (
                    <Text> Offline consultation</Text>
                  )}
                  {this.state.data.speciality == "Doctor" && (
                    <Text>
                      {" "}
                      Online consultation
                    
                    </Text>
                  )}

                 
                </Text>
              </View>
              <View style={{ width: "100%", padding: 10 }}>
                <Text
                  style={{
                    fontFamily: font_description,
                    fontSize: 13,
                    color: colors.grey,
                  }}
                >
                  {this.state.data.speciality == "Specialist" && (
                    <>
                      <Text>
                        Doctor available with for online consultation, with chat
                        and video call options. The persistent of doctor will be
                        10 min with negotiable fees. & Doctor in offline mode
                        are avainlble in person
                        {"\n"}
                      </Text>
                      <Text
                       style={{fontWeight:'500',fontSize:17,color:'#323436'}}
                      >
                        Consulting duration :
                        {this.state.data.commission.online["duration"]}
                        {"\t"}
                        {"\t"}
                        {"\t"}-{"\t"}
                        {"\t"}
                        {"\t"}
                        Online Fee: {
                          this.state.data.commission.online["fees"]
                        }{" "}
                        {"\n"}
                        Consulting duration :
                        {this.state.data.commission.offline["duration"]}
                        {"\t"}
                        {"\t"}-{"\t"}
                        {"\t"} Offline fee:{" "}
                        {this.state.data.commission.offline["fees"]}
                      </Text>
                    </>
                  )}

                  {this.state.data.speciality == "Super-specialist" && (
                    <>
                      <Text>
                        Doctor in offline mode are avainlble in person
                        {"\n"}
                      </Text>
                      <Text  style={{fontWeight:'500',fontSize:17,color:'#323436'}}>
                        Consulting duration :
                        {this.state.data.commission.offline["duration"]}
                        {"\t"}
                        {"\t"}-{"\t"}
                        {"\t"} Offline fee:{" "}
                        {this.state.data.commission.offline["fees"]}
                      </Text>
                    </>
                  )}
                  {this.state.data.speciality == "Doctor" && (
                    <>
                      <Text
                      style={{color:'grey',fontSize:14.4}}
                      >
                        Doctor available with for online consultation, with chat
                        and video call options. The persistent of doctor will be
                        10 min with negotiable fees.
                        {"\n"}
                      </Text>
                      <View 
                      style={{height:33}}
                      />
                      <Text
                      style={{fontWeight:'500',fontSize:17,color:'#323436'}}
                      >
                        Consulting duration :
                        {this.state.data.commission.online["duration"]}
                        {"\t"}
                        {"\t"}
                        {"\t"}-{"\t"}
                        {"\t"}
                        {"\t"}
                        Online Fee: {
                          this.state.data.commission.online["fees"]
                        }{" "}
                        {"\n"}
                      </Text>
                    </>
                  )}
                </Text>
                <Text
                  style={{
                    fontFamily: font_description,
                    fontSize: 13,
                    color: colors.grey,
                  }}
                >
                  <Text
                    style={{ fontWeight: "bold", color: colors.theme_fg_two }}
                  >
                    <Text>
   
                    </Text>
                   
                  </Text>
                </Text>
              </View>
              <View 
              style={{marginTop:-21}}
              />
              <Button
                title="Book now"
                type="outline"
                color={"#0c0a8d"}
                onPress={() => this.appoinment_details(1)}
              />
            </View>
     
            {/* <View style={{ paddingHorizontal: 12 }}>
              <Text style={{ color: "grey", fontSize: 17 }}>
                this doctor is not availble at the moment {"\n"}
                Please try again later
              </Text>
            </View> */}
     
          {/* }
           */}
          <View style={{ margin: 10 }} />
          {/* {this.state.data.booking_settings.direct_appointment_status == 1 &&
          <View style={{ borderTopLeftRadius:10, borderTopRightRadius:10, borderColor:'grey', borderWidth:1}}>
            <View style={{ width:'100%', backgroundColor:colors.theme_light, borderTopLeftRadius:10, borderTopRightRadius:10, padding:10 }}>
              <Text style={{ fontFamily:font_title, fontSize:15, color:colors.theme_fg_two}}>Direct appointment - {global.currency}{this.state.data.booking_settings.direct_appointment_fee}</Text>
            </View>
            <View style={{ width:'100%', padding:10 }}>
              <Image source={{ uri : img_url+this.state.data.clinic_details.static_map }} style={{ width:'100%', height:150 }} />
            </View>
            <View style={{ width:'100%', paddingLeft:10, paddingRight:10, paddingBottom:10 }}>
              <Text style={{ fontFamily:font_title, fontSize:16, color:colors.theme_fg_two}}>{this.state.data.clinic_details.clinic_name}</Text>
              <Text style={{ fontFamily:font_description, fontSize:13, color:colors.grey}}>{this.state.data.clinic_details.clinic_address}</Text>
            </View>
            <Button
              title="Book now"
              type="outline"
              onPress={() => this.appoinment_details(2)}
            />
          </View>
          } */}
          <View style={{ margin: 10 }} />
          {/* <Loader visible={this.state.isLoading} /> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  doc_style1: { flexDirection: "row" },
  doc_style2: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "60%",
  },
  doc_style3: { alignItems: "flex-start", margin: 10 },
  doc_style4: { width: 100, justifyContent: "center" },
  doc_style5: { color: colors.theme_fg_two, fontSize: 30,marginLeft:-12},
  doc_style6: { margin: 5 },
  doc_style7: {
    fontSize: 25,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  doc_style8: { margin: 3 },
  doc_style9: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: font_description,
  },
  doc_style10: { margin: 3 },
  doc_style11: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: font_description,
  },
  doc_style12: { margin: 3 },
  doc_style13: { alignItems: "center", justifyContent: "center", width: "40%" },
  doc_style14: { alignItems: "flex-start", margin: 20 },
  doc_style15: {
    fontSize: 16,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  doc_style16: { margin: 5 },
  doc_style17: {
    fontSize: 14,
    color: colors.grey,
    fontFamily: font_description,
  },
  doc_style18: { margin: 10 },
  doc_style19: {
    fontSize: 16,
    color: colors.theme_fg_two,
    fontFamily: font_title,
  },
  doc_style20: { margin: 5 },
  doc_style21: { borderRadius: 10 },
  doc_style22: { height: "100%", width: "50%", marginLeft: 5 },
  doc_style23: { flexDirection: "row", alignItems: "center" },
  doc_style24: { width: 20, height: 20 },
  doc_style25: {
    fontSize: 12,
    color: colors.theme_fg_two,
    fontFamily: font_title,
    padding: 10,
  },
  doc_style26: { backgroundColor: "#1065cd" },
  doc_style27: {
    backgroundColor: "#1065cd",
    borderRadius: 5,
    height: 55,
    width: 380,
    alignSelf: "center",
    fontFamily: font_title,
  },
  doc_style28: {
    fontSize: 16,
    color: "#FFFFFF",
    alignSelf: "center",
    fontFamily: font_title,
  },

  title: {
    fontSize: 18,
    fontFamily: font_title,
    color: colors.theme_fg_three,
    marginTop: 10,
    marginRight: 30,
    alignSelf: "flex-start",
  },
  header: {
    marginRight: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  imageone: {
    alignSelf: "center",
    height: 200,
    width: 360,
  },
  imagetwo: {
    alignSelf: "center",
    height: 90,
    width: 90,
    borderRadius: 100,
  },
});
