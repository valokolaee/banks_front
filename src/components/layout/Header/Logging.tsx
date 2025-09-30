import React from 'react';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
 import { useAppSelector } from '../../../redux/hooks';
import { setUser, setUserAvatar } from '../../../redux/actions';
import { logout } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import CAvatar from '../../ui/CAvatar';



const Logging: React.FC = () => {
    const _user = useAppSelector((s) => s.userSlice)
    const navigate = useNavigate();

    const _login = () => {
        navigate('/login')
    }
    const _profile = () => {
        navigate('/profile')
    }
    const _register = () => {
        navigate('/register')
    }


    const _logOut = () => {
        setUser({})
        setUserAvatar('')
    }

    const _log = !!!_user.token ? {
        key: '4',
        label: 'login',
        icon: <LoginOutlined />,
        onClick:  _login,
        extra: '⌘S',
    } : {
        key: '4',
        label: 'logout',
        icon: <LogoutOutlined />,
            onClick: _logOut,
        extra: '⌘S',
    }
 

    
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: _user.username||'',
            icon: <UserOutlined />,
        },
        {
            type: 'divider',
        },
        // {
        //     key: '2',
        //     label: 'Profile',
        //     extra: '⌘P',
        //     onClick:_profile
        
        // },
        {
            key: '3',
            label: 'Register',
            extra: '⌘P',
            onClick: _register
        
        },
        _log

    ];
    return (
        <Dropdown menu={{ items }}>
            {/* <a onClick={(e) => e.preventDefault()}> */}
            <Space>
                <CAvatar url={_user.profileImage!}/>
            </Space>
            {/* </a> */}
        </Dropdown>
    );
}
export default Logging;