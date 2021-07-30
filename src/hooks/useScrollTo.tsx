import {useEffect} from 'react';


const useScrollTo = (x:number = 0, y:number = 0) => {
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({top: x, left: y, behavior: 'smooth'})
        },500);
    }, [x, y])



}

export default useScrollTo;