import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {AliwangwangOutlined} from '@ant-design/icons'

const inputStyle = {
    border : "solid 2px rgb(104, 135, 197)",
    borderRadius : "10px",
    height : "40px"
}

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [button, setButton] = useState(true)


    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {

            }).catch(()=>{
                alert("로그인 실패")
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/searchUser')
            } else {

            }
        })
    }, [])

    const goRegister = async () => {
        await router.push('/register')
    }

    useEffect(()=>{
        if(email && password){
            setButton(false)
        }
    },[ email, password])


    return (
        <div style={{ padding: "100px 40px" }}>
            <h1 style={{ textAlign: "center", fontSize : '2.7rem', color : "rgb(104, 135, 197)" }}>
            <AliwangwangOutlined /> The Chat
            </h1>
            <Form onFinish={login}>
                <Form.Item name="email">
                    <Input style={inputStyle} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </Form.Item>
                <Form.Item name="password">
                    <Input style={inputStyle} type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Item>
                <Form.Item>
                    <Button  disabled={button} style={{ width: "100%", height : "40px",  borderRadius : "10px"  }} type="primary" htmlType="submit" >
                        Log in
                    </Button>
                    <br /><br />

                    <Button onClick={goRegister} style={{ width: "100%", border : "none", color : "blue" }}>회원가입</Button>

                </Form.Item>
            </Form>
        </div>
    )
}

export default Login