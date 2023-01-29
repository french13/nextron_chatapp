import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Input, Row } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { db, auth } from '../../firebase'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import Message from './Message'

const ChatRoom = styled.div`
position : absolute;
background-color : white;
z-index : 5;
width : 100%;
left : 0;
top : 0;
height : 92vh;
`

const centerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
}

interface message {
  id : string;
  message : string;
  name : string;
  time : string;
}




interface chatRoomId {
  chatRoomId: string
}

const PersonalChatRoom = ({ chatRoomId }: chatRoomId) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] =useState([])

  useEffect(() => {
    onSnapshot(
      collection(db, "personalChat", chatRoomId, chatRoomId),
      (result) => {
        let box = [];
        result.forEach((doc) => {
          box.push(doc.data())
        });
        setMessages(box)
      }
    );
  }, [])

 


  const sendMessage = async()=>{
    const subDoc = String(new Date().getTime()) 

    await  setDoc(doc(db, "personalChat", chatRoomId, chatRoomId, subDoc), {
      id: auth.currentUser.uid,
      name : auth.currentUser.displayName,
      message: message,
      time: serverTimestamp(),
    });
  }



  console.log(chatRoomId)
  return (
    <ChatRoom>
      <Row style={{ height: "5%", backgroundColor: "blue" }}></Row>
      <Row style={{ height: "85%", backgroundColor: "green", display: "flex", flexDirection: "column" }}>
        {
          messages && 
          messages.map((item : message,i)=>{
            return (
             <Message item={item}/>
            )
          })
        }
      </Row>
      <Row style={{ height: "10%", backgroundColor: "red" }}>
        <Col span={18} style={centerStyle}>
          <Input style={{margin : "auto 15px", height : "50%"}} onChange={(e)=>{setMessage(e.target.value)}} />
        </Col>
        <Col span={6}  style={centerStyle}>
          <Button onClick={sendMessage} style={{margin : "auto 15px", height : "50%", width : "80%"}}>send</Button>
        </Col>

      </Row>
    </ChatRoom>
  )
}

export default PersonalChatRoom