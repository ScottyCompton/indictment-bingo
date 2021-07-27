import {Header, Footer, LeaderBoard728X90} from '../../components/layout'

const Basic:React.FC<any> = (props) => {
    const {ContentComponent, rootClass, ...rest} = props;

    return (
        <div className="page fade-in">
            <Header />
            <LeaderBoard728X90 />
            <div className={rootClass}>
                <div className="content">
                    <ContentComponent {...rest} />
                </div>
            </div>
            <LeaderBoard728X90 />
            <Footer />
        </div>

    )
}

export default Basic;
