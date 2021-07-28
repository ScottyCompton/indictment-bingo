import {Row, Col, Container} from 'react-bootstrap';
import {PageTitle} from '../UI'
import {useDynamicContent} from '../../hooks';
import {useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';


const ContentWithRightSideBar:React.FC<any> = (props) => {

    const {ContentComponent, SidebarComponents, pageTitle, rootClass, ...rest} = props;
    const {title:dynTitle, content:dynContent} = useDynamicContent()
    const [data, setData] = useState<{title?:any, content?:any}>();

    useEffect(() => {
        let mounted = true;
        if(mounted) {
            setData(() => {
                const title = pageTitle ? pageTitle : (dynTitle ? dynTitle : '...');
                const content = dynContent ? dynContent : undefined
    
                return {
                    title,
                    content
                }
            })    
        }

        return function cleanup() {
            mounted = false;
        }

    }, [dynTitle, dynContent, pageTitle])


    const loadContentFromChild = (t:any, c:any) => {
        setData(() => {
            return {
                title: t,
                content: c
            }
        })
    }

    return (
        <>
            <Container className="content">
                <Row>
                    <Col xs={12}>
                        <PageTitle pageTitle={data?.title} />
                    </Col>
                </Row>
                {data?.content && <>
                <Row>
                    <Col xs={12}>{data.content}</Col>
                </Row>
                <Row><Col xs={12}><p>&nbsp;</p></Col></Row>
                    </>
                }

                <Row>
                    <Col xs={12} sm={8} md={8} className={rootClass}>
                    <ContentComponent loadParentContent={loadContentFromChild} {...rest} />
                    </Col>
                    <Col xs={12} sm={4} md={4} className="right-sidebar d-none d-sm-block d-md-block">
                    {SidebarComponents && SidebarComponents.map((SidebarComponent:any) => {
                            return <SidebarComponent key={uuid()} />
                        })}
                    </Col>
                </Row>
            </Container>

        </>

    )
}

export default ContentWithRightSideBar;
