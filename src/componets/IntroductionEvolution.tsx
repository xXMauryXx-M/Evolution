import React from "react"
import { Image, TouchableOpacity } from 'react-native';
import{ Text,View,StyleSheet} from "react-native"
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../Screen/EvolutionScreen";
export  const IntroductionEvolution=({ActiveMic}:any)=>{

    return (
        <LinearGradient  colors={[ '#4e2a6b', '#4e2a6b', '#2b476b', '#418090']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}>
           
           <View style={{flexDirection:"column",marginLeft:20,marginBottom:20}} >
                <Text style={{color:"white",fontSize:20,marginTop:30}} >Hola!</Text>
                <Text style={{color:"white",fontSize:25,fontWeight:"bold"}} >Como puedo Ayudarte?</Text>
  
          </View>



          <View style={{marginLeft:30,flexDirection:"row"}} >
          <Image style={{width:50,height:50}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1802/1802977.png"}} /> 
          <Text style={{color:"white",fontSize:20,fontWeight:"bold",marginLeft:40,marginTop:10,}} >Como puede resolver codigo?</Text>
          </View> 
          
          <View style={{marginLeft:30,flexDirection:"row",marginTop:40}} >
          <Image style={{width:50,height:50,borderRadius:30}} source={{uri:"https://w7.pngwing.com/pngs/870/748/png-transparent-call-center-agent-logo-virtual-assistant-computer-icons-personal-assistant-business-management-support-blue-company-text-thumbnail.png"}} /> 
          <Text style={{color:"white",fontSize:20,fontWeight:"bold",marginLeft:40,marginTop:10,}} >Ayudame en esto</Text>
          </View>
          
          
          <View style={{marginLeft:30,flexDirection:"row",marginTop:40}} >
          <Image style={{width:50,height:50}} source={{uri:"https://icons.iconarchive.com/icons/untergunter/leaf-mimes/512/text-richtext-icon.png"}} /> 
          <Text style={{color:"white",fontSize:20,fontWeight:"bold",marginLeft:40,marginTop:10,}} >Hazme un resumen</Text>
          </View>
          
          
          <View style={{marginLeft:30,flexDirection:"row",marginTop:40}} >
          <Image style={{width:50,height:50}} source={{uri:"https://cdn-icons-png.flaticon.com/512/4576/4576683.png"}} /> 
          <Text style={{color:"white",fontSize:20,fontWeight:"bold",marginLeft:40,marginTop:10,}} >que es la vida?</Text>
          </View>
                    
          <View style={styles.buttonContainer}>          
                  <TouchableOpacity style={styles.button}>
                  <Text style={{fontSize:40,color:"white"}} >⌨</Text>
                  </TouchableOpacity>
          
          {
           true ?
            <TouchableOpacity 
              style={styles.button}
            //   onPress={()=>desactiveMic()}
            
            >
                <Icon name='mic-outline' size={50} color={"#418090"} />
          
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.button}
            onPress={()=>ActiveMic()}
           >
                  <Icon name='mic-off-outline' size={40}  color={"white"}/>
                  </TouchableOpacity>
           
          }
                  
            
                </View>
              </LinearGradient>
    
    )

}