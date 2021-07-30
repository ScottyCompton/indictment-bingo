import {useState, useEffect} from 'react';
import {ContentData} from '../../interfaces'



const BasicContent:React.FC = (props:any) => {
    const [dbContent, setDbContent] = useState<ContentData>({title: '', content: '', isLoaded: false})

    useEffect(() => {
        if(props['dbContent']) {
            setDbContent(props.dbContent)
        }
    }, [props])

    return (
    <>
      {dbContent.isLoaded && dbContent.content && <div dangerouslySetInnerHTML={{ __html: dbContent.content+'' }} ></div>}
    </>
    )
}

export default BasicContent;