import { Flex } from 'antd';
import React, { ReactElement, ReactNode } from 'react';
import RowFrame from './RowFrame';
import { tstStyle, tstStyleBlue } from '../../../../styles/tstStyle';



const Box: React.FC<IBox> = ({ flex = 1, children, vertical, card  }) => {

    const cardStyle = card ? style : {}

    return (
        <Flex
            // wrap='wrap'
            vertical={vertical}
            style={{ ...cardStyle }}
            flex={flex}
            className={!card?'':'bg-gray-800'}
        >
            {children}
        </Flex >
    );
}

export default Box;

export interface IBox {
    children?: ReactElement[] | ReactElement | ReactNode
    flex?: number;
    vertical?: boolean;
    card?: boolean;
 
}



const style: React.CSSProperties = {
    // height: 230,
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 5,
    // ...tstStyle,
    // backgroundColor: 'rgba(0,0,0,0.3)',
}