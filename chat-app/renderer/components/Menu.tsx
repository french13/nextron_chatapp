import React, {useEffect, useState} from 'react'
import { Row, Button, Col } from 'antd'
import {CommentOutlined , UserOutlined, MessageOutlined} from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const menuSizeStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
const buttonStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width : "70%",
    fontSize : "1.5rem",
    height : "90%",
    border : "solid 2px rgb(104, 135, 197)",
    borderRadius : "15px",
    color : "rgb(104, 135, 197)"
}
const ClickButtonStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width : "70%",
    fontSize : "1.5rem",
    height : "90%",
    border : "solid 2px rgb(104, 135, 197)",
    borderRadius : "15px",
    color : "white",
    backgroundColor : "rgb(104, 135, 197)"
}



const Menu = () => {

    const router = useRouter()
    const path = router.pathname
    
    const [userButton, setUserButton] = useState(buttonStyle)
    const [personalButton, setPersonalButton] = useState(buttonStyle)
    const [groupButton, setGroupButton] = useState(buttonStyle)

    useEffect(()=>{
        if(path === "/searchUser"){
            setUserButton(ClickButtonStyle)
        }else{
            setUserButton(buttonStyle)
        }
        if(path === "/personalChat"){
            setPersonalButton(ClickButtonStyle)
        }else{
            setPersonalButton(buttonStyle)
        }
        if(path === "/groupChat"){
            setGroupButton(ClickButtonStyle)
        }else{
            setGroupButton(buttonStyle)
        }
        
    },[path])
  


    return (
        <Row style={{ height: "50px", marginTop : "15px" }}>

            <Row style={{ width: "100%" }}>
                <Col span={8} style={menuSizeStyle}>
                    <Button style={userButton} onClick={() => { router.push('/searchUser') }} value="searchUser">
                    <UserOutlined />
                    </Button>
                </Col>
                <Col span={8} style={menuSizeStyle}>
                    <Button  style={personalButton}  onClick={() => { router.push('/personalChat') }} value="personalChat">
                    <MessageOutlined />
                    </Button>
                </Col>
                <Col span={8} style={menuSizeStyle}>
                    <Button  style={groupButton}  onClick={() => { router.push('/groupChat') }} value="groupChat" >
                    <CommentOutlined />
                    </Button>
                </Col>
            </Row>
        </Row>
    )
}

export default Menu