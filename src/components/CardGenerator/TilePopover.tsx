import {Popover, Overlay} from 'react-bootstrap';
import {Subject} from '../../interfaces';
import {useRef} from 'react';
import probabilityValues from '../../fixtures/probabilityValues.json';


export interface TilePopoverProps {
    data: Subject
    show: boolean;
    target: any;
    containerRef: any;
    idx: number;
}

const TilePopover:React.FC<TilePopoverProps> = (props:TilePopoverProps) => {
    const {_id, subjectTitle, subjectShortDesc, subjectImg, probability} = props.data;
    const {target, containerRef, idx, show} = props;
    const ref = useRef(null);
    const arrProb = probabilityValues.personVals;


    return (
        <div ref={ref} className="tile-popover">

            <Overlay 
                show={show} 
                target={target} 
                container={containerRef}
                placement={window.innerWidth < 500 ?  (idx < 20 ? 'bottom' : 'top') : idx < 10 ? 'bottom' : 'top'}>
                    <Popover id={`popover_${_id}`}>
                    <div className="card bg-dark">
                        <div className="card-body">
                            <div>
                                <h5 className="text-light tile-popover__title">{subjectTitle}</h5>
                                <img className="tile-popover__img" src={`../dist/images/subjects/${subjectImg}`} alt={subjectTitle + ''} />
                                <span className="tile-popover__shortdesc">{subjectShortDesc}</span>
                                <div className="text-light tile-popover__probability">Indictemnt Probability: <b className="text-warning">{arrProb[probability ? probability: 0]}</b></div>
                            </div>
                        </div>
                        
                    </div>
                </Popover>
            </Overlay>
      </div>
    )
}

export default TilePopover;