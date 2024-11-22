import axios from "axios";
import ChatBubble from "./ChatBubble";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { useState } from "react";

const ChatBot = ()=>{
    const [chat,Setchat] = useState([]);
    const [userinput, setuserinput] = useState([]);
    const [Loading, isloading] = useState([]);
    const [error, seterror] = useState([]);
    const [isspeaking, setisspeaking] = useState([]);


const API_KEY = "###########################";

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

}