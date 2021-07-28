
const Basic:React.FC<any> = (props) => {
    const {ContentComponent, rootClass, ...rest} = props;

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
