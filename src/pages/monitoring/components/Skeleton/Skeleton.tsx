import React from 'react';
import { Card, Flex, Layout, Space } from 'antd';
import RowFrame from './RowFrame';
import { tstStyle, tstStyleBlue, tstStyleOrange } from '../../../../styles/tstStyle';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';
import XXX from './XXX';



const Skeleton: React.FC = () => (
    <Flex style={{ margin: 5 }} vertical >
        <Row1 />
        <Row2 />
        <Row3 />
    </Flex>
);

export default Skeleton;

