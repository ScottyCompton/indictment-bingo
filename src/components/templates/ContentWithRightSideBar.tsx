import {Row, Col, Container} from 'react-bootstrap';
import {PageTitle} from '../UI'
import {useScrollTo} from '../../hooks';
import {useState} from 'react';
import {Sidebar} from '../sidebar';
import {ContentData} from '../../interfaces'
import {useDbContent}   from '../../hooks';

const ContentWithRightSideBar:React.FC<any> = (props) => {

    const {ContentComponent, SidebarComponents, pageTitle, rootClass, ...rest} = props;
    const [data, setData] = useState<ContentData>({title: '', content: '', isLoaded: false})
    useScrollTo(0,0);

    const dbContent = useDbContent();

    const loadContentFromChild = (t:any, c:any) => {
        setData(() => {
            return {
                title: t,
                content: c,
                isLoaded: true
            }
        })
    }

    return (
        <>
            <Container className="content">
                {
                    dbContent.isLoaded && 
                <>
                    <Row>
                        <Col xs={12}>
                            <PageTitle pageTitle={pageTitle ? pageTitle : (dbContent.title)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>{dbContent.content}</Col>
                    </Row>
                    <Row><Col xs={12}><p>&nbsp;</p></Col></Row>
                </>
                }

                {!dbContent.isLoaded &&     // do this for a component that loads the template title and an excerpt
                    <>
                    <Row>
                        <Col xs={12}>
                            <PageTitle pageTitle={pageTitle ? pageTitle : (data.isLoaded && data.title ? data.title : ' ')} />
                        </Col>
                    </Row>
                    {data.isLoaded && data?.content && 
                    <>
                    <Row>
                        <Col xs={12}>{data.content}</Col>
                    </Row>
                    <Row><Col xs={12}><p>&nbsp;</p></Col></Row>
                    </>
                    }
                    </>
                }
 
                <Row>
                    <Col xs={12} sm={8} md={8} className={rootClass}>
                        <ContentComponent loadParentContent={loadContentFromChild} {...rest} />
                    </Col>
                    <Col xs={12} sm={4} md={4} className="d-none d-sm-block d-md-block sidebar__right">
                        <Sidebar SidebarComponents={SidebarComponents}/>
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default ContentWithRightSideBar;
