import {useState, useRef, useEffect} from 'react';
import {BingoLauncher} from '../UI';


const TomiLahren:React.FC = () => {
    const imgRef = useRef<HTMLDivElement>(null);

    
    const imgHeight = () => {
        const elem = imgRef.current;
        if(elem) {
            return (elem.offsetHeight + 20) + 'px';
        }
    }


    const [currStyle, setCurrStyle] = useState({width: '100%', height: imgHeight()})


    useEffect(() => {
        const handleResize = () => {
            const height = imgHeight();
            setCurrStyle((prevState) => {
                return ({
                    ...prevState,
                    height
                })
            })
        }
 
        window.addEventListener('resize', handleResize)

        return function cleanup() {
          window.removeEventListener('resize', handleResize)
        }
           
    }, [])







    return (
        <div className="sidebar__widget">
            <div className="tomi-lahren-widget" ref={imgRef}>
            <BingoLauncher>
                <img src="../dist/images/tomi-bingo-sm.png" title="Click me, big boy..." alt="Tomi Loves Indictment Bingo!"/>
            </BingoLauncher>  
            </div>
            <div className="pushdown" style={currStyle}>&nbsp;</div>
        </div>
    )
}

export default TomiLahren;