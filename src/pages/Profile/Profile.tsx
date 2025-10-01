import {
  Flex,
  Form,
  FormProps,
  Input,
  notification,
  Select
} from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CButton from '../../components/ui/CButton';
import CLink from '../../components/ui/CLink';
import CText from '../../components/ui/CText';
import IUser from '../../intrfaceces/IUser';
import { setUser, setUserAvatar, setUserLogo } from '../../redux/actions';
import WebService, { IWebServiceFuncs } from '../../webService';
import apis from '../../webService/ApiUrls/apis';
import IRegisterReq, { IRegisterRes } from '../../webService/ApiUrls/apis/IRegister';
import Icon, { EditOutlined } from '@ant-design/icons';
import CAvatar from '../../components/ui/CAvatar';
import { useAppSelector } from '../../redux/hooks';
import ImageUploader from "../../components/ui/CUploader";
import { Content } from 'antd/es/layout/layout';
import AvatarUploader from '../../components/ui/CImageUploader';
import IResponse from '../../webService/ApiUrls/apis/IResponse';


const Profile: React.FC = () => {
  const refWebService = useRef<IWebServiceFuncs>()
  const [_disabled, set_disabled] = useState<boolean>(true)
  const navigate = useNavigate();
  const _user = useAppSelector((s) => s.userSlice)

  interface FieldType extends IRegisterReq {
  };
  //   const xxx: FieldType = {

  // }
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values);
    values = { ...values, }
    const x = await refWebService?.current?.callApi<IRegisterRes>(apis.auth.register(values));

    console.log('xxx', x);


    if (x?.success) {
      setUser(x.data as IUser)
      setUserAvatar('')
      navigate('/account')
    } else {
      openNotification(x?.message || 'Registration failed')
    }


  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {

    api.info({
      message,
      // description:`yesterday you said tomorrow, so just do it!`,
      placement: 'topRight',
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const _setDisabled = () => {
    set_disabled(!_disabled)
  }
  return (
    <div>
      {contextHolder}
      <div className='inline'>
        <div className='inline'>
          <h2 >Profile</h2>
        </div>
        {/* <EditOutlined onClick={_setDisabled} /> */}
      </div>


      <Form
        name="EditProfile"
        // disabled={_disabled}
        aria-disabled
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: '30%' }}
        layout="horizontal"
        style={{ maxWidth: '80%' }}
        autoComplete='off'
        initialValues={_user}
      >

        <Form.Item label={<label style={{ color: "white" }}></label>}>
          <Flex align='baseline'>

            <AvatarUploader
              
              avatar={{
                url: _user?.profileImage! + '&a=' + new Date(),
                size: 150,
              }}


              uploader={{
                apiModel: apis.users.updateAvatar,
                callBack(res) { setUserAvatar(res.data.url + '?a=' + new Date()) },
                label: 'Upload Avatar'
              }}

            />

            <AvatarUploader

              avatar={{
                size: 100,
                url: _user?.logoUrl! + '&a=' + new Date(),
              }}

              uploader={{
                apiModel: apis.users.updateLogo,
                callBack(res) { setUserLogo(res.data.url + '?a=' + new Date()) },
                label: 'Upload Logo'
              }}

            />
          </Flex>
        </Form.Item>
        <Form.Item
          label={<label style={{ color: "white" }}>Username</label>}
          name="username"

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

        {/* <Form.Item
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
        </Form.Item> */}


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

export default () => <Profile />;


