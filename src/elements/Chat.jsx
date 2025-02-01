import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socketf';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utils/constant';

const Chat = () => {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const user = useSelector((store) => store?.user);
    const userId = user?._id;
     
    const fetchMessages = async () => {
      try {
       const chat = await axios.get(Base_Url+ "/chat/"+ targetUserId , { withCredentials: true });  
       
      //  console.log(chat.data.messages);

       const chatMessages = chat?.data?.messages.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
        } 
       })
       setMessages(chatMessages);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      fetchMessages();
    }, []);
   
    useEffect(() => {
      if (!userId) {
        return;
      }
      const socket = createSocketConnection();
      // As soon as the page loaded, the socket connection is made and joinChat event is emitted
      socket.emit("joinChat", {
        firstName: user.firstName,
        userId,
        targetUserId,
      });
      socket.on('messageRecived', ({firstName, lastName ,text}) => {
        // console.log(firstName+":"+ text)
        setMessages((messages)=>[...messages, { firstName, lastName, text}])
      })
        return () => {
        socket.disconnect();
      };
    }, [userId]);
    // console.log(messages);
    
    const sendMessage = () =>{
      const socket = createSocketConnection();
      socket.emit("sendMessage",{
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetUserId,
        text: newMessage
      })
      // console.log(newMessage)
      setNewMessage("")
    }
     
   

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
          <h1 className="p-5 border-b border-gray-600">Chat</h1>
          <div className="flex-1 overflow-scroll sticky bottom-0 p-5">
            {messages.map((msg, index) => {
              return (
                <div
                  key={index}
                  className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-header">
                    {`${msg?.firstName}  ${msg?.lastName}`}
                    <time className="text-xs opacity-50"> 2 hours ago</time>
                  </div>
                  <div className="chat-bubble">{msg?.text}</div>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              );
            })}
          </div>
          <div className="p-5 border-t border-gray-600 flex items-center gap-2">
            <input
               value={newMessage}
               onChange={(e)=> setNewMessage(e.target.value)}
               className="flex-1 border border-gray-500 text-white rounded p-2"
            ></input>
            <button onClick={sendMessage}  className="btn btn-secondary">
              Send
            </button>
          </div>
        </div>
      );
}

export default Chat