import {DynamicPageContent} from '../components'

const Page:React.FC = () => {
    const location = window.location.pathname;
    const contentId = location.split('/')[location.split('/').length-1]


   return (<>
        <DynamicPageContent contentId={contentId} />
        </>)
}

export default Page;