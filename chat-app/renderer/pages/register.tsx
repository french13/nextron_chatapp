import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const Register = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


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

    return (
        <div style={{ padding: "100px 50px" }}>
            <h1 style={{ textAlign: "center" }}>Sign up</h1>
            <Form onFinish={register}>
                <Form.Item name="name">
                    <Input type="textarea" placeholder="name" onChange={enterName} />
                </Form.Item>
                <Form.Item name="email">
                    <Input placeholder="email" onChange={enterEmail}/>
                </Form.Item>
                <Form.Item name="password">
                    <Input type="password" placeholder="Password" onChange={enterPassword}/>
                </Form.Item>
                <Form.Item name="passwordCheck">
                    <Input type="password" placeholder="PasswordCheck" />
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