import {useState, useEffect} from 'react';




const BasicContent:React.FC = (props:any) => {
    const [content, setContent] = useState('')

    useEffect(() => {
        if(props['content']) {
            setContent(props.content)
        }
    }, [props])

    console.log(props);
    return (
    <>
      {content}
    </>
    )
}

export default BasicContent;