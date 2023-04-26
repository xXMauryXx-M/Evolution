import React,{useEffect,useState, useRef} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Tts from 'react-native-tts';
import Icon from "react-native-vector-icons/Ionicons"
import Voice from '@react-native-voice/voice';
import { ActiviIndicatorRn } from '../componets/utils/ActiviIndicatorRn';
import { IntroductionEvolution } from '../componets/IntroductionEvolution';
import { VoiceConversation } from '../componets/VoiceConversation';
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
  const Speack=()=> SizeAnswer.current>0 && Tts.speak(Answer);
         const ActiveMic=()=>{
          setisRecording(!isRecording)
          startRecording()  
        }
  const desactiveMic=()=>{
        setisRecording(!isRecording)
        stopRecording()
        handleApiChat()
    }
        if(loading)return<ActiviIndicatorRn/>     
 
  return (
  <>
  <IntroductionEvolution/>
  {/* <VoiceConversation /> */}
  </>
  
    
  );
};

 export  const styles = StyleSheet.create({
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
