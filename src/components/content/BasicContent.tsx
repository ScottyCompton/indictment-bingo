import {useState, useEffect} from 'react';




const BasicContent:React.FC = (props:any) => {
    const [content, setContent] = useState('')

    useEffect(() => {
        if(props['content']) {
            setContent(props.content)
        }
    }, [props])

    return (
    <>
      {content}
    </>
    )
}

export default BasicContent;