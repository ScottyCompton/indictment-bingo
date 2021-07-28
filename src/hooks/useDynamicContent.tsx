import {appConfig} from '../helpers';
import {useState, useEffect} from 'react';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const useDynamicContent = (tag?:string) => {
    const location = window.location.pathname;
    const contentId = location.split('/')[location.split('/').length-1]
    const [title, setPageTitle] = useState(null)
    const [content, setPageContent] = useState(null);
    const w:any = (new JSDOM('')).window
    const DOMPurify = createDOMPurify(w)


    useEffect(() => {
        let mounted = true;
        const endpoint = tag ? tag : contentId;
        const loadContent = async () => {
            try {

                await fetch(appConfig.apiRoot + '/content/' + endpoint)
                    .then(async(retval) => {
                        return await retval.json();
                    })
                    .then((body) => {
                        if(mounted) {
                            if(body._id) {
                                const txt:any = DOMPurify.sanitize(body.pageContent);
                                setPageTitle(body.pageTitle);
                                setPageContent(txt)
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


    }, [contentId, tag, DOMPurify])

    return {title, content}
}

export default useDynamicContent;