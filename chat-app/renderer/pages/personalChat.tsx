import React from 'react'
import styled from 'styled-components'
import {Col, Row} from 'antd'
import {CheckOutlined} from '@ant-design/icons'

const Name = styled.div`
height  : 50%;
display : flex;
justify-content : left;
align-items : center;
font-weight : 700
`

const Content = styled.div`
height  : 50%;
display : flex;
justify-content : left;
align-items : center;
font-weight : 700;
color : gray;
`

const centerStyle ={
    display : "flex",
    justifyContent : "space-around",
    alignItems : "center"
  }
  
  const userBox = {
    backgroundColor : "white", 
    marginTop : "10px", 
    padding : "5px",
    borderRadius : "5px"
  }
  

const PersonalChat = () => {
  return (
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px" }}>
    <Row style={userBox}>
    <Col span={4}>
      <img src="/images/logo.png" alt="사진" width={60}/>
    </Col>
    <Col span={16}>
      <Name>Mike</Name>
      <Content>안녕하세요</Content>
    </Col>
    <Col span={4} style={centerStyle}>
    <CheckOutlined />
    </Col>
  </Row>
  </div>
  )
}

export default PersonalChat