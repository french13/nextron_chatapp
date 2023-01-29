import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

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
  return (
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px" }}>
      <Row style={adminBox}>
        <Col span={24}>
          <Title>나의 정보</Title>
        </Col>
      </Row>
      <Row style={adminBox}>
        <Col span={24}>
          <Title>로그아웃</Title>
        </Col>
      </Row>
    </div>
  )
}

export default MyPage