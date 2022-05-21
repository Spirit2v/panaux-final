import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeButton({title,pic}) {
  return (
  
      <View
        style={{
          height: 52,
          width: '100%',
          borderColor: 'grey',
          borderWidth: 0.6,
          borderRadius: 8,
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          paddingHorizontal:12
          ,marginBottom:22
        }}>
        <Icon
          active
          name={pic}
          size={24}
          color="#0c0a8d"
          style={{width: 50, height: 50,marginTop:22}}
        />

        <Text style={{color: '#0c0a8d'}}>{title}</Text>
      </View>

  );
}
