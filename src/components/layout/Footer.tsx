
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
        </div>
    )
}

export default Footer;