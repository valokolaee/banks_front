import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';



const Row3: React.FC = () => (
    <RowFrame

        children1={[
            <Box flex={2} >box 3-1-1</Box>,
        ]}

        children2={[
            <Box flex={2} >box 3-1-1</Box>,
        ]}
    />
);

export default Row3;

