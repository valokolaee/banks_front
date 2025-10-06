import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';
import ContentBox from './ContentBox';
import useIsMobile from '../../../../hooks/useIsMobile';
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,

} from '@mui/x-charts/Gauge';
import { RadarChart } from '@mui/x-charts';
import { customize } from './Row2';

function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
        // No value to display
        return null;
    }

    const target = {
        x: cx + outerRadius * Math.sin(valueAngle),
        y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
        <g>
            <circle cx={cx} cy={cy} r={5} fill="red" />
            <path
                d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                stroke="red"
                strokeWidth={3}
            />
        </g>
    );
};


const Row3XL: React.FC = () => {
    const _isMobile = useIsMobile()

    return (
        <RowFrame
            children1flex={2}
            children2flex={3}
            flex={2}
            children1={

                <Flex vertical flex={2}>
                    <Box card>
                        <ContentBox
                            title='Farm Hash Rate'
                            color={{ name: 'green', num: 500 }}
                            value={'16.48 kh/s'}
                        />
                    </Box>
                    <Box card>
                        <ContentBox
                            title='Wallet Balance'
                            color={{ name: 'green', num: 500 }}
                            value={'16.48 XMR'}
                        />
                    </Box>
                </Flex>
            }
            children2={

                <Flex vertical flex={3}>
                    <RowFrame
                        children1flex={1}
                        children2flex={1}
                        children1={

                            <Box card >

                                <GaugeContainer
                                    // width={200}
                                    height={150}
                                    startAngle={-110}
                                    endAngle={110}
                                    value={30}
                                >
                                    <GaugeReferenceArc />
                                    <GaugeValueArc />
                                    <GaugePointer />
                                </GaugeContainer>
                            </Box>
                        }
                        children2={

                            <Box card >
                                <RadarChart
                                    height={150}

                                    series={[
                                        { label: 'USA', data: [6.65, 2.76, 5.15, 0.19, 0.07, 0.12], valueFormatter },
                                        {
                                            label: 'Australia',
                                            data: [5.52, 5.5, 3.19, 0.51, 0.15, 0.11],
                                            valueFormatter,
                                        },
                                        {
                                            label: 'United Kingdom',
                                            data: [2.26, 0.29, 2.03, 0.05, 0.04, 0.06],
                                            valueFormatter,
                                        },
                                    ]}
                                    radar={{
                                        metrics: ['Oil', 'Coal', 'Gas', 'Flaring', 'Other\nindustry', 'Cement'],
                                    }}
                                    {...customize}

                                />
                            </Box>
                        }
                    />

                    <RowFrame
                        children1flex={1}
                        children2flex={1}
                        flex={1}
                        children1={

                            <Box card >
                                <ContentBox
                                    title='Miner 1 Algo'
                                    color={{ name: 'green', num: 500 }}
                                    value={'CN/Heavy sth'}
                                    fontSize={4}
                                />
                            </Box>

                        }
                        children2={<Box card >
                            <ContentBox
                                title='Miner 2 Algo'
                                color={{ name: 'green', num: 500 }}
                                value={'CN/Heavy sth'}
                                fontSize={4}
                            />
                        </Box>
                        }
                    />
                </Flex>


            }
        // flex={2}
        />


    )
};

export default Row3XL;

function valueFormatter(v: number | null) {
    if (v === null) {
        return 'NaN';
    }
    return `${v.toLocaleString()}t CO2eq/pers`;
}