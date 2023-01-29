import React from 'react'
import { Input, Col, Row, Button } from 'antd'
import { StarOutlined, MessageOutlined } from '@ant-design/icons';
import styled from 'styled-components'

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


const SearchUser = () => {


  return (
    <div style={{ backgroundColor: "lightgray", padding: "10px 10px" }}>

      <Input placeholder="Search User" style={{border : 0, borderRadius : "5px"}}/>
      
      <Row style={userBox}>
        <Col span={4}>
          <img src="/images/logo.png" alt="사진" width={60}/>
        </Col>
        <Col span={14}>
          <Name>Mike</Name>
          <Content>나는 Mike 입니다</Content>
        </Col>
        <Col span={6} style={centerStyle}>
          <Button >
            <StarOutlined />
          </Button>
          <Button>
            <MessageOutlined />
          </Button>
        </Col>
      </Row>
      
    </div>
  )
}

export default SearchUser