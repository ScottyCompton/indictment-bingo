import {useState, useEffect} from 'react';
import {ContentData} from '../interfaces'
import {appConfig} from '../helpers';


const useDbContent = (tag?:string) => {

    const [dbContent, setDbContent] = useState<ContentData>({isLoaded: false, title: '', content: ''})
    
    useEffect(() => {
        let mounted = true;
        const errTitle = 'Invalid Content Reference';
        const errText = 'The content you indicated does not exist.  Check the tag or data in the database';
        
        //const endpoint = tag!==undefined ? tag : contentId;
        const loadContent = async () => {
            try {

                const location = window.location.pathname;
                const contentId = tag ? tag : location.split('/')[location.split('/').length-1]            
                if(contentId !== '') {
                    await fetch(appConfig.apiRoot + '/content/' + contentId)
                    .then(async(retval) => {
                        return await retval.json();
                    })
                    .then((body) => {
                        if(mounted) {
                            if(body._id) {
                                //const pageContent:any = DOMPurify.sanitize(body.pageContent);
                                setDbContent({
                                    title: body.pageTitle,
                                    content: body.pageContent,
                                    isLoaded: true
                                })                           
                            } else {
                                setDbContent({
                                    title: errTitle,
                                    content: errText,
                                    isLoaded: false
                                })  
                            }
                        }
     
                    })
                }
 

            } catch(error) {
                console.log(error);
            }
        }

        loadContent();


        return function cleanup() {
            mounted = false;
        }


    }, [tag])

    return dbContent

}

export default useDbContent;