import { Link, To } from "react-router-dom"
import CImg, { IImg } from "./CImg";

export default ({ to, img, title }: ILink) => {
    return <Link to={to} className="flex items-center gap-3  ">
        {img && <CImg {...img} />}
        <span className="text-xl font-bold text-white hover:bg-green-400 transition-colors">{title}</span>
    </Link>
}


export interface ILink {
    to: To;
    img?: IImg;
    title?: string;
}