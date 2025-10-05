import { Flex } from 'antd';
import React, { ReactElement, ReactNode } from 'react';
import RowFrame from './RowFrame';
import { tstStyle, tstStyleBlue } from '../../../../styles/tstStyle';



const Box: React.FC<IBox> = ({ flex, children }) => (


    <Flex style={{
        height: 250, borderRadius: 5,
        margin: 3
        , ...tstStyleBlue
    }} flex={flex} >
        {children}
    </Flex >




);

export default Box;


export interface IBox {
    children?: ReactElement[] | ReactElement|ReactNode
    flex: number
}