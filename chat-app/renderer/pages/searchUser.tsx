import React, { useEffect, useState } from 'react'
import { Input, Col, Row, Button } from 'antd'
import { StarOutlined, PlusSquareOutlined } from '@ant-design/icons';
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
    <div style={{ padding: "0px 10px", paddingTop : "70px" }}>
      {
        userList &&
        userList.map((item: item, i) => {
          return (
            <Row key={item.id} style={userBox}>
              <Col span={4}>
                <img src="/images/logo.png" alt="사진" width={60} />
              </Col>
              <Col span={16}>
                <Name>{item.name}</Name>
              </Col>
              <Col span={4} style={centerStyle}>
                <Button style={buttonStyle}  onClick={() => { getPersonalChat(item) }} >
                <PlusSquareOutlined />
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