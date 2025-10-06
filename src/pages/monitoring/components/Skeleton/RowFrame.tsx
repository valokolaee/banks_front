import { Flex } from 'antd';
import React, { ReactElement } from 'react';
import useIsMobile from '../../../../hooks/useIsMobile';



const RowFrame: React.FC<IRowFrame> = ({ children1, children2, flex, children1flex = 2, children2flex = 1,        minHeight}) => {
    const _isMobile = useIsMobile()
    // console.log(_width);
    
    return (
    <Flex style={{minHeight}} vertical={_isMobile} flex={flex}>

        <Flex style={style} flex={children1flex} vertical={_isMobile}> {children1} </Flex>
        <Flex style={style} flex={children2flex} vertical={_isMobile}>{children2}</Flex>

    </Flex>
);
}
export default RowFrame;


const style: React.CSSProperties = {
    // minHeight:250
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
    children1?: ReactElement[] | ReactElement;
    children2?: ReactElement[] | ReactElement;
    children1flex?: number;
    children2flex?: number;
    flex?: number;
    minHeight?: number

}