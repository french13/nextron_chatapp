import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Input, Row } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { db, auth } from '../../firebase'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const ChatRoom = styled.div`
position : absolute;
background-color : white;
z-index : 5;
width : 100%;
left : 0;
top : 0;
height : 92vh;
`

const Name = styled.div`
font-weight : 700;
`

const Message = styled.div`
background-color : yellow;
display : inline-block;
padding : 10px;
border-radius : 10px;
`

const centerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
}


const textLeft: React.CSSProperties = {
  width: "100%",
  textAlign: "left",
  marginTop: "20px"
}
const textRight: React.CSSProperties = {
  width: "100%",
  textAlign: "right",
  marginTop: "20px"
}

interface chatRoomId {
  chatRoomId: string
}

const GroupChatRoom = ({ chatRoomId }: chatRoomId) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])



  useEffect(() => {
    onSnapshot(
      collection(db, "groupChat", chatRoomId, chatRoomId),
      (result) => {
        let box = [];
        result.forEach((doc) => {
          box.push(doc.data())
        });
        setMessages(box)
      }
    );
  }, [])




  const sendMessage = async () => {
    const subDoc = String(new Date().getTime())

    await setDoc(doc(db, "groupChat", chatRoomId, chatRoomId, subDoc), {
      id: auth.currentUser.uid,
      name: auth.currentUser.displayName,
      message: message,
      time: serverTimestamp(),
    });
  }

  return (
    <ChatRoom>
    <Row style={{ height: "5%", backgroundColor: "lightgray", borderBottom: "solid 1px gray" }}>
      <Col span={4}>
      </Col>
      <Col style={centerStyle} span={16}>단체 채팅방</Col>
      <Col style={centerStyle} span={4}>
        <CloseOutlined/>
      </Col>
    </Row>
    <Row style={{ height: "88%", display: "flex", flexDirection: "column", padding: "15px 20px" }}>
      {
        messages &&
        messages.map((item, i) => {
          return (
            <div key={item.id} style={item.name == auth.currentUser.displayName ? textRight : textLeft}>
              <Name>{item.name}</Name>
              <Message>{item.message}</Message>
            </div>
          )
        })
      }
    </Row>
    <Row style={{ height: "7%", backgroundColor: "lightgray" }} >
      <Col span={18} style={centerStyle}>
        <Input style={{ margin: "auto 10px", height: "70%" }} onChange={(e) => { setMessage(e.target.value) }} />
      </Col>
      <Col span={6} style={centerStyle}>
        <Button onClick={sendMessage} style={{ margin: "auto 15px", height: "70%", width: "80%" }}>send</Button>
      </Col>

    </Row>
  </ChatRoom> 
  )
}

export default GroupChatRoom