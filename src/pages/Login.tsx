// src/pages/Login.tsx
import { useRef, useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { Router, useNavigate } from "react-router-dom";

import type { FormProps } from 'antd';
import { Checkbox, Form, Input } from 'antd';
import CButton from '../components/ui/CButton';
import CLink from "../components/ui/CLink";
import CText from "../components/ui/CText";
import WebService, { IWebService, IWebServiceFuncs } from "../webService";
import apis from "../webService/ApiUrls/apis";
import PrimaryButton from "../components/ui/PrimaryButton";
import ILoginReq, { ILoginRes } from "../webService/ApiUrls/apis/ILogin";
import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "../hooks";
import IUser from "../intrfaceces/IUser";
import { setUser } from "../redux/actions";
// import Background from "../components/ui/Background";

const Login = () => {
  const refWebService = useRef<IWebServiceFuncs>()

  const navigate = useNavigate();

  interface FieldType extends ILoginReq {
    remember?: boolean;

  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    values={...values,remember:undefined}
    const x = await refWebService?.current?.callApi<ILoginRes>(apis.auth.login(values))
    console.log('xxx', x);

    if (x?.success) {
      setUser( x.data as IUser)
      navigate('/account')
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

// git@github.com:valokolaee/banks_front.git

  return (

    <div >

      <h2>login</h2>


      <Form
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: '30%' }}
        layout="horizontal"
        style={{ maxWidth: '80%' }}
        // autoComplete=""
        initialValues={{ remember: true }}

      >
        <Form.Item<FieldType>
          label={<label style={{ color: "white" }}>Username</label>}
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={<label style={{ color: "white" }}>Password</label>}

          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType> name="remember" valuePropName="checked"
          label={<label style={{ color: "white" }}>Remember me</label>}
        >
          <Checkbox/>
        </Form.Item>
        <Form.Item label={null}>
          <CButton title='Submit' />
          <WebService ref={refWebService} />

          <CText text={`Don't have Id?`} className="block mt-5 " />
          <CLink
            to={'/register'}
            title="register"
          />

        </Form.Item>
      </Form>

    </div>
  );
};

export default Login;







