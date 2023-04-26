import React from 'react'
import {
View,
ActivityIndicator,
Text
}
from "react-native"
export const ActiviIndicatorRn = () => {
  return (
    <View style={{flex:1}} >
    <ActivityIndicator size={60} style={{alignSelf:"center",marginTop:"50%"}} />
    <Text style={{fontSize:30,color:"black",marginLeft:"20%"}} >Espere un Momento...</Text>
  </View>
  )
}
