import React,{useEffect,useState, useRef} from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Tts from 'react-native-tts';
import Icon from "react-native-vector-icons/Ionicons"
import Voice from '@react-native-voice/voice';
export const EvolutionScreen = () =>  {
  const APIKEY="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"
  const [loading, setLoading] = useState(false);
  const [Answer, setAnswer] = useState("");
  const [isRecording, setisRecording] = useState(false ) 
  const [VosText, setVosText] = useState("")  
  const [TstFinish, setTstFinish] = useState(true)
  const [TstStart, setTstStart] = useState(false)
  const SizeAnswer = useRef(Answer.length)
  useEffect(() => {
     Voice.onSpeechEnd = onSpeechEndHandler;
     Voice.onSpeechResults = onSpeechResultsHandler;
     return () => {
       Voice.destroy().then(Voice.removeAllListeners);
     }
   }, [])
   useEffect(() => {
    Tts.addEventListener('tts-finish', handleTtsFinish);
    Tts.addEventListener('tts-start',handleTtsStart)
    return () => {
      Tts.removeEventListener('tts-finish', handleTtsFinish);
    };
  }, []);
  useEffect(() => {
    Speack() 
  }, [Answer])

   const onSpeechEndHandler = () => setLoading(false);
   const onSpeechResultsHandler = (ResultVoiceUser:any) => {
     let TextSpeech = ResultVoiceUser.value[0]
     setVosText(TextSpeech) 
   }
   const startRecording = async () => {
     try {
       await Voice.start("es-Es")
     } catch (error) {
       Alert.alert("Error al Empezar a Grabar Voz ")
     }
   }
   const stopRecording = async () => {
     try {
       await Voice.stop()  
     } catch (error) {
       Alert.alert("Error Al finalizar la Grabacion")
     }
   }
  const handleTtsStart=()=>{
    setTstStart(true)
  }
  const handleTtsFinish=()=>{
     setTstFinish(false)
  }
  const handleApiChat = async () => {  
    setLoading(true)
    try {
      fetch("https://api.openai.com/v1/chat/completions", {
       method: "POST",
       headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
           Authorization: "Bearer " + APIKEY,
       },
          body: JSON.stringify({
          model:"gpt-3.5-turbo",
          messages:[      
             {
                "role" : "user", "content":VosText
            } 
       ],
         max_tokens: 2048, // Tamaño de Respuesta
         temperature: 0.5, // Creatividad de la Respuesta
      }),
     })
      .then((response) => response.json())
      .then((resp) => {
          setAnswer(resp.choices[0].message.content)
          setLoading(false)
       })
         } catch (error) {
            Alert.alert("Error al Comunicarse con la API")
             setLoading(false)
         }
  }
  const Speack=()=>  SizeAnswer.current>0 && Tts.speak(Answer);
    const ActiveMic=()=>{
       setisRecording(!isRecording)
       startRecording()  
    }
const desactiveMic=()=>{
   setisRecording(!isRecording)
  stopRecording()
  handleApiChat()
}

  if(loading){
    return (
    <View style={{flex:1}} >
      <ActivityIndicator size={60} style={{alignSelf:"center",marginTop:"50%"}} />
      <Text style={{fontSize:30,color:"black",marginLeft:"20%"}} >Espere un Momento...</Text>
 
    </View>)
  }
  return (
    <LinearGradient  colors={[ '#4e2a6b', '#4e2a6b', '#2b476b', '#418090']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}>{
  isRecording?
<View style={{flexDirection:"column",marginLeft:20}} >
  <Text style={{color:"white",fontSize:20,marginTop:30}} >Adelante</Text>
  <Text style={{color:"white",fontSize:25,fontWeight:"bold"}} >Estoy Escuchando...</Text>
  
</View>
  :<View>
  <View>
    <Text style={{color:"white",fontSize:17,marginTop:60,marginLeft:20}} > {SizeAnswer.current>0 ? "Respuesta de Evolution!!" :"Hello Anthony!"}</Text>
     <Text style={{color:"white",fontSize:25,fontWeight:"bold",marginLeft:10}} >{SizeAnswer.current>0 ? "" :"How can i Assiten you?"}</Text>
    </View>
     <View style={{flexDirection:"column",marginVertical:40}} >
 {
   SizeAnswer.current>0 ?
 
  null
:<View>

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
</View>
} 
  
    </View>
  
  
  </View>
}


<View style={styles.buttonContainer}>
  
  
        <TouchableOpacity style={styles.button}>
        <Text style={{fontSize:40,color:"white"}} >⌨</Text>
        </TouchableOpacity>

{
  isRecording ?
  <TouchableOpacity 
    style={styles.button}
    onPress={()=>desactiveMic()}         
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },

    contianer:{
        flex:1,
        backgroundColor:"#1F2043"
    },
    ButtomCircle:{
         
        width:80,
        height:80,
        backgroundColor:"#5F4EBB",
        borderRadius:100,
        justifyContent:"center",
        alignSelf:"center",
        position:"absolute",
        bottom:0


    },
    contianerButtom:{
     
        justifyContent:"space-between",
        flexDirection:"row"

    },
  
      
     
      button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      buttonLeft: {
        backgroundColor: '#4e2a6b',
        alignSelf: 'flex-start',
      },
      buttonMiddle: {
        backgroundColor: '#2b476b',
        alignSelf: 'center',
        flex: 1,
        marginHorizontal: 10,
      },
      buttonRight: {
        backgroundColor: '#418090',
        alignSelf: 'flex-end',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      buttonTextMiddle: {
        fontSize: 20,
        flexDirection:"column"
      },
   
})


  /* 
  
  Texinput y voz 
    <Button  title='clicl' onPress={()=>speak()} />

     <TextInput
     style={{marginHorizontal:20,borderWidth:1,borderColor:"grey",fontSize:20,borderRadius:10,marginVertical:20}}
       placeholder="Preguntale a Charvis"
       value={question}
       onChangeText={(text) => {setQuestion(text)}}
     />
     <TouchableOpacity style={{backgroundColor:"orange", width:90,height:40 , alignSelf:"flex-end",marginRight:20,borderRadius:10}} onPress={()=>handleChat()}>
       <Text style={{fontSize:20,color:"white",marginHorizontal:10,marginVertical:5}}>Enviar</Text>
     </TouchableOpacity>
     <Text style={{color:"black",fontSize:25,marginHorizontal:20}} >Señor Mauricio{Respuestas}</Text>

  */

     //     useEffect(() => {
//      // Obtener las voces disponibles
//      const getVoices = async () => {
//        const voices = await Tts.voices();
//        console.log(voices);
//        // Seleccionar la voz predeterminada del dispositivo
    
      
//      };
//      getVoices();
//    }, []);
