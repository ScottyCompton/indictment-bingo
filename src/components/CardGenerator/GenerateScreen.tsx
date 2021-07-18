import BingoCard from './BingoCard';
import ProbabilityReport from './ProbabilityReport'
import {CardGeneratorProps} from '../../interfaces';

const GenerateScreen:React.FC<CardGeneratorProps> = (props:CardGeneratorProps) => {
    
    return (
        <>
            <BingoCard cardId={props.cardId} />
            <ProbabilityReport cardId={props.cardId} />
        </>
    )
}

export default GenerateScreen