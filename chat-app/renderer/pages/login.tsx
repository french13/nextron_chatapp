import React, {useEffect, useState} from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Link from 'next/link';

const Login = () => {
    const router = useRouter()
    const [email, setEmail]=useState("")
    const [password, setPassword] = useState("")


    const login = ()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((res)=>{
            loginCheck()
        })
    }


    const loginCheck = ()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                router.push('/searchUser')
            }else{

            }
        })
    }
   
 


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
                    <Link href={'/register'}>
                    <Button style={{width : "100%"}}>회원가입</Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login