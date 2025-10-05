import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';



const Row2: React.FC = () => (


    <RowFrame
        children1={[
            <Box flex={1} card>box 2-1-1</Box>,
            <Box flex={1} card>box 2-1-2</Box>,
            
        ]}
        children2={[
            <Box flex={1} card>box 2-2-1</Box>,
        ]}
    />




);

export default Row2;

