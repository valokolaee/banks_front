import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';



const Row1: React.FC = () => (


    <RowFrame
        children1={[
            <Box flex={2} >box 1-1-1</Box>,
            <Box flex={2} >box 1-1-2</Box>,
            <Box flex={1} >box 1-1-2</Box>,
        ]}
        children2={[
            <Box flex={1} >box 1-2-2</Box>,
            <Box flex={1} >box 1-2-2</Box>,
        ]}
    />




);

export default Row1;

