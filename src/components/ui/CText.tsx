import IComponent from "../intrfaceces/IComponent";

 

export default ({ onClick, text, block, bold = '', className = '', textAlign = '', fontSize = 'text-base', link }: IText) => {
     



    const _className = () => {
        const _block = block ? 'block' : '';
        const cursor = onClick ? 'cursor-pointer' : '';
        return `${_block} ${textAlign} ${fontSize} ${bold} ${(link && link.type !== 'phone') ? 'underline text-sky-400	' : ''}
        ${cursor} text-white  ${className}`
    }


    const _link = () => {
        switch (link?.type) {
            case 'email':
                return `${" mailto:"}${link.href}${"?subject=React and React Native Developer&body=Dear%20Mehdi"}`
            case 'phone':
                return `tel:${link.href}`
            default:
                return link?.href
        }
    }


    return (
        <span
             className={_className()}
             onClick={onClick}
        >
            {link ? <a
                href={_link()}
                target={link.target}>{text || link.href}</a> : text}
        </span>



    )
};

export interface IText extends IComponent {
    text?: string | number;
    disabled?: boolean;
    capitalize?: boolean;
    onClick?: () => void;
    className?: string;
    link?: {
        href: string;
        type?: 'email' | 'phone';
        target?: | "_self" | "_blank" | "_parent" | "_top"
    }
    // decoration
    block?: boolean;
    bold?: 'font-thin' | 'font-extralight' | 'font-light' | 'font-normal' | 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold' | '';
    textAlign?: 'text-center' | 'text-justify' | 'text-start' | 'text-end' | ''
    fontSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl' | 'text-5xl' | 'text-6xl' | 'text-7xl' | 'text-8xl' | 'text-9xl' | '';

}
