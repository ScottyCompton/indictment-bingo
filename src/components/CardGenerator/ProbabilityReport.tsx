import {Container, Row, Col} from 'react-bootstrap';
import {useAppSelector} from '../../hooks';
import probabilityValues from '../../fixtures/probabilityValues.json';
import {v4 as uuid} from 'uuid';
import {useEffect, useState, useRef} from 'react';


const ProbabilityReport:React.FC = () => {
    const probabilityMatrix = useAppSelector(state => state.cardGenData.uiState.probabilityMatrix);
    const {rowProbs, colProbs, diagProbs} = probabilityMatrix;
    const arrProbs = probabilityValues.cardVals;
    const {rollComplete, showReport} = useAppSelector(state => state.cardGenData.uiState)
    const [rootClass, setRootClass] = useState('probability-report')
    const [rootStyle, setRootStyle] = useState<any>(null)
    const ref = useRef<HTMLDivElement>(null)

    const rowLtr = (i:number) => {
        const ltrs = ['A','B','C', 'D','E'];
        return ltrs[i]
    }
  
    useEffect(() => {
        const docHeight = document.getElementById('cardgen-modal')?.offsetWidth;
        setRootStyle({
            height: docHeight + 'px'
        })  

        setRootClass((prevState) => {
            if(!showReport) {
                return prevState + ' hidden';
            } else {
              
                return prevState.replace(' hidden', '');
            }
        })
    }, [showReport])


    return (
        <div ref={ref} className={rootClass} style={rootStyle}>
            {
                rollComplete && 

                <Container fluid >
                <Row>
                    <Col xs={12}><h5 className="text-light">Rows (A through E)</h5></Col>
                </Row>
                {rowProbs.map((prob:any, i:number) => {
                   return (
                     <Row key={uuid()}>
                        <Col xs={6}>Row {rowLtr(i)}:</Col>
                        <Col xs={6}><span className="rpt-prb">{arrProbs[prob]}</span></Col>
                    </Row>)
                })}
                <Row><Col xs={12}>&nbsp;</Col></Row>
                <Row>
                    <Col xs={12}><h5 className="text-light">Columns (1 thru 5)</h5></Col>
                </Row>
    
                {colProbs.map((prob:any, i:number) => {
                   return (
                    <Row key={uuid()}>
                        <Col xs={6}>Column {i+1}:</Col>
                        <Col xs={6}><span className="rpt-prb">{arrProbs[prob]}</span></Col>
                    </Row>)
                })}
                <Row><Col xs={12}>&nbsp;</Col></Row>
    
                <Row>
                    <Col xs={12}><h5 className="text-light">Diagonals (A1-E5, A5-E1)</h5></Col>
                </Row>


                {diagProbs.map((prob:any, i:number) => {
                   return (
                    <Row key={uuid()}>
                        <Col xs={6}>Diagonal {i+1}:</Col>
                        <Col xs={6}><span className="rpt-prb">{arrProbs[prob]}</span></Col>
                    </Row>)
                })}
                </Container>
            }

 
        </div>

    )
}

export default ProbabilityReport