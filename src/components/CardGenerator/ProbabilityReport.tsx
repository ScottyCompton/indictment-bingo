import {Container, Row, Col} from 'react-bootstrap';
import {useAppSelector} from '../../hooks';
import probabilityValues from '../../fixtures/probabilityValues.json';
import {v4 as uuid} from 'uuid';


const ProbabilityReport:React.FC = () => {
    const probabilityMatrix = useAppSelector(state => state.cardGenData.uiState.probabilityMatrix);
    const {rowProbs, colProbs, diagProbs} = probabilityMatrix;
    const arrProbs = probabilityValues.cardVals;
    const rollComplete = useAppSelector(state => state.cardGenData.uiState.rollComplete)


    const rowLtr = (i:number) => {
        const ltrs = ['A','B','C', 'D','E'];
        return ltrs[i]
    }
  

    return (
        <div className="probability-report">
            {
                rollComplete && 

                <Container fluid >
                <Row><Col xs={12}><h3 className="text-light">Your Chances Of Winning On This Card</h3></Col></Row>
                <Row><Col xs={12}>So, how did you do?  The Probability report below is based on the likelihood of everyone in a particular row, column or diagonal being indicted. The wildcard counts as a freebie (yay!) but the "Unindicted Co-Conspirator" will bust a perfectly good Bingo row. Also, remember that as time goes on, someone's probability of being indicted might increase, so this card might not be a winner today, it could be down the road.</Col></Row>

                <Row><Col xs={12}><p>&nbsp;</p></Col></Row>
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
                <Row><Col xs={12}><p>&nbsp;</p></Col></Row>
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
                <Row><Col xs={12}><p>&nbsp;</p></Col></Row>
    
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
                <Row><Col xs={12}><p>&nbsp;</p></Col></Row>

                </Container>
            }

 
        </div>

    )
}

export default ProbabilityReport