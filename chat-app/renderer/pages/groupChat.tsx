import { Button, Col, Row } from 'antd'
import { CheckOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { StarOutlined, MessageOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../firebase';

const Name = styled.div`
height  : 50%;
display : flex;
justify-content : left;
align-items : center;
font-weight : 700
`

const Content = styled.div`
height  : 50%;
display : flex;
justify-content : left;
align-items : center;
font-weight : 700;
color : gray;
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
const createRoomStyle = {
  backgroundColor: "white",
  marginTop: "10px",
  padding: "5px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center"
}


const GroupChat = () => {
  const [groupChatRoom, setGroupChatRoom] = useState([])


  const getGroupChat = async () => {
    const querySnapshot = await getDocs(collection(db, "groupChat"));
    let box = []
    querySnapshot.forEach((doc) => {
        box.push(doc.data())
    });
    setGroupChatRoom(box)
  }

  useEffect(() => {
    getGroupChat()
  }, [])



  const createGroupChat = async()=>{
    const docId = String(new Date().getTime())

    await setDoc(doc(db, "groupChat", docId), {
      id: auth.currentUser.uid,
      member : [auth.currentUser.displayName],
      date: serverTimestamp(),
    }).then(()=>{
      alert("단체방이 생성되었습니다.")
    })
  }



  return (
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px" }}>
      <Row style={createRoomStyle} >
      <Button onClick={createGroupChat} style={{border : "none"}}><UsergroupAddOutlined />단체 채팅방 만들기</Button>
      </Row>
      {
        groupChatRoom && 
        groupChatRoom.map((item,i)=>{
          return (
            <Row key={item.id} style={userBox}>
            <Col span={4}>
              <img src="/images/logo.png" alt="사진" width={60} />
            </Col>
            <Col span={16}>
              <Name>{item.member[0]}</Name>
              <Content><span>참가인원</span>{item.member.slice(1)}</Content>
            </Col>
            <Col span={4} style={centerStyle}>
              <CheckOutlined />
            </Col>
          </Row>
          )
        })
      }

    </div>
  )
}

export default GroupChat