import { Button, Col, Row } from 'antd'
import { CheckOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { StarOutlined, MessageOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../firebase';
import GroupChatRoom from '../components/GroupChatRoom';

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

const createRoomStyle = {
  backgroundColor: "white",
  marginTop: "10px",
  padding: "5px",
  borderRadius: "5px",
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


const GroupChat = () => {
  const [groupChatRoom, setGroupChatRoom] = useState([])
  const [chatRoomId, setChatRoomId] = useState("")


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


  const joinGroupChatRoom = async (id: string) => {
    const docRef = doc(db, "groupChat", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
     const data :string[] = docSnap.data().member
     if(data.includes(auth.currentUser.displayName)){
      
     }else{
      await setDoc(doc(db, "groupChat", id), {
        id : id,
        member : [...data, auth.currentUser.displayName],
        date : serverTimestamp()
      })
     }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

 

  const createGroupChat = async () => {
    const docId = String(new Date().getTime())

    await setDoc(doc(db, "groupChat", docId), {
      id: docId,
      member: [auth.currentUser.displayName],
      date: serverTimestamp(),
    }).then(() => {
      alert("단체방이 생성되었습니다.")
    })
  }



  return (
    <div style={{ padding: "0px 10px", paddingTop : "70px" }}>
      <Row style={createRoomStyle} >
        <Button style={{ border: "none", backgroundColor : "rgb(104, 135, 197)", borderRadius:"10px", color : "white"}} onClick={createGroupChat} ><UsergroupAddOutlined />단체 채팅방 만들기</Button>
      </Row>
      {
        chatRoomId &&
        <GroupChatRoom chatRoomId={chatRoomId} setChatRoomId={setChatRoomId}/>
      }
      {
        groupChatRoom &&
        groupChatRoom.map((item, i) => {
          return (
            <Row key={item.id} style={userBox}>
              <Col span={4}>
                <img src="/images/logo.png" alt="사진" width={60} />
              </Col>
              <Col span={14}>
                <Name>{item.member[0]}</Name>
                <Content><span>참가인원 - </span> {item.member.slice(1)}</Content>
              </Col>
              <Col span={6} style={centerStyle}>
                <Button style={buttonStyle} onClick={() => { setChatRoomId(item.id); joinGroupChatRoom(item.id); }}>
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

export default GroupChat