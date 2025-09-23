import { Link, To } from "react-router-dom"

export default ({ alt,src}: IImg) => {
    return <img
        src={src}
        alt={alt}
        className="w-8 h-8"
    />
}


export interface IImg {
    src: string;
    alt: string;

}