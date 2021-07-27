import {appConfig} from '../helpers';
import {useState, useEffect} from 'react';
const useDynamicContent = () => {
    const location = window.location.pathname;
    const contentId = location.split('/')[location.split('/').length-1]
    const [title, setPageTitle] = useState(null)
    const [content, setPageContent] = useState(null);



    useEffect(() => {
        let mounted = true;

        const loadContent = async () => {
            try {

                await fetch(appConfig.apiRoot + '/content/' + contentId)
                    .then(async(retval) => {
                        return await retval.json();
                    })
                    .then((body) => {
                        if(mounted) {
                            if(body._id) {
                                setPageTitle(body.pageTitle);
                                setPageContent(body.pageContent)
                            }
                        }
     
                    })

            } catch(error) {
                console.log(error);
            }
        }

        loadContent();


        return function cleanup() {
            mounted = false;
        }


    }, [contentId])

    return {title, content}
}

export default useDynamicContent;