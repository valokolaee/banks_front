import { Flex } from 'antd';
import React, { ReactElement, ReactNode } from 'react';
import RowFrame from './RowFrame';
import { tstStyle, tstStyleBlue } from '../../../../styles/tstStyle';



const Box: React.FC<IBox> = ({ flex, children, vertical, card }) => {

    const cardStyle = card ? style : {}

    return (
        <Flex
            vertical={vertical}
            style={{ ...cardStyle }}
            flex={flex}
        >
            {children}
        </Flex >
    );
}

export default Box;

export interface IBox {
    children?: ReactElement[] | ReactElement | ReactNode
    flex: number;
    vertical?: boolean;
    card?: boolean;

}



const style: React.CSSProperties = {
    // height: 230,
    borderRadius: 5,
    marginBottom: 3,
    marginRight: 3,
...tstStyle
    // backgroundColor: '#ccc',
}