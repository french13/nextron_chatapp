import React from 'react'
import { Radio, Row } from 'antd'
import { SearchOutlined, UserOutlined, TeamOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const menuSizeStyle: React.CSSProperties = {
    width: "33.3%",
    textAlign: "center"
}


const Menu = () => {

    return (
        <Row>
            <Radio.Group style={{ width: "100%" }}>
                <Link href={'/searchUser'}>
                <Radio.Button style={menuSizeStyle} value="searchUser">
                    <SearchOutlined />
                </Radio.Button>
                </Link>
                <Link href={'/personalChat'}>
                <Radio.Button style={menuSizeStyle} value="personalChat">
                    <UserOutlined />
                </Radio.Button>
                </Link>
                <Link href={'/groupChat'}>
                <Radio.Button style={menuSizeStyle} value="groupChat">
                    <TeamOutlined />
                </Radio.Button>
                </Link>
            </Radio.Group>
        </Row>
    )
}

export default Menu