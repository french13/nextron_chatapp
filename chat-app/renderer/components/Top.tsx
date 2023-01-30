import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import Menu from './Menu'
import { useRouter } from 'next/router'
import { LeftOutlined } from '@ant-design/icons'
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Link from 'next/link'

const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const Top = () => {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)


    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
            router.push('/login')
        }
    })

    const logout = async()=>{
      await signOut(auth)
        .then(()=>{
        })
    }

    return (
        <div style={{ height: "8vh" }}>
            <Row style={{ padding: "5px 0" }}>
                <Col style={centerStyle} span={6}>
                    <LeftOutlined />
                </Col>
                <Col style={centerStyle} span={12}>

                    {
                        isLogin == true ?
                            <span>{auth.currentUser.displayName}</span> :
                            <span>유저없음</span>
                    }

                </Col>
                <Col style={centerStyle} span={6}>
                    {
                        isLogin &&
                            <Button onClick={logout}>로그아웃</Button>
                    }

                </Col>
            </Row>
            <Menu />
        </div>
    )
}

export default Top