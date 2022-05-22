import { View, Text } from 'react-native'
import React from 'react'

export default function DiagnosticButton() {
  return (
    <View
    style={{
        width:'43%',
      borderColor: 'black',
      borderRadius: 5,
      padding: 12,
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
      margin:12
    }}>
    <Text style={{fontWeight: 'bold', color: 'black', fontSize: 22}}>
    Typhoid
    </Text>
    <View
    style={{flexDirection:'row',justifyContent:'space-between'}}
    >
      <Text
      style={{width:'70%'}}
      >
        System Images: android-22 | ARM EABI v7a, android-22 | Intel x86
       
      </Text>
      <Text
       style={{width:'23%',color:'black',marginTop:'20%'}}
      >₹345</Text>
    </View>
  </View>
  )
}