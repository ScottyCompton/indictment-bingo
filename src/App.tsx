import {Router, Route, Switch} from 'react-router-dom';
import {HomePage, LoginPage, Cards, NotFoundPage, CreateAccount} from './pages';
import {Header, Footer} from './components/layout';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {createBrowserHistory} from 'history';
import {useAppSelector} from './hooks'
import {LoadingOverlay} from './components';

export const history = createBrowserHistory();



const AppRouter:React.FC<any> = (props:any) => {
  const {user} = useAppSelector(state => state.appData.uiState)



  return (
    <Router history={history} >
    <Route render={({location}) => {
        return (
          <TransitionGroup className="RTG">
            <CSSTransition 
                key={location.key}
                timeout={1000}
                classNames="fade">
                <>
                <LoadingOverlay />
                <main>
                    <div className="page">
                        <Header />
                            <div className="content">
                            {!user &&
                              <Switch location={location}>
                                <Route path="/" component={HomePage} exact={true} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/cards" component={LoginPage} />
                                <Route path="/createaccount" component={CreateAccount} />
                                <Route component={NotFoundPage} />
                              </Switch>
                            }

                            {user && 
                              <Switch>
                                <Route path="/" component={HomePage} exact={true} />
                                <Route path="/cards" component={Cards} />
                                <Route component={NotFoundPage} />
                              </Switch>
                            }
                          </div>
                      <Footer />
                  </div>
                </main>
                </>
            </CSSTransition>
        </TransitionGroup>
        );
      }} /> 
    </Router>)

};


export default AppRouter;
