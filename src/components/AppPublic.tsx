import {Switch} from 'react-router-dom';
import {Row, Col, Container} from 'react-bootstrap';
import AppRoute from '../routes/AppRoute';
import appRoutes from '../fixtures/appRoutes';
import {LoadingOverlay, ToastNotification, CardGeneratorModal} from '../components';
import {v4 as uuid} from 'uuid';
import {useCallback} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {Header, Footer, HorizPageAd, NoLandscape} from '../components/layout'

const AppPublic:React.FC<any> = (props: any) => {

    const publicRouteList = useCallback(() => {
      return appRoutes.map((props) => {
        return <AppRoute key={uuid()} {...props} />
      })    
    }, [])
  
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
                    <TransitionGroup className="RTG">
                      <CSSTransition 
                          key={props.location.key}
                          timeout={2000}
                          classNames="fade"
                      >
                        <main>
                          <div className="page">                
                            <Switch location={props.location}>
                            {publicRouteList()}
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
    )
  }
  
  
  export default AppPublic;