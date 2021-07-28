import {PageTitleProps} from '../../interfaces';

const PageTitle:React.FC<PageTitleProps> = (props:PageTitleProps) => {
    const {pageTitle, ref} = props;


    return (
            <div className="page-title fadeable fade-in">
                <h2 ref={ref}>{pageTitle}</h2>
            </div>
    )
}

export default PageTitle;