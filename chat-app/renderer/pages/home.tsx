import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Layout,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Row,
  Col
} from 'antd';

const {
  Header,
  Content,
} = Layout;
const { Item: FormItem } = Form;
const { Option } = Select;

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-ant-design)</title>
      </Head>

    </React.Fragment>
  );
};

export default Home;
