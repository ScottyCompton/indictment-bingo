import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import AppPublic from '../components/AppPublic';
export const history = createBrowserHistory();



const AppRouter:React.FC<any> = (props:any) => {
  // const user = useAppSelector(state => state.appData.uiState.user);
  

  return (
    <Router history={history} >
    <Route render={({location}) => {
        return (
            <AppPublic location={location} {...props} />
          );

      }} /> 
    </Router>)

};


export default AppRouter;


