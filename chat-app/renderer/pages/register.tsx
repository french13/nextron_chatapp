import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const inputStyle = {
    border : "solid 2px rgb(104, 135, 197)",
    borderRadius : "10px",
    height : "40px"
}

const Register = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [button, setButton] = useState(true)


    // 회원가입 후 db에 가입한 유저 정보 추가
    async function register() {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                alert('회원가입 성공')
                router.push('/login')
            })
            .catch((error) => {
                alert(error.message);
            });
        await updateProfile(auth.currentUser, { displayName: name })
            .then(() => { })
            .catch((error) => {
                alert(error.message);
            });
        await  setDoc(doc(db, "users", auth.currentUser.uid), {
            id: auth.currentUser.uid,
            name : name,
            email: email,
            time: serverTimestamp(),
          });
    }


    const enterName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [name])
    const enterEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [email])
    const enterPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [password])

    useEffect(()=>{
        if(name && email && password){
            setButton(false)
        }
    },[name, email, password])

    return (
        <div style={{ padding: "100px 50px" }}>
            <h1 style={{ textAlign: "center" }}>Sign up</h1>
            <Form onFinish={register}>
                <Form.Item name="name">
                    <Input style={inputStyle} type="text" placeholder="name" onChange={enterName} />
                </Form.Item>
                <Form.Item name="email">
                    <Input style={inputStyle} placeholder="email" onChange={enterEmail}/>
                </Form.Item>
                <Form.Item name="password">
                    <Input style={inputStyle} type="password" placeholder="Password" onChange={enterPassword}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: "100%", height : "40px", borderRadius : "10px" }} type="primary" htmlType="submit" disabled={button}>
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register