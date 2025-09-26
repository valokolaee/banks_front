import React, { useRef } from 'react';
import {
  Form,
  FormProps,
  Input,
  Select
} from 'antd';
import CText from '../components/ui/CText';
import CLink from '../components/ui/CLink';
import WebService, { IWebServiceFuncs } from '../webService';
import { useNavigate } from 'react-router-dom';
import IRegisterReq, { IRegisterRes } from '../webService/ApiUrls/apis/IRegister';
import apis from '../webService/ApiUrls/apis';
import CButton from '../components/ui/CButton';
import { setUser } from '../redux/actions';
import IUser from '../intrfaceces/IUser';
import { NotificationPlacement } from 'antd/es/notification/interface';
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';
import { Button, Divider, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';


const FormDisabledDemo: React.FC = () => {
  const refWebService = useRef<IWebServiceFuncs>()

  const navigate = useNavigate();

  interface FieldType extends IRegisterReq {
    confirm?: string;
  };
  //   const xxx: FieldType = {

  // }
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
    values = { ...values, confirm: undefined }
    const x = await refWebService?.current?.callApi<IRegisterRes>(apis.auth.register(values));

    console.log('xxx', x);


    if (x?.success) {
      setUser(x.data as IUser)
      navigate('/account')
    } else {
      openNotification(x?.message || 'Registration failed') }


  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


   const [api, contextHolder] = notification.useNotification();

  const openNotification = (message:string) => {
     
    api.info({
      message,
      // description:`yesterday you said tomorrow, so just do it!`,
      placement:'topRight',
      showProgress: true,
      pauseOnHover: true,
    });
  };

  return (
    <div>
      {contextHolder}

      <h2 >Register</h2>

      <Form
        name="Register"

        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: '30%' }}
        layout="horizontal"
        style={{ maxWidth: '80%' }}
        autoComplete='off'
      >

        <Form.Item
          label={<label style={{ color: "white" }}>Username</label>}
          name="username"
          // rules={[{ required: true, message: 'Please input your username!' }]}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('username').length >= 3) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("username length must be at least 3 characters long"));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "white" }}>Email</label>}
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "white" }}>Password</label>}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password').length >= 6) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("password length must be at least 6 characters long"));
              },
            }),
          ]} hasFeedback
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          name="confirm"

          label={<label style={{ color: "white" }}>Confirm Password</label>}

          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          label={<label style={{ color: "white" }}>Client Type</label>}
          name="clientType"
          rules={[{ required: true, message: 'Please input your client type!' }]}

        >
          <Select>

            <Select.Option value="individual">Individual</Select.Option>
            <Select.Option value="financial_entities">Financial Entity</Select.Option>
            <Select.Option value="business">Business</Select.Option>

          </Select>
        </Form.Item>

        <Form.Item label={null} className='none'>
          <CButton title='Submit' />
          <WebService ref={refWebService} />

          <CText text={`Already have Id?`} className="block mt-5 " />
          <CLink
            to={'/login'}
            title="login"
          />


        </Form.Item>



      </Form>
      
    </div>
  );
};

export default () => <FormDisabledDemo />;



// // src/pages/Register.tsx

// import { useState } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { registerUser } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useAppSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     clientType: "individual", // default valid option
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await dispatch(registerUser(form));
//     if (registerUser.fulfilled.match(result)) {
//       navigate("/account");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto" }}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         <select
//           title="yes"
//           name="clientType"
//           value={form.clientType}
//           onChange={handleChange}
//           required
//         >
//           <option value="individual">Individual</option>
//           <option value="financial_entities">Financial Entity</option>
//           <option value="business">Business</option>
//         </select>

//         <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
//           {loading ? "Registering..." : "Register"}
//         </button>

//         {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;
