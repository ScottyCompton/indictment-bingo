import {PageTitleProps} from '../../interfaces';

const PageTitle:React.FC<PageTitleProps> = (props:PageTitleProps) => {
    const {pageTitle, ref} = props;


    return (
            <div className="page-title">
                <h1 ref={ref}>{pageTitle}</h1>
            </div>
    )
}

export default PageTitle;