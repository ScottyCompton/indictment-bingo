import {v4 as uuid} from 'uuid';



export interface SidebarComponentProps {
    SidebarComponents: any[];
    className?: string;
}


const Sidebar:React.FC<SidebarComponentProps> = (props:SidebarComponentProps) => {
    const {SidebarComponents, className} = props;

    return (
        <div className={`sidebar ${className ? className : ''}`}>
            {SidebarComponents && SidebarComponents.map((SidebarComponent:any) => {
                return <SidebarComponent key={uuid()} />
            })}
        </div>
    )
}

export default Sidebar;