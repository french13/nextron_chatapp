import React, { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Button, Col, Input, Row } from 'antd'
import { CloseOutlined, LeftOutlined } from '@ant-design/icons'
import { db, auth } from '../../firebase'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const ChatRoom = styled.div`
position : absolute;
background-color : white;
z-index : 5;
width : 100%;
left : 0;
top : 0;
height : 100vh;
`

const Name = styled.div`
font-weight : 700;
`

const Message = styled.div`
background-color :rgb(254, 224, 171);
display : inline-block;
padding : 10px;
border-radius : 10px 10px 0 10px;
margin-top : 3px;
`

const messagesStyle: React.CSSProperties = {
  height: "88%",
  display: "flex",
  flexDirection: "column",
  padding: "15px 20px",
  overflow: "scroll",
  backgroundColor: "rgb(104, 135, 197)"
}

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

const sendInput: React.CSSProperties = {
  margin: "auto 10px", height: "70%",
  border: "solid 2px rgb(104, 135, 197)",
  borderRadius: "10px"
}

const sendButton: React.CSSProperties = {
  margin: "auto 15px",
  height: "70%", width: "80%",
  backgroundColor: "rgb(104, 135, 197)",
  color: "white",
  borderRadius: "10px"
}

interface chatRoomId {
  chatRoomId: string | null;
  setChatRoomId: Dispatch<SetStateAction<string>> | null;
}

const GroupChatRoom = ({ chatRoomId, setChatRoomId }: chatRoomId) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messaegesRef = useRef(null)





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

    setTimeout(() => {
      messaegesRef.current.scrollTop = messaegesRef.current.scrollHeight
    }, 10)

  }, [])




  const sendMessage = async () => {
    const subDoc = String(new Date().getTime())

    await setDoc(doc(db, "groupChat", chatRoomId, chatRoomId, subDoc), {
      id: subDoc,
      name: auth.currentUser.displayName,
      message: message,
      time: serverTimestamp(),
    });
    setTimeout(() => {
      messaegesRef.current.scrollTop = messaegesRef.current.scrollHeight
    }, 10)
    setMessage("")
  }

  const send = (e: any) => {

    if (e.keyCode == 13) {
      sendMessage()
    }
  }


  const closeRoom = () => {
    setChatRoomId("")
  }


  return (
    <ChatRoom>
      <Row style={{ height: "5%", backgroundColor: "lightgray", borderBottom: "solid 1px gray" }}>
        <Col onClick={closeRoom} style={centerStyle} span={4}>
          <LeftOutlined />
        </Col>
        <Col style={centerStyle} span={16}>단체 채팅방</Col>
        <Col style={centerStyle} span={4}>

        </Col>
      </Row>
      <div ref={messaegesRef} style={messagesStyle}>
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
      </div>
      <Row style={{ height: "7%", backgroundColor: "lightgray" }} >
        <Col span={18} style={centerStyle}>
          <Input value={message} style={sendInput} onKeyDown={send} onChange={(e) => { setMessage(e.target.value) }} />
        </Col>
        <Col span={6} style={centerStyle}>
          <Button onClick={sendMessage} style={sendButton}>send</Button>
        </Col>

      </Row>
    </ChatRoom>
  )
}

export default GroupChatRoom