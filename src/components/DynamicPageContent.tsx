import {useState, useEffect} from 'react';
import {DynamicContent} from '../interfaces';
import {appConfig} from '../helpers'
import {PageTitle} from '../components'
const DynamicPageContent:React.FC<{contentId: string}> = (props: {contentId: string}) => {
    const {contentId} = props;

    const [dynContent, setDynContent] = useState<DynamicContent>({
        pageTitle: '',
        pageContent: ''
    });

    const {pageTitle, pageContent} = dynContent;
    


    useEffect(() => {
        const abortController = new AbortController();


        const loadContent = async () => {
            try {

                await fetch(appConfig.apiRoot + '/content/' + contentId, {signal: abortController.signal})
                    .then(async(retval) => {
                        return await retval.json();
                    })
                    .then((body) => {
                        if(body.pageTitle) {
                            setDynContent(body);
                        }
                    })

            } catch(error) {
                console.log(error);
            }
        }

            loadContent();

            return () => {
                abortController.abort();
            }

    }, [contentId])



    return (
        <>  
            <div className="fade-in">
                <PageTitle pageTitle={pageTitle} />
                <div>{pageContent}</div>
            </div>
        </>
    )



}

export default DynamicPageContent;
