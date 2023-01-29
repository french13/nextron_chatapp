import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from 'next/router';

const Title = styled.div`
height  : 100%;
display : flex;
justify-content : center;
align-items : center;
font-weight : 700
`


const adminBox = {
  backgroundColor: "white",
  marginTop: "10px",
  padding: "5px",
  borderRadius: "5px"
}


const MyPage = () => {
  const router = useRouter()


  return (
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px" }}>
      <Row style={adminBox}>
        <Col span={24}>
          <Title>나의 정보</Title>
        </Col>
      </Row>
      <Row style={adminBox}>
        <Col onClick={() => {
          signOut(auth).then(() => {
            alert('로그아웃 되었습니다')
            router.push('/login')
          })
        }} span={24}>
          <Title>로그아웃</Title>
        </Col>
      </Row>
    </div>
  )
}

export default MyPage