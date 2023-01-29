import React from 'react'
import { Button, Col, Row } from 'antd'
import Menu from './Menu'
import { useRouter } from 'next/router'
import { LeftOutlined } from '@ant-design/icons'

const centerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const Top = () => {
    const router = useRouter()

    function goLogin(){
        router.push('/login')
    }


    return (
        <>
            <Row style={{ padding: "5px 0"}}>
                <Col onClick={()=>{router.back()}} style={centerStyle} span={6}>
                <LeftOutlined />
                </Col>
                <Col style={centerStyle} span={12}>
                    <div>로고</div>
                </Col>
                <Col style={centerStyle} span={6}>
                    <Button onClick={goLogin}>로그인</Button>
                </Col>
            </Row>
            <Menu/>
        </>
    )
}

export default Top