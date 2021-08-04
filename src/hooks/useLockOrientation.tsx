import {useEffect} from 'react';


const useLockOrientation = () => {
    const mobileLimit = 500;
    
    useEffect(() => {

        // const getScreenHeight  = () => {
        //     return document.getElementsByTagName('html')[0]!.clientHeight
        // }

        // const getScreenWidth  = () => {
        //     return document.getElementsByTagName('html')[0]!.clientWidth;
        // }


        const getScreenHeight  = () => {
            return window.screen.height
        }

        const getScreenWidth  = () => {
            return window.screen.width
        }


        const getOrientation = () => {
            const w = getScreenWidth();
            const h = getScreenHeight();
            return w > h ? 'landscape' : 'portrait';
        }

        const getIsMobileDevice = () => {
            const w = getScreenWidth();
            const h = getScreenHeight();
            const orienatation = getOrientation();

            if(orienatation === 'portrait') {
                return w <= mobileLimit
            } else {
                return h <= mobileLimit
            }
        }

        const handleResize = () => {
            const orientation = getOrientation();
            const isMobileDevice = getIsMobileDevice();

            const el = document.getElementsByTagName('html')![0]
            console.log(orientation, isMobileDevice);
            if(orientation === 'landscape' && isMobileDevice) {
                el!.classList.add('rotate-90');
            } else {
                el!.classList.remove('rotate-90');
            }
        }

        window.addEventListener('resize', handleResize)

        return function cleanup() {
            window.removeEventListener('resize', handleResize)
        }

    }, [])
    


}

export default useLockOrientation