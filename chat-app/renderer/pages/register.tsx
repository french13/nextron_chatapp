import React from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'

const Register = () => {
    const router = useRouter()



    return (
        <div style={{ padding: "100px 50px" }}>
            <h1 style={{textAlign : "center"}}>Sign up</h1>
            <Form onFinish={() => { console.log(1) }}>
                <Form.Item name="email">
                    <Input placeholder="email" />
                </Form.Item>
                <Form.Item name="password">
                    <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item name="passwordCheck">
                    <Input type="password" placeholder="PasswordCheck" />
                </Form.Item>
                <Form.Item name="Introduce Myself">
                    <Input type="textarea" placeholder="Introduce Myself" />
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: "100%" }} type="primary" htmlType="submit" >
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register