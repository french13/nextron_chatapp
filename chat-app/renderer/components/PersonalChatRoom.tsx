import React, { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'
import styled from 'styled-components'
import { Button, Col, Input, Row } from 'antd'
import { CloseOutlined, LeftOutlined } from '@ant-design/icons'
import { db, auth } from '../../firebase'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp, onSnapshot, deleteDoc } from "firebase/firestore";
import { useRouter } from 'next/router'

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
  marginTop: "20px",
}
const messagesStyle: React.CSSProperties = {
  height: "88%",
  display: "flex",
  flexDirection: "column",
  padding: "15px 20px",
  overflow: "scroll",
  backgroundColor: "rgb(104, 135, 197)"
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

const deleteConfirm: React.CSSProperties = {
  position: "absolute",
  top: "30%",
  left: "15%",
  width: "70%",
  height: "25%",
  backgroundColor: "rgba(0,0,0,0.8)",
  zIndex: 50,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "15px"
}

interface chatRoomId {
  chatRoomId: string | null;
  setChatRoomId: Dispatch<SetStateAction<string>> | null;
}

const PersonalChatRoom = ({ chatRoomId, setChatRoomId }: chatRoomId) => {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const messaegesRef = useRef(null)
  const inputRef = useRef(null)


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
    )
    setTimeout(() => {
      messaegesRef.current.scrollTop = messaegesRef.current.scrollHeight
    }, 10)
    inputRef.current.focus()
  }, [])



  const sendMessage = async () => {
    const subDoc = String(new Date().getTime())

    await setDoc(doc(db, "personalChat", chatRoomId, chatRoomId, subDoc), {
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

  const deleteRoom = async () => {
    await deleteDoc(doc(db, "personalChat", chatRoomId))
      .then(() => {
        setChatRoomId("")
        setOpenDeleteConfirm(false)
      })
  }


  return (
    <ChatRoom>
      {
        openDeleteConfirm &&
        <div style={deleteConfirm}>
          <div style={{ fontSize: "1rem", color: "white" }}>채팅방을 삭제하시겠습니까?</div>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Button onClick={deleteRoom} style={{ width: "25%", margin: "10px", backgroundColor: "rgb(104, 135, 197)", border: "none", color: "white" }}>
              확인
            </Button>
            <Button onClick={() => { setOpenDeleteConfirm(false) }} style={{ width: "25%", margin: "10px", backgroundColor: "rgb(240, 140, 142)", border: "none", color: "white" }}>
              취소
            </Button>
          </div>

        </div>
      }

      <Row style={{ height: "5%", backgroundColor: "lightgray", borderBottom: "solid 1px gray" }}>
        <Col onClick={closeRoom} style={centerStyle} span={4}>
          <Button style={{ border: "none", background: "none" }}>
            <LeftOutlined />
          </Button>

        </Col>
        <Col style={centerStyle} span={16}>1대1 채팅방</Col>
        <Col style={centerStyle} span={4}>
          <Button onClick={() => { setOpenDeleteConfirm(true) }} style={{ border: "none", borderRadius: "10px", backgroundColor: "rgb(240, 140, 142)", color: "white" }}>방 없애기</Button>
        </Col>
      </Row>
      <div id="scroll" ref={messaegesRef} style={messagesStyle}>
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
      <Row style={{ height: "7%", backgroundColor: "lightgray", position: "absolute",bottom: "20px", width : "100%" }} >
        <Col span={18} style={centerStyle}>
          <Input ref={inputRef} value={message} style={sendInput} onKeyDown={send} onChange={(e) => { setMessage(e.target.value) }} />
        </Col>
        <Col span={6} style={centerStyle}>
          <Button onClick={sendMessage} style={sendButton}>send</Button>
        </Col>
      </Row>
    </ChatRoom>
  )
}

export default PersonalChatRoom