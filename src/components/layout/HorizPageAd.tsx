import {LeaderBoard728X90, LeaderBoard350x100} from './'
import {useState, useEffect, useCallback} from 'react';
import bp from '../../fixtures/appBreakpoints.json'

export interface AppBreakPoint {
    size:string;
    min: number;
    max: number;
}


const HorizPageAd:React.FC = () => {
    const appBreakpoints:AppBreakPoint[] = bp.appBreakpoints;

    const getCurrentSize = useCallback(() => {
            let w = document.getElementById('root')?.offsetWidth!;
            const currBreakpoint = appBreakpoints.filter(item => (item.min <= w) && (w <= item.max))
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






    return (
        <>
            {currentSize === 'XS' && <LeaderBoard350x100 />}
            {currentSize !== 'XS' && <LeaderBoard728X90 />}
        </>
    )
}

export default HorizPageAd;