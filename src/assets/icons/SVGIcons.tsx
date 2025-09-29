import { ReactNode } from "react";
import { IIcon } from "../../components/CIcon";
import { Battery1, Battery2, Battery3, BatteryLevelIcon, Dot, HamburgerIcon, LeftChevron, MapIcon, None, Refresh, RightChevron, Routing, RoutingList, SliderIcon, UserMapLocation, UserTarget } from "./svgList";


export const IconWrapper = ({ className, onClick, size, children }: IIconWrapper) => <div onClick={onClick} style={{ width: size, height: size }} className={className}>
    {children}
</div>
export const Hamburger = ({ className, onClick, size, color, }: IIcon) => <HamburgerIcon fill={color} width={size} height={size} onClick={onClick} className={className} />
export const LeftChevroner = ({ className, onClick, size = 10, color, }: IIcon) => <LeftChevron fill={color} width={size} height={size} onClick={onClick} className={className} />
export const RightChevroner = ({ className, onClick, size = 10, color, }: IIcon) => <RightChevron fill={color} width={size} height={size} onClick={onClick} className={className} />
export const Refresher = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <Refresh fill={color} width={size} height={size} onClick={onClick} className={className} />
export const Routinger = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <Routing fill={color} width={size} height={size} onClick={onClick} className={`${className} `} />
export const UserTargeter = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <UserTarget fill={color} width={size} height={size} onClick={onClick} className={className} />
export const UserUserMapLocationHelper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <UserMapLocation fill={color} width={size} height={size} onClick={onClick} className={className} />
export const NoneHelper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <None fill={color} width={size} height={size} onClick={onClick} className={className} />
export const DotHelper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <Dot fill={color} width={size} height={size} onClick={onClick} className={className} />
export const SliderIconHelper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <SliderIcon fill={color} width={size} height={size} onClick={onClick} className={className} />
export const MapIconHelper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <MapIcon fill={color} width={size} height={size} onClick={onClick} className={className} />
export const Battery1Helper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <Battery1 fill={color} width={size} height={size} onClick={onClick} className={className} />
export const Battery2Helper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <Battery2 fill={color} width={size} height={size} onClick={onClick} className={className} />
export const Battery3Helper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <Battery3 fill={color} width={size} height={size} onClick={onClick} className={className} />
export const BatteryLevelIconHelper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <BatteryLevelIcon fill={color} width={size} height={size} onClick={onClick} className={className} />
export const RoutingListIconHelper = ({ className, onClick, size = 10, color = 'black', }: IIcon) => <RoutingList fill={color} width={size} height={size} onClick={onClick} className={className} />


export interface IIconWrapper extends IIcon {
    children: ReactNode;
}
