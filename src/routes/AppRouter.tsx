import {Router, Route, Switch} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import {createBrowserHistory} from 'history';
import AppRoute from './AppRoute';
import appRoutes from '../fixtures/appRoutes';
import {useAppSelector} from '../hooks';
import {LoadingOverlay, ToastNotification, CardGeneratorModal} from '../components';
import {v4 as uuid} from 'uuid';
import {useCallback} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {Header, Footer, HorizPageAd, NoLandscape} from '../components/layout'
export const history = createBrowserHistory();

const AppRouter:React.FC<any> = (props:any) => {
  const user = useAppSelector(state => state.appData.uiState.user);
  // useLockOrientation()

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
                <NoLandscape />
                <div className="app">
                <ToastNotification />
                <LoadingOverlay />
                <CardGeneratorModal />
                <Container fluid className="p-0 m-0">
                <Row className="p-0 m-0">
                    <Col xs={12} className="p-0 m-0">
                        <Header />
                    </Col>
                  </Row>
                  <Row className="p-0 m-0">
                    <Col xs={12} className="p-0 m-0">
                        <HorizPageAd />                
                    </Col>
                  </Row>
                  <Row className="p-0 m-0">
                    <Col xs={12} className="p-0 m-0">
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
                    </Col>
                  </Row>
                  <Row className="p-0 m-0">
                    <Col xs={12} className="p-0 m-0"><HorizPageAd /></Col>
                  </Row>
                  <Row className="p-0 m-0">
                    <Col xs={12} className="p-0 m-0"><Footer /></Col>
                  </Row>
                </Container>
                </div>
               
              
                </>
        );
      }} /> 
    </Router>)

};


export default AppRouter;


