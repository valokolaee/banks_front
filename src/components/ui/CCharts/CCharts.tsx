import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { BarChart, type BarLabelProps, type BarProps } from '@mui/x-charts/BarChart';
import { useAnimate, useAnimateBar, useDrawingArea } from '@mui/x-charts/hooks';
import { PiecewiseColorLegend } from '@mui/x-charts/ChartsLegend';
import { interpolateObject } from '@mui/x-charts-vendor/d3-interpolate';
import Box from '@mui/material/Box';
import { dataset, valueFormatter } from './weather';
// import votesTurnout from '../dataset/votes.json';

export default function ShinyBarChartHorizontal() {
    return (
        <Box width="100%">
            <Typography marginBottom={2}>
                European countries with lowest & highest voter turnout
            </Typography>
            <BarChart
                height={300}
                dataset={[
                
                    { "country": "Belgium", "turnout": 89.2 },
                    { "country": "Sweden", "turnout": 87.2 },
                    { "country": "Denmark", "turnout": 84.6 },
                    { "country": "Malta", "turnout": 84.0 },
                    { "country": "Germany", "turnout": 76.2 },
                    { "country": "France", "turnout": 74.5 },
                    { "country": "Netherlands", "turnout": 72.9 },
                    { "country": "Portugal", "turnout": 66.2 },
                    { "country": "Spain", "turnout": 65.9 },
                    { "country": "Finland", "turnout": 64.4 },
                    { "country": "Ireland", "turnout": 62.0 },
                    { "country": "Italy", "turnout": 61.4 },
                    { "country": "Austria", "turnout": 59.8 },
                    { "country": "Greece", "turnout": 58.6 },
                    { "country": "Czech Republic", "turnout": 57.0 },
                    { "country": "Hungary", "turnout": 56.3 },
                    { "country": "Poland", "turnout": 54.9 },
                    { "country": "Slovakia", "turnout": 54.5 },
                    { "country": "Croatia", "turnout": 53.5 },
                    { "country": "Romania", "turnout": 51.2 }
                    
                ]}
                series={[
                    {
                        id: 'turnout',
                        dataKey: 'turnout',
                        stack: 'voter turnout',
                        valueFormatter: (value: number | null) => `${value}%`,
                    },
                ]}
                layout="horizontal"
                xAxis={[
                    {
                        id: 'color',
                        min: 0,
                        max: 100,
                        colorMap: {
                            type: 'piecewise',
                            thresholds: [50, 85],
                            colors: ['#d32f2f', '#78909c', '#1976d2'],
                        },
                        valueFormatter: (value: number) => `${value}%`,
                    },
                ]}
                barLabel={(v) => `${v.value}%`}
                yAxis={[
                    {
                        scaleType: 'band',
                        dataKey: 'country',
                        width: 140,
                    },
                ]}
                slots={{
                    legend: PiecewiseColorLegend,
                    barLabel: BarLabelAtBase,
                    bar: BarShadedBackground,
                }}
                slotProps={{
                    legend: {
                        axisDirection: 'x',
                        markType: 'square',
                        labelPosition: 'inline-start',
                        labelFormatter: ({ index }) => {
                            if (index === 0) {
                                return 'lowest turnout';
                            }
                            if (index === 1) {
                                return 'average';
                            }
                            return 'highest turnout';
                        },
                    },
                }}
            />

            <BarChart
                xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                height={300}
            />


            <BarChart
                dataset={dataset}
                xAxis={[{ dataKey: 'month' }]}
                series={[
                    { dataKey: 'london', label: 'London', valueFormatter },
                    { dataKey: 'paris', label: 'Paris', valueFormatter },
                    { dataKey: 'newYork', label: 'New York', valueFormatter },
                    { dataKey: 'seoul', label: 'Seoul', valueFormatter },
                ]}
                {...chartSetting}
            />
        </Box>
    );
}


const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
            width: 60,
        },
    ],
    height: 300,
};

export function BarShadedBackground(props: BarProps) {
    const { ownerState, skipAnimation, id, dataIndex, xOrigin, yOrigin, ...other } =
        props;
    const theme = useTheme();

    const animatedProps = useAnimateBar(props);
    const { width } = useDrawingArea();
    return (
        <React.Fragment>
            <rect
                {...other}
                fill={(theme.vars || theme).palette.text.primary}
                opacity={theme.palette.mode === 'dark' ? 0.05 : 0.1}
                x={other.x}
                width={width}
            />
            <rect
                {...other}
                filter={ownerState.isHighlighted ? 'brightness(120%)' : undefined}
                opacity={ownerState.isFaded ? 0.3 : 1}
                data-highlighted={ownerState.isHighlighted || undefined}
                data-faded={ownerState.isFaded || undefined}
                {...animatedProps}
            />
        </React.Fragment>
    );
}

const Text = styled('text')(({ theme }) => ({
    ...theme?.typography?.body2,
    stroke: 'none',
    fill: (theme.vars || theme).palette.common.white,
    transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
    textAnchor: 'start',
    dominantBaseline: 'central',
    pointerEvents: 'none',
    fontWeight: 600,
}));

function BarLabelAtBase(props: BarLabelProps) {
    const {
        seriesId,
        dataIndex,
        color,
        isFaded,
        isHighlighted,
        classes,
        xOrigin,
        yOrigin,
        x,
        y,
        width,
        height,
        layout,
        skipAnimation,
        ...otherProps
    } = props;

    const animatedProps = useAnimate(
        { x: xOrigin + 8, y: y + height / 2 },
        {
            initialProps: { x: xOrigin, y: y + height / 2 },
            createInterpolator: interpolateObject,
            transformProps: (p) => p,
            applyProps: (element: SVGTextElement, p) => {
                element.setAttribute('x', p.x.toString());
                element.setAttribute('y', p.y.toString());
            },
            skip: skipAnimation,
        },
    );

    return <Text {...otherProps} {...animatedProps} />;
}
