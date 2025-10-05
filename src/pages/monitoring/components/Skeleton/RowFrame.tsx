import { Flex } from 'antd';
import React, { ReactElement } from 'react';



const RowFrame: React.FC<IRowFrame> = ({ children1, children2 }) => (
    <Flex style={style}>

        <Flex style={style} flex={2}> {children1} </Flex>
        <Flex style={style} flex={1}>{children2}</Flex>

    </Flex>
);

export default RowFrame;


const style: React.CSSProperties = {
    height:230
    // ...tstStyleBlue,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // marginBottom: 3
    // textAlign: 'center',
    // color: '#fff',
    // height: 64,
    // paddingInline: 48,
    // lineHeight: '64px',
    // backgroundColor: '#4096ff',
};


export interface IRowFrame {
    children1?: ReactElement[] | ReactElement
    children2?: ReactElement[] | ReactElement
}