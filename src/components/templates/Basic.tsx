import {useScrollTo} from '../../hooks';

const Basic:React.FC<any> = (props) => {
    const {ContentComponent, rootClass, ...rest} = props;
    useScrollTo(0,0);

    return (
        <>
            <div className={rootClass}>
                <div className="content">
                    <ContentComponent {...rest} />
                </div>
            </div>
        </>

    )
}

export default Basic;
