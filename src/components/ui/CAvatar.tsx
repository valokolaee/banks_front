import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from "../../redux/hooks";
import { AvatarSize } from "antd/es/avatar/AvatarContext";

export default ({ url, shape, size }: {
    shape?: 'circle' | 'square';
    size?: AvatarSize;
    url?: string
}) => {
    console.log('url', url);
    console.log('size', size);

    return (<Avatar
        shape={shape}
        src={url}
        size={size}
        icon={<UserOutlined />}
    />)
}

