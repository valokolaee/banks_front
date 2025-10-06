import { Flex } from 'antd';
import React from 'react';
import RowFrame from './RowFrame';
import Box from './Box';
import { BarChart, LineChart } from '@mui/x-charts';
import {
    worldElectricityProduction,
    keyToLabel,
    colors,
} from './worldElectricityProduction';
const stackStrategy = {
    stack: 'total',
    area: true,
    stackOffset: 'none',
} as const;

export const customize = {
    // height: 350,
    hideLegend: true,
    experimentalFeatures: { preferStrictDomainInLineCharts: true },
};


const margin = { right: 5, left: 0 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];


const sx = {
    // Change x-axis font color
    '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
        fill: 'white',
    },
    // Change y-axis font color
    '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
        fill: 'white',
    },
}


const Row2: React.FC = () => (


    <RowFrame
        children1={[
            <Box flex={1} card>
                <LineChart
                    // fontStyle={10}
                    axisHighlight={{
                        // x:'band'
                    }}
                    xAxis={[
                        { dataKey: 'year', valueFormatter: (value: number) => value.toString() },
                    ]}
                    // yAxis={[{ width: 50 }]}
                    series={Object.keys(keyToLabel).map((key) => ({
                        dataKey: key,
                        label: keyToLabel[key],
                        color: colors[key],
                        showMark: false,
                        ...stackStrategy,
                    }))}
                    dataset={worldElectricityProduction}
                    {...customize}
                    margin={margin}
                    sx={sx}
                />

            </Box>,
            <Box flex={1} card>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    margin={margin}
                    sx={sx}
                />
            </Box>,

        ]}
        children2={[
            <Box flex={1} card><LineChart
                series={[
                    { data: pData, label: 'pv' },
                    { data: uData, label: 'uv' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
                yAxis={[{ width: 50 }]}
                margin={margin}
                sx={sx}
            /></Box>,
        ]}
    />




);

export default Row2;

