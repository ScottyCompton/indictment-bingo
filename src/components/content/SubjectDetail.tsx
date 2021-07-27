import {Container, Row, Col} from 'react-bootstrap'
import {useState, useEffect} from 'react';
import {Subject} from '../../interfaces'
import {http} from '../../helpers';

export interface SubjectDetailComponentProps {
    loadParentContent: (c:any, v: any) => void;
}


const SubjectDetail:React.FC<SubjectDetailComponentProps> = (props: SubjectDetailComponentProps) => {
    const [loaded, setLoaded] = useState(false);
    const [subject, setSubjectDetail] = useState<Subject>()
    const {loadParentContent} = props;


    useEffect(() => {
        let mounted = true;
        const location = window.location.pathname;
        const subjectpath = location.split('/')[location.split('/').length-1];

        const loadSubjectDetail = async () => {
            await http.getData(`/subjectbypath/${subjectpath}`)
            .then((result) => {
                if(mounted) {
                    setSubjectDetail(result);
                    loadParentContent(result.subjectTitle, result.subjectShortDesc)
                    setLoaded(true);    
                }
            })
        }

        loadSubjectDetail()

        return function cleanup() {
            mounted = false;
        }

    }, []) //eslint-disable-line


    return (
        <>
        <Container fluid>
            {loaded && subject && 
             <Row>
                <Col xs={12}>{subject.subjectDesc!}</Col>
            </Row>           
            }

        </Container>
        </>

    )
}

export default SubjectDetail;