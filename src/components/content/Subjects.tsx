import {Container, Row, Col, Pagination} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import {Subject} from '../../interfaces'
import {SubjectCard} from './';
import {http, appConfig} from '../../helpers';
import {v4 as uuid} from 'uuid';

export interface SubjectsListPageProps {
    loadParentContent: (c:any, v: any) => void;
}


const Subjects:React.FC<SubjectsListPageProps> = (props: SubjectsListPageProps) => {
    const [subjectList, setSubjectList] = useState<Subject[]>([])
    const [currPage, setCurrPage] = useState(1);
    const [subjectsToShow, setSubjectsToShow] = useState<Subject[]>([])
    const [rootClass, setRootClass] = useState('')
    const [loaded, setLoaded] = useState(false);
    const pageLen = 5;

 
    useEffect(() => {
        let mounted = true;
        const loadSubjects = async () => {
            await http.getData(`/games/${appConfig.gameId}/listablesubjects`)
            .then((result) => {
                if(mounted) {
                    setSubjectList(result);
                    setLoaded(true);
                }
            })
        }

        loadSubjects()

        return function cleanup() {
            mounted = false;
        }

    }, [])


    useEffect(() => {
        setSubjectsToShow(() => {
            return subjectList.filter((item, idx) => {
                return (idx >= (currPage-1) * pageLen) && idx <= ((currPage-1) * pageLen) + (pageLen-1)
            })
        })
    }, [subjectList, currPage])



    // useEffect(() => {
    //     if(dbContent.isLoaded) {
    //         props.loadParentContent(dbContent.title, dbContent.content)    
    //     }
    // }, [dbContent, props])


    const paginate = (e:any) => {
        const id = e.target.getAttribute('id');
        const pageNum = parseInt(id.replace('page',''));
        const doIt = currPage !== pageNum;
        darthFader(doIt, () => {
            setCurrPage(pageNum);    
        })
    }

    const gotoFirst = () => {
        const doIt = currPage !== 1
        darthFader(doIt, () => {
            setCurrPage(1)
        });
    }

    const gotoPrev = () => {
        const doIt = currPage !== 1;
        darthFader(doIt, () => {
                setCurrPage((prevState) => {
                    return prevState - 1
                })    
            })
    }

    const gotoNext = () => {
        const doIt = currPage !== Math.ceil(subjectList.length / pageLen);
        darthFader(doIt, () => {
                setCurrPage((prevState) => {
                    return prevState + 1
                })    
        })

    }

    const gotoLast = () => {
        const doIt = Math.ceil(subjectList.length / pageLen) !== currPage;
        darthFader(doIt, () => {
                setCurrPage(Math.ceil(subjectList.length / pageLen))
        })
    }


    const darthFader = (doIt: boolean, cb:() => void) => {
        if(doIt) {
            setRootClass('fadeable fade-out');
            setTimeout(() => {
                setRootClass('fadeable fade-in')
                cb();
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }, 500)    
        }
    }


    const paginatation = () => {
        const totalPages = Math.ceil(subjectList.length / pageLen)
        const pageItems:any = [];
        for(let i = 1; i <= totalPages; i++) {
            i === currPage ? 
                pageItems.push(<Pagination.Item key={uuid()} id={`page${i}`} onClick={paginate} active>{i}</Pagination.Item>)
            :   pageItems.push(<Pagination.Item key={uuid()} id={`page${i}`} onClick={paginate}>{i}</Pagination.Item>)
        }      


        return (<Pagination>
            <Pagination.First onClick={gotoFirst} />
            <Pagination.Prev onClick={gotoPrev} />
            {[...pageItems]}
            <Pagination.Next onClick={gotoNext} />
            <Pagination.Last onClick={gotoLast} />
          </Pagination>)

    }


    return (
        <>
        {loaded && 
        <Container fluid id="subjectlist">

            <Row>
                <Col xs={12}>
                    <div className={rootClass}>
                    {subjectsToShow && subjectsToShow.map((subject) => {
                        return (
                            <SubjectCard key={uuid()} data={subject} />
                        )
                    })}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    {paginatation()}
                </Col>

            </Row>
        </Container>}
        </>

    )



}

export default Subjects;