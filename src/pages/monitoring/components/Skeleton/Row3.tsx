import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';
import ContentBox from './ContentBox';
import Row3XL from './Row3XL';
import svgList from '../../../../assets/icons/svgList';



const Row3: React.FC = () => (
    <RowFrame

        children1={[
            <Row3XL />
        ]}

        children2={[
            <Box flex={1} vertical>
                <Box flex={2} card>
                    <ContentBox
                        color={{ name: 'red', num: 200 }}
                        title='Snark Fee Per Block'
                        value={'0' }

                    />
                </Box>
                <Box flex={2} card>
                    <ContentBox
                        color={{ name: 'red', num: 200 }}
                        title='Snark Fee Per Block'
                        value={'2.3 min'}

                    />
                </Box>
            </Box>,
            <Box flex={1} vertical>
                <Box flex={2} card >
                    <ContentBox
                        color={{ name: 'red', num: 200 }}
                        title='Transaction Fee Per Block'
                        value={'0.000300'}
                        svg={svgList.chart6}
                    />
                </Box>
                <Box flex={2} card>
                    <ContentBox
                        color={{ name: 'red', num: 200 }}
                        title='Snark Fee Per Block'
                        value={'40 s'}

                    />
                </Box>
            </Box>,
        ]}
    />
);

export default Row3;

