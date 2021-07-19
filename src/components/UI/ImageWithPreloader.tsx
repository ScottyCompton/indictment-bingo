import React from 'react';
import PreloadImage from './PreloadImage';
import {ImageWithPreloaderProps} from '../../interfaces';
//import ImgUrl from '../helpers/appImageUrl';


const ImageWithPreloader:React.FC<ImageWithPreloaderProps> = (props) => {
    const {src, style, className = 'img-peloader', duration = '1000ms' } = props;

    //const imgSrc = ImgUrl(src);

    return (
        <PreloadImage 
            src={src}
            className={className}
            style={style}
            duration={duration}
            lazy
        />
    )

}

export default ImageWithPreloader;

