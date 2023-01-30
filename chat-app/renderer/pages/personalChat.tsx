import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Row } from 'antd'
import { db, auth } from '../../firebase'
import { collection, getDocs, } from "firebase/firestore";
import PersonalChatRoom from '../components/PersonalChatRoom'


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
  backgroundColor: "white",
  marginTop: "10px",
  padding: "5px",
  borderRadius: "5px"
}



const PersonalChat = () => {
  const [personalChatRoom, setPersonalChatRoom] = useState([])
  const [openPersonalChatRoom, setOpenPersonalChatRoom] = useState(false)
  const [chatRoomId, setChatRoomId] = useState("")



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
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px", position: "relative" }}>
      {
        openPersonalChatRoom &&
        <PersonalChatRoom chatRoomId={chatRoomId} />
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
                <Button onClick={() => { setOpenPersonalChatRoom(true); setChatRoomId(item.id) }}>입장하기</Button>
              </Col>

            </Row>
          )
        })
      }


    </div>
  )
}

export default PersonalChat