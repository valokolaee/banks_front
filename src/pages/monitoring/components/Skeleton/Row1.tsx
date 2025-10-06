import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';
import ContentBox from './ContentBox';
import svgList from '../../../../assets/icons/svgList';



const Row1: React.FC = () => (


    <RowFrame
        children1={[
            <Box flex={2} card>
                <ContentBox
                    fontSize={6}
                    color={{ name: 'green', num: 500 }}
                    title='Local Uptime' value={'1.66 days'} />
            </Box>,
            <Box flex={2} card>
                <ContentBox
                    fontSize={8}
                    color={{ name: 'green', num: 500 }}
                    title='Connected Peers' value={52}
                    svg={svgList.chart6}
                />
            </Box>,
            <Box flex={1} vertical card>
                <Box flex={1}>
                    <span className='block w-full text-center'>
                        Block Height
                    </span>
                </Box>
                <Box flex={2}>
                    <ContentBox
                        color={{ name: 'blue', num: 500 }}
                        title='Max Observed' value={87365} />
                </Box>
                <Box flex={2}>
                    <ContentBox
                        color={{ name: 'blue', num: 500 }}
                        title='Max Unvalidated' value={87237} />
                </Box>

            </Box>,
        ]}
        children2={[
            <Box flex={1} card>
                <ContentBox
                    fontSize={4}
                    color={{ name: 'blue', num: 500 }}
                    title='Last Best Tip (Slot Time)' value={'2:33 min'}
                    svg={svgList.chart1}
                />
            </Box>,

            <Box flex={1} vertical>
                <Box card >
                    <Box >
                        <Flex vertical style={{ width: '100%', justifyContent: 'space-between' }}>
                            <span className='block w-full text-center'>
                                Consensus
                            </span>

                            <Flex justify='space-between'>
                                <span>
                                    Delegator
                                </span>
                                <span className='text-xl'>
                                    3
                                </span>
                            </Flex>

                            <Flex justify='space-between'>
                                <span>
                                    Stacking KeyPairs
                                </span>
                                <span className='text-xl'>
                                    3
                                </span>
                            </Flex>

                        </Flex>
                    </Box>
                </Box>
                <Box card>
                    <Box  >
                        <Flex vertical style={{ width: '100%', justifyContent: 'space-between' }}>
                            <span className='block w-full text-center'>
                                Consensus
                            </span>

                            <Flex justify='space-between'>
                                <span>
                                    Delegator
                                </span>
                                <span className='text-xl'>
                                    3
                                </span>
                            </Flex>

                            <Flex justify='space-between'>
                                <span>
                                    Stacking KeyPairs
                                </span>
                                <span className='text-xl'>
                                    3
                                </span>
                            </Flex>

                        </Flex>
                    </Box>
                </Box>


            </Box>,
        ]}
    />




);

export default Row1;

