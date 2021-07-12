import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {HomePage, LoginPage, Cards, NotFoundPage} from './pages';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {createBrowserHistory} from 'history';
export const history = createBrowserHistory();

const AppRouter:React.FC<any> = (props:any) => {

  return (
    <Router history={history} >
    <Route render={({location}) => {
        return (
          <TransitionGroup className="RTG">
            <CSSTransition 
                key={location.key}
                timeout={1000}
                classNames="fade">
              <div>
                <Switch location={location}>
                  <Route path="/" component={HomePage} exact={true} />
                  <Route path="/login" component={LoginPage} />
                  <Route path={"/cards"} component={Cards} exact={true} />      
                  <Route component={NotFoundPage} />
                </Switch>   
              </div>
            </CSSTransition>
        </TransitionGroup>
        );
      }} /> 
    </Router>)

};


export default AppRouter;
