import React, {useState} from 'react'
import { Button, Col, Row } from 'antd'
import Menu from './Menu'
import { useRouter } from 'next/router'
import { LeftOutlined } from '@ant-design/icons'
import { auth } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth'

const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const Top = () => {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)

    function goLogin(){
        router.push('/login')
    }

    onAuthStateChanged(auth, (user)=>{
        if(user){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    })


    return (
        <div style={{height : "8vh"}}>
            <Row style={{ padding: "5px 0"}}>
                <Col onClick={()=>{router.back()}} style={centerStyle} span={6}>
                <LeftOutlined />
                </Col>
                <Col style={centerStyle} span={12}>
                  
                        {
                            isLogin == true ?
                           <span>{auth.currentUser.displayName}</span>:
                            <span>유저없음</span>
                        }
                  
                </Col>
                <Col style={centerStyle} span={6}>
                    <Button onClick={goLogin}>로그인</Button>
                </Col>
            </Row>
            <Menu/>
        </div>
    )
}

export default Top