import React, { useEffect, useState } from 'react'
import { Input, Col, Row, Button } from 'antd'
import { StarOutlined, MessageOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../firebase';


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

interface item {
  email: string;
  name: string;
  id: string;
  time: string;
}

const SearchUser = () => {
  const [userList, setUserList] = useState([])

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let box = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().id !== auth.currentUser.uid) {
        box.push(doc.data())
      }
    });
    setUserList(box)
  }

  useEffect(() => {
    getUsers()
  }, [])


  const getPersonalChat = async(item : item) => {
    const personalChatCode = item.id > auth.currentUser.uid ?
    item.id + auth.currentUser.uid : auth.currentUser.uid + item.id

    const docRef = doc(db, "personalChat", personalChatCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("이미 존재하는 채팅방 입니다")
    } else {
      alert("채팅방이 생성되었습니다");
      createPersonalChat(item, personalChatCode)
    }

  }

  const createPersonalChat = async(item: item, personalChatCode : string) => {
    await setDoc(doc(db, "personalChat", personalChatCode), {
      id: personalChatCode,
      member : [auth.currentUser.displayName, item.name],
      date: serverTimestamp(),
    });
  }



  return (
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px" }}>

      <Input placeholder="Search User" style={{ border: 0, borderRadius: "5px" }} />
      {
        userList &&
        userList.map((item: item, i) => {
          return (
            <Row key={item.id} style={userBox}>
              <Col span={4}>
                <img src="/images/logo.png" alt="사진" width={60} />
              </Col>
              <Col span={14}>
                <Name>{item.name}</Name>
              </Col>
              <Col span={6} style={centerStyle}>
                <Button >
                  <StarOutlined />
                </Button>
                <Button  onClick={() => { getPersonalChat(item) }} >
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

export default SearchUser