import {Container, Row, Col} from 'react-bootstrap';
import {useAppSelector} from '../../hooks';
import {ProbabilityReportProps} from '../../interfaces';
import probabilityValues from '../../fixtures/probabilityValues.json';
import {v4 as uuid} from 'uuid';
import {useEffect, useState, useRef} from 'react';
import {getRowProbs, getColProbs, getDiagProbs} from '../../appData/cardGenDataSlice';


const ProbabilityReport:React.FC<ProbabilityReportProps> = (props:ProbabilityReportProps) => {
    const probabilityMatrix = useAppSelector(state => state.cardGenData.uiState.probabilityMatrix);
    const {savedCards} = useAppSelector(state => state.cardData);
    const [rowProbs, setRowProbs] = useState<number[]>([]);
    const [colProbs, setColProbs] = useState<number[]>([])
    const [diagProbs, setDiagProbs] = useState<number[]>([])
    const {cardId} = props;
    const showReport = useAppSelector(state => state.cardGenData.uiState.showReport)
    const [rootClass, setRootClass] = useState('probability-report fade-in');


    const arrProbs = probabilityValues.cardVals;
    const {rollComplete} = useAppSelector(state => state.cardGenData.uiState)
    //const [rootStyle, setRootStyle] = useState<any>(null)
    const ref = useRef<HTMLDivElement>(null)

    const rowLtr = (i:number) => {
        const ltrs = ['A','B','C', 'D','E'];
        return ltrs[i]
    }
  

    useEffect(() => {
        if(showReport) {
            setRootClass('probability-report fade-in')
        } else {
            setRootClass('probability-report fade-in hidden')
        }
    }, [showReport])

    useEffect(() => {

        if(cardId) {

            const card = savedCards?.filter(item => item._id === cardId)[0];
    
            if(card && card.probabilityMatrix) {
                const savedMatrix = JSON.parse(card?.probabilityMatrix).slice();
                setRowProbs(getRowProbs(savedMatrix));
                setColProbs(getColProbs(savedMatrix));
                setDiagProbs(getDiagProbs(savedMatrix));

            }
        } else {
            setRowProbs(probabilityMatrix.rowProbs);
            setColProbs(probabilityMatrix.colProbs);
            setDiagProbs(probabilityMatrix.diagProbs);
        }
    }, [cardId, savedCards, probabilityMatrix])




    return (
        <div ref={ref} className={rootClass}>
            {
                (rollComplete || cardId) && 

                <Container fluid  className="text-light">
                <Row>
                    <Col xs={12}><small>Below is a summary of your chances of winning on this card. Good luck!</small></Col>
                </Row>
                <Row>
                    <Col xs={12}><h6 className="text-warning">Rows (A through E)</h6></Col>
                </Row>
                {rowProbs.map((prob:any, i:number) => {
                   return (
                     <Row key={uuid()}>
                        <Col xs={6}><small>Row {rowLtr(i)}:</small></Col>
                        <Col xs={6}><span className="rpt-prb"><small>{arrProbs[prob]}</small></span></Col>
                    </Row>)
                })}
                <Row>
                    <Col xs={12}><h6 className="text-warning">Columns (1 thru 5)</h6></Col>
                </Row>
    
                {colProbs.map((prob:any, i:number) => {
                   return (
                    <Row key={uuid()}>
                        <Col xs={6}><small>Column {i+1}:</small></Col>
                        <Col xs={6}><span className="rpt-prb"><small>{arrProbs[prob]}</small></span></Col>
                    </Row>)
                })}
    
                <Row>
                    <Col xs={12}><h6 className="text-warning">Diagonals (A1-E5, A5-E1)</h6></Col>
                </Row>


                {diagProbs.map((prob:any, i:number) => {
                   return (
                    <Row key={uuid()}>
                        <Col xs={6}><small>Diagonal {i+1}:</small></Col>
                        <Col xs={6}><span className="rpt-prb"><small>{arrProbs[prob]}</small></span></Col>
                    </Row>)
                })}
                </Container>
            }

 
        </div>

    )
}

export default ProbabilityReport