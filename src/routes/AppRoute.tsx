
import React from 'react';
import {Route} from 'react-router-dom';


const AppRoute:React.FC<any> = ({LayoutComponent, ContentComponent, SidebarComponents, pageTitle, rootClass, ...rest}) => {
    return (
        <Route {...rest} component={() => {
            return <LayoutComponent rootClass={rootClass} pageTitle={pageTitle} ContentComponent={ContentComponent} SidebarComponents={SidebarComponents} />
        }} />

    )
}

export default AppRoute;

