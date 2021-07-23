
export interface PageTitleProps {
    pageTitle: string;
    
}

const PageTitle:React.FC<PageTitleProps> = (props:PageTitleProps) => {
    const {pageTitle} = props;

    return (
            <div className="page-title">
                <h1>{pageTitle}</h1>
            </div>
    )
}

export default PageTitle;