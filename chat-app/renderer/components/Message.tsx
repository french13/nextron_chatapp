
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Input, Row } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { db, auth } from '../../firebase'
import { collection, getDocs, doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";





const textLeft :React.CSSProperties = {
    width: "100%", 
    backgroundColor: "red",
     textAlign : "left"
    }
const textRight :React.CSSProperties = {
    width: "100%", 
    backgroundColor: "red",
     textAlign : "right"
    }

const Message = ({ item }) => {
    const [isCurrentUser, setIsCurrentUser] = useState(textLeft)

    useEffect(()=>{
        if(item.name == auth.currentUser.displayName){
            setIsCurrentUser(textRight)
        }else{
            setIsCurrentUser(textLeft)
        }
    },[])

    return (
        <div style={isCurrentUser}>
            <div>{item.name}</div>
            <div>{item.message}</div>
        </div>
    )
}

export default Message