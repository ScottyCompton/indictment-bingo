import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import AppRoute from './AppRoute';
import appRoutes from '../fixtures/appRoutes';
import {useAppSelector} from '../hooks';
import {LoadingOverlay, ToastNotification, CardGeneratorModal} from '../components';
import {v4 as uuid} from 'uuid';
import {useCallback} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export const history = createBrowserHistory();

const AppRouter:React.FC<any> = (props:any) => {
  const user = useAppSelector(state => state.appData.uiState.user);
  
  const appRouteList = useCallback(() => {
    return appRoutes.map((props) => {
      return props.public ? <AppRoute key={uuid()} {...props} /> : user ? <AppRoute key={uuid()} {...props} /> : null

    })    
  }, [user])

  return (
    <Router history={history} >
    <Route render={({location}) => {
        return (
                <>
                <ToastNotification />
                <LoadingOverlay />
                <CardGeneratorModal />
                <TransitionGroup className="RTG">
                <CSSTransition 
                    key={location.key}
                    timeout={2000}
                    classNames="fade"
                >
                  <main>
                    <div className="page">                
                      <Switch location={location}>
                      {appRouteList()}
                      </Switch>
                  </div>
                </main>
                </CSSTransition>
              </TransitionGroup>                
                </>
        );
      }} /> 
    </Router>)

};


export default AppRouter;





// import {Router, Route, Switch} from 'react-router-dom';
// import {NotFound, HomePage, Cards, Subjects, SubjectDetail, Paywall, BasicContent} from '../components/content';
// import {createBrowserHistory} from 'history';
// import {Basic, ContentWithRightSideBar, BasicWithTitle} from '../components/templates'
// import AppRoute from './AppRoute';
// import {LoadingOverlay, ToastNotification, CardGeneratorModal} from '../components';
// export const history = createBrowserHistory();

// const AppRouter:React.FC<any> = (props:any) => {
  
//   return (
//     <Router history={history} >
//     <Route render={({location}) => {
//         return (
//                 <>
//                 <ToastNotification />
//                 <LoadingOverlay />
//                 <CardGeneratorModal />
//                 <Switch location={location}>
//                   <AppRoute path="/indictable-news" LayoutComponent={BasicWithTitle} ContentComponent={BasicContent} rootClass="basic-content" />
//                   <AppRoute path="/indictable-swag" LayoutComponent={BasicWithTitle} ContentComponent={BasicContent} rootClass="basic-content" />
//                   <AppRoute path="/donate" LayoutComponent={ContentWithRightSideBar} ContentComponent={BasicContent} rootClass="basic-content" />
//                   <AppRoute path="/about" LayoutComponent={BasicWithTitle} ContentComponent={BasicContent} rootClass="basic-content" />
//                   <AppRoute path="/hate-mail" LayoutComponent={BasicWithTitle} ContentComponent={BasicContent} rootClass="basic-content" />
//                   <AppRoute path="/whatitis" LayoutComponent={BasicWithTitle} ContentComponent={BasicContent} rootClass="basic-content" />
//                   <AppRoute path="/howitworks" LayoutComponent={BasicWithTitle} ContentComponent={BasicContent} rootClass="basic-content" />                  
//                   <AppRoute path="/subjects" exact={true}  pageTitle="Trump World Indictables"  LayoutComponent={ContentWithRightSideBar} ContentComponent={Subjects} rootClass="subjects" />
//                   <AppRoute path="/subjects/:subjectId" LayoutComponent={ContentWithRightSideBar} ContentComponent={SubjectDetail} rootClass="subject-detail" />
//                   <AppRoute path="/paywall" LayoutComponent={Basic} ContentComponent={Paywall} rootClass="paywall" />
//                   <AppRoute path="/cards" exact={true} LayoutComponent={ContentWithRightSideBar} ContentComponent={Cards} rootClass="cards" />
//                   <AppRoute path="/" exact={true} LayoutComponent={Basic} ContentComponent={HomePage} rootClass="home-page" />
//                   <AppRoute LayoutComponent={ContentWithRightSideBar} pageTitle="Well.. this is awkward" ContentComponent={NotFound}  rootClass="not-found-page" />
//                 </Switch>
//                 </>
//         );
//       }} /> 
//     </Router>)

// };


// export default AppRouter;
