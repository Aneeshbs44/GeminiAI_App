import axios from "axios";
import ChatBubble from "./ChatBubble";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, FlatList } from "react-native-web";
import { TextInput } from "react-native";

const ChatBot = ()=>{
    const [chat,Setchat] = useState([]);
    const [userinput, setuserinput] = useState([]);
    const [Loading, isloading] = useState([]);
    const [error, seterror] = useState([]);
    const [isspeaking, setisspeaking] = useState([]);


const API_KEY = "AIzaSyCDwTKKud2BGuSRvvcySc6JRt9AE_XTgmI";

const handleUserInput = async()=>{
    letUpdatedChat = [
        ...chat,
        {
            role:"user",
            parts:[{text:userinput}]
        },
    ];
   isloading(true);
   try{
    const response = await axios.post(
        `https://generativelanguage.googleapis/com/vibeta/models/gemini-pro:generateContent?Key=${API_KEY}`,
        {
            contents:updatedChat,
        }
    );
    console.log("Gemini Pro API Response:",response.data);
    const modelResponse = response.data?.candidates?.[0]?.content?.parse?.[0]?.text || "";
    if(modelResponse){
        const updatedChatwithModel = [
            ...updatedChat,
            {
                role: "model",
                parts: [{text:modelResponse}],
            },
        ];
        Setchat(updatedChatwithModel);
        setuserinput("");
    }  
    
}catch(error){
    console.error("Error calling the Gemini PRO API:", error);
    console.error("Error response is ", error.response);
    seterror("An error occured please try again");

}finally{
   isloading(false);
}
};
const handleSpeech = async(text) =>{
    if(isspeaking){
        stop();
        setisspeaking(false);
    }else{
        if(!(await isSpeakingAsync())){
            speak(text);
            setisspeaking(true);
        }
    }
};
    const renderChatItem = ({item})  =>{
        <ChatBubble
        role = {item.role}
        text = {item.parts[0].text}
        onspeech={()=> handleSpeech(item.parts[0].text)}
        />
    };
    return(
        <View style = {styles.container}>
        <Text style = {styles.title}>Gemini Chatbot</Text>
        <FlatList
            data = {chat}
            renderItem={renderChatItem}
            keyExtractor={(item,index) => index.toString}
            contentContainerStyle={styles.chatContainer}
        />
        <View style = {styles.inputContainer}>
        <TextInput
            style = {styles.input}
            placeholder = "Type your message...."
            placeholderTextColor="#aaa"
            value={userinput}
            onChangeText={setuserinput}
            /> 
        <TouchableOpacity style = {styles.button} onPress={handleUserInput}>
            <Text style = {styles.buttonText}>Send</Text>
        </TouchableOpacity>
        </View>
        {Loading && <ActivityIndicator style = {styles.Loading} color="#333"/> }
        {error && <Text style = {styles.error}>{error}</Text>}
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        background:"#f8f8f8",
    },
    title:{
        fontsize:24,
        fontWeight:"bold",
        color:"#333",
        marginBottom:20,
        marginTop:40,
        textAlign:'center',
    },
    chatContainer:{
        flexGrow:1,
        justifyContent:"flex-end",
    },
    inputContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
    },
    input:{
        flex:1,
        height:50,
        marginRight:10,
        padding:8,
        borderColor:"#333",
        borderWidth:1,
        borderRadius:25,
        color:"#333",
        backgroundColor:"#fff"
    },
    buttonText:{
        color:"#fff",
        textAlign:"center",
    },
    Loading:{
        marginTop:10,
    },
    button:{
        padding:10,
        backgroundColor:"#007AFF",
        borderRadius:25,
    },
    error:{
        color:"red",
        marginTop:10,
    },

});
export default ChatBot; 
