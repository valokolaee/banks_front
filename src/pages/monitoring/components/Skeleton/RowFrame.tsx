import { Flex } from 'antd';
import React, { ReactElement } from 'react';
import useIsMobile from '../../../../hooks/useIsMobile';



const RowFrame: React.FC<IRowFrame> = ({ children1, children2 }) => {
    const _isMobile = useIsMobile()
    // console.log(_width);
    
    return (
    <Flex style={style} vertical={_isMobile}>

        <Flex style={style} flex={2} vertical={_isMobile}> {children1} </Flex>
        <Flex style={style} flex={1} vertical={_isMobile}>{children2}</Flex>

    </Flex>
);
}
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