import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'

const Login = () => {
   const router = useRouter()



    return (
        <div style={{ padding: "100px 40px" }}>
            <h1 style={{textAlign : "center"}}>Login</h1>
            <Form onFinish={() => { console.log(1) }}>
                <Form.Item name="email">
                    <Input placeholder="email" />
                </Form.Item>
                <Form.Item name="password">
                    <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button style={{width : "100%"}} type="primary" htmlType="submit" >
                        Log in
                    </Button>
                    <br /><br />
                    <Button onClick={()=>{router.push('/register')}} style={{width : "100%"}}>회원가입</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login