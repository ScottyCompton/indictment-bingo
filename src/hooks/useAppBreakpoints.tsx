import {useState, useEffect, useCallback} from 'react';
import bp from '../fixtures/appBreakpoints.json'

export interface AppBreakPoint {
    size:string;
    min: number;
    max: number;
}

const useAppBreakpoints = () => {

    const appBreakpoints:AppBreakPoint[] = bp.appBreakpoints;


    const getCurrentSize = useCallback(() => {
            const w = document.getElementById('root')?.offsetWidth!;
    
            const currBreakpoint = appBreakpoints.filter(item => (item.min < w) && (w < item.max))
            return currBreakpoint[0].size


        }, [appBreakpoints])


    const [currentSize, setCurrentSize] = useState<string>(getCurrentSize());


    useEffect(() => {
        const handleResize = () => {
            const curr = getCurrentSize();
            if(curr !== currentSize) {
                setCurrentSize(curr);
            }
        }
    
    
        window.addEventListener('resize', handleResize)
    
        return function cleanup() {
          window.removeEventListener('resize', handleResize)
        }
    }, [currentSize, getCurrentSize])


    return currentSize;

}



export default useAppBreakpoints;