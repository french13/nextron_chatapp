import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Row } from 'antd'
import { db, auth } from '../../firebase'
import { collection, getDocs, } from "firebase/firestore";
import PersonalChatRoom from '../components/PersonalChatRoom'
import {MessageOutlined} from '@ant-design/icons'


const Name = styled.div`
height  : 100%;
display : flex;
justify-content : left;
align-items : center;
font-weight : 700
`



const centerStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
}

const userBox = {
  backgroundColor: "rgb(254, 224, 171)",
  marginTop: "10px",
  padding: "5px",
  borderRadius: "5px",
  border : "none",
  color : "rgb(104, 135, 197)",
  fontSize : "1.1rem"
}

const buttonStyle = {
  border : "none",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  fontSize : "1.3rem",
  borderRadius : "10px",
  backgroundColor : "rgb(104, 135, 197)",
  color : "white",
}



const PersonalChat = () => {
  const [personalChatRoom, setPersonalChatRoom] = useState([])
  const [chatRoomId, setChatRoomId] = useState<string>("")



  const getPersonalChat = async () => {
    const querySnapshot = await getDocs(collection(db, "personalChat"));
    let box = []
    querySnapshot.forEach((doc) => {
      const chatMember = doc.data().member
      if (chatMember.includes(auth.currentUser.displayName)) {
        box.push(doc.data())
      } else {
        console.log(" 채팅방 없음")
      }
    });
    setPersonalChatRoom(box)
  }

  useEffect(() => {
    getPersonalChat()
  }, [])



  return (
    <div style={{ padding: "0px 10px", paddingTop : "70px" }}>
      {
        chatRoomId &&
        <PersonalChatRoom chatRoomId={chatRoomId} setChatRoomId = {setChatRoomId}/>
      }
      {
        personalChatRoom && 
        personalChatRoom.map((item, i) => {
          return (
            <Row key={item.id} style={userBox}>
              <Col span={4}>
                <img src="/images/logo.png" alt="사진" width={60} />
              </Col>
              <Col span={14}>
                <Name>{item.member}</Name>
              </Col>
              <Col span={6} style={centerStyle}>
                <Button style={buttonStyle} onClick={() => { setChatRoomId(item.id) }}>
                <MessageOutlined/>
                  </Button>
              </Col>

            </Row>
          )
        })
      }


    </div>
  )
}

export default PersonalChat