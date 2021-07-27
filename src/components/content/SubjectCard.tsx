import {Subject} from '../../interfaces'
import probabilityValues from '../../fixtures/probabilityValues.json';
import { withRouter, useHistory } from "react-router-dom";
import {RouteComponentProps} from 'react-router'

export interface SubjectCardProps extends RouteComponentProps<any> {
    data: Subject;
}

const SubjectCard:React.FC<SubjectCardProps> = (props:SubjectCardProps) => {
    const arrProbs = probabilityValues.personVals;
    const {data} = props;
    const history = useHistory();

    const fmtSubjPath = (subjectTitle:string) => {
        let strOut = subjectTitle.toLocaleLowerCase();
        strOut = strOut.replace('.','').replaceAll(' ','_');
        return strOut;
    }    

    const handleClick = () => {
        history.push(`/subjects/${fmtSubjPath(data.subjectTitle!)}`)
    }


    return (
        <div className="card subject-card">
            <div className="card-body">
                <h4 className="card-title">{data.subjectTitle}</h4>
                <h6 className="card-subtitle mb-2 text-muted">Indictment Probability: {arrProbs[data.probability]}</h6>            
                    <div className="subject-card__img"><img src={`/dist/images/subjects/${data.subjectImg}`} alt={data?.subjectTitle!} /></div>
                    <p className="card-text">{data.subjectShortDesc}</p>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleClick}>View Details</button>                                    
            </div>
        </div>
    )
}

export default withRouter(SubjectCard);