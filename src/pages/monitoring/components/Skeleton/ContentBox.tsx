import { Flex } from 'antd';
import React, { ReactElement, ReactNode } from 'react';
import RowFrame from './RowFrame';
import { tstStyle, tstStyleBlue } from '../../../../styles/tstStyle';
import { numString } from 'mrv-utils';



const Box: React.FC<IContentBox> = ({  title,value}) => (
    <Flex
        style={{
            minHeight: 230,
            borderRadius: 5,
            margin: 3,
            ...tstStyleBlue
        }}
         >
        {title}
    </Flex >
);

export default Box;

export interface IContentBox {
    title: string;
    value: numString;
    color: string;


}