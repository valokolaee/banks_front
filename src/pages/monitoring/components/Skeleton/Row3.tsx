import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';



const Row3: React.FC = () => (
    <RowFrame

        children1={[
            <Box flex={2} card>box 3-1-1</Box>,
        ]}

        children2={[
            <Box flex={1} vertical>
                <Box flex={2} card>box 1-1-2</Box>
                <Box flex={2} card>box 1-1-2</Box>
            </Box>,
            <Box flex={1} vertical>
                <Box flex={2}card >box 1-1-2</Box>
                <Box flex={2} card>box 1-1-2</Box>
            </Box>,
        ]}
    />
);

export default Row3;

