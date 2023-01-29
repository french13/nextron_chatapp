import React from 'react'
import { Radio, Row } from 'antd'
import { SearchOutlined, UserOutlined, TeamOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const menuSizeStyle: React.CSSProperties = {
    width: "33.3%",
    textAlign: "center"
}


const Menu = () => {
    const router = useRouter()

    // e : any 변경하기
    function goLink(e:any){
        router.push(`/${e.target.value}`)
    }

    return (
        <Row>
            <Radio.Group style={{ width: "100%" }}>
                <Radio.Button onClick={goLink} style={menuSizeStyle} value="searchUser">
                    <SearchOutlined />
                </Radio.Button>
                <Radio.Button onClick={goLink} style={menuSizeStyle} value="personalChat">
                    <UserOutlined />
                </Radio.Button>
                <Radio.Button onClick={goLink} style={menuSizeStyle} value="groupChat">
                    <TeamOutlined />
                </Radio.Button>
            </Radio.Group>
        </Row>
    )
}

export default Menu