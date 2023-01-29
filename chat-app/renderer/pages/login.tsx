import React, {useEffect, useState} from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
    const router = useRouter()
    const [email, setEmail]=useState("")
    const [password, setPassword] = useState("")


    const login = ()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((res)=>{
            alert(res.user.displayName+"님 반갑습니다")
            router.push('/searchUser')
        })
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                router.push('/personalChat')
            }
        })
    },[])


    return (
        <div style={{ padding: "100px 40px" }}>
            <h1 style={{textAlign : "center"}}>Login</h1>
            <Form onFinish={login}>
                <Form.Item name="email">
                    <Input placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Item>
                <Form.Item name="password">
                    <Input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
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