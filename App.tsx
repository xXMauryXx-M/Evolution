import 'react-native-gesture-handler';
 import React from 'react'
 import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/Navigator/StackNavigation';



 export const App = () =>  {
 return (
  <NavigationContainer>
    <StackNavigation />
  </NavigationContainer>
 )
   
   }


/*  import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export const App = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const prompt = [...history, input].join('\n');
    const data = {
      prompt,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers
      });

      const json = await response.json();

      if (json.choices && json.choices.length > 0 && json.choices[0].text) {
        const answer = json.choices[0].text;
        setHistory([...history, input, answer]);
        setInput('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Chat History:</Text>
      {history.map((message, index) => (
        <Text key={index}>{message}</Text>
      ))}
      <TextInput value={input} onChangeText={setInput} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

 */



// import React,{useEffect,useState,useCallback} from 'react'
// import { Text,View,Button,TextInput,TouchableOpacity,SafeAreaView,Image,ActivityIndicator,StyleSheet } from 'react-native';
// import { getChatResponse } from './src/services/api';
// import Voice from '@react-native-voice/voice';
// import Tts from 'react-native-tts';

// export const App = () =>  {
//   const [result, setResult] = useState('')
//   const [isLoading, setLoading] = useState(false)
//   const [text, setText] = useState('Hello, world!');

//   const speak = () => {
//     Tts.speak(text);
//   };

//   useEffect(() => {

//     Voice.onSpeechStart = onSpeechStartHandler;
//     Voice.onSpeechEnd = onSpeechEndHandler;
//     Voice.onSpeechResults = onSpeechResultsHandler;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     }
//   }, [])

//   const onSpeechStartHandler = (e:any) => {
//     console.log("start handler==>>>", e)
//   }
//   const onSpeechEndHandler = (e:any) => {
//     setLoading(false)
//     console.log("stop handler", e)
//   }

//   const onSpeechResultsHandler = (e:any) => {
//     let text = e.value[0]
//     setResult(text)
//     console.log("speech result handler", e)
//   }

//   const startRecording = async () => {
//     setLoading(true)
//     try {
//       await Voice.start('en-Us')
//     } catch (error) {
//       console.log("error raised", error)
//     }
//   }

//   const stopRecording = async () => {
//     try {
//       await Voice.stop()
//       setLoading(false)
//     } catch (error) {
//       console.log("error raised", error)
//     }
//   }


//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <Text style={styles.headingText}>Speech Recoginition</Text>
//         <View style={styles.textInputStyle}>
//           <TextInput
//             value={result}
//             placeholder="your text"
//             style={{ flex: 1 }}
//             onChangeText={text => setResult(text)}
//           />
//           {isLoading ? <ActivityIndicator size="large" color="red" />

//             :
            
//             <TouchableOpacity
//               onPress={startRecording}
//             >
//               <Image
//                 source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
//                 style={{ width: 25, height: 25 }}
//               />
//             </TouchableOpacity>}
//         </View>

//         <TouchableOpacity
//           style={{
//             alignSelf: 'center',
//             marginTop: 24,
//             backgroundColor: 'red',
//             padding: 8,
//             borderRadius: 4
//           }}
//           onPress={stopRecording}
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop</Text>
//         </TouchableOpacity>
//         <Button title="Speak" onPress={speak} />
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24
//   },
//   headingText: {
//     alignSelf: 'center',
//     marginVertical: 26,
//     fontWeight: 'bold',
//     fontSize: 26
//   },
//   textInputStyle: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     height: 48,
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     elevation: 2,
//     shadowOpacity: 0.4
//   }
// });



