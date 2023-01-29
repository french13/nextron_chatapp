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
  const [openGroupChatRoom, setOpenGroupChatRoom] = useState(false)
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
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px", position: "relative" }}>
      <Row style={createRoomStyle} >
        <Button onClick={createGroupChat} style={{ border: "none" }}><UsergroupAddOutlined />단체 채팅방 만들기</Button>
      </Row>
      {
        openGroupChatRoom &&
        <GroupChatRoom chatRoomId={chatRoomId} />
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
                <Content><span>참가인원</span> {item.member.slice(1)}</Content>
              </Col>
              <Col span={6} style={centerStyle}>
                <Button onClick={() => { setOpenGroupChatRoom(true); setChatRoomId(item.id); joinGroupChatRoom(item.id); }}>입장하기</Button>
              </Col>
            </Row>
          )
        })
      }

    </div>
  )
}

export default GroupChat