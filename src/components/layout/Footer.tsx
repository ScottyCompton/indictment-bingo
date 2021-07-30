
import {NavItem} from '../../interfaces';
import appRoutes from '../../fixtures/appRoutes';
import {Link} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

const Footer:React.FC = () => {
    const navItems:NavItem[] = appRoutes.filter(item => item.showInFooter && item.path !== undefined);

    return (
        <div className="footer bg-primary">
            <div className="footer__link-container">
            {navItems && navItems.map((item:NavItem) => {
                return item.path && <Link key={uuid()} className=" text-secondary footer__link" to={item.path}>{item.menuTitle}</Link>
            })}
            </div>
            <h6 className="text-secondary text-center copyright"><p>&copy;Copyright 2020 Indictment Bingo.  All rights reserved. <br /><br />Fuck Donald Trump, and his little MAGAts too...</p></h6>
        </div>
    )
}

export default Footer;