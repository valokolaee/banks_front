import { Flex } from 'antd';
import { numString } from 'mrv-utils';
import React from 'react';
import SmartImage from '../../../../components/ui/SmartImage';
import svgList from '../../../../assets/icons/svgList';


const ContentBox: React.FC<IContentBox> = ({ color: { name, num }, title, value, fontSize = 5, svg }) => (
    <Flex
        vertical
        style={{
            // minHeight: 230,
            borderRadius: 5,
            // margin: 3,
            // ...tstStyleBlue
        }}
        className='relative w-full bg-'
        align='center'

    >
        {svg &&
            <div className="image-card">

                <img
                    src={svg}
                    alt={'alt'}

                    className={`absolute opacity-10 left-0 right-0 bottom-0 w-full h-1/2`}
                />
            </div>
        }

        {/* <SmartImage
            className='absolute '
            src={svgList.Logo}
            alt='yes'
        
        /> */}
        {title}
        <Flex
            flex={1}
            align='center'
        >
            <strong className={`text-center text-${fontSize}xl text-${name}-${num}`}>{value}</strong>
        </Flex>
    </Flex >
);

export default ContentBox;

export interface IContentBox {
    // children?:string
    title: string;
    value: numString;
    fontSize?: number;
    color: {
        name: string;
        num: number;
    };

    svg?: string
}