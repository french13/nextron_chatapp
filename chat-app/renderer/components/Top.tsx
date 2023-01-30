import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'antd'
import Menu from './Menu'
import { useRouter } from 'next/router'
import { LeftOutlined } from '@ant-design/icons'
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth'

const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize : "1.5rem"
}
const topStyle: React.CSSProperties = {
    height : "50px",
}

const logoutStyle = {
    backgroundColor : "rgb(240, 140, 142)",
    borderRadius : "15px",
    color : "white",
    border : "none"
}

const Top = () => {

    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)


    const path = router.pathname
    console.log(path)


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
                router.push('/login')
            }
        })
    }, [])


    const logout = async () => {
        await signOut(auth)
            .then(() => {
            })
    }

    return (
        <div style={topStyle}>
            <Row style={{ padding: "5px 0", width : "100%", height: "100%"  }}>
                <Col onClick={() => { router.back() }} style={centerStyle} span={6}>
                    {
                        path === "/login" ?
                            null :
                            <LeftOutlined />
                    }

                </Col>
                <Col style={centerStyle} span={12}>

                    {
                        isLogin == true ?
                            <span>{auth.currentUser.displayName}</span> :
                            null
                    }

                </Col>
                <Col style={centerStyle} span={6}>
                    {
                        isLogin &&
                        <Button style={logoutStyle} onClick={logout}>로그아웃</Button>
                    }

                </Col>
            </Row>
            {
                path === "/login" || path === "/register" ?
                    null :
                    <Menu />
            }

        </div>
    )
}

export default Top