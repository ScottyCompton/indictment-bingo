import {Router, Route, Redirect, Switch} from 'react-router-dom';
import {Paywall, Page, HomePage, LoginPage, Cards, NotFoundPage, CreateAccount, Subjects} from './pages';
import {Header, Footer} from './components/layout';
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {createBrowserHistory} from 'history';
import {useAppSelector} from './hooks'
import {LoadingOverlay, AdvertBlock, ToastNotification} from './components';


export const history = createBrowserHistory();



const App:React.FC<any> = (props:any) => {
  const user = useAppSelector(state => state.appData.uiState.user)


  return (
    <Router history={history} >
    <Route render={({location}) => {
        return (
          // <TransitionGroup className="RTG">
          //   <CSSTransition 
          //       key={location.key}
          //       timeout={1000}
          //       classNames="fade">
                <>
                <ToastNotification />
                <LoadingOverlay />
                <main>
                    <div className="page fade-in">
                        <Header />
                            <AdvertBlock />
                            <div className="content">
                            <Switch location={location}>
                                <Route path="/" component={HomePage} exact={true} />
                                <Route path="/about" component={Page} />
                                <Route path="/howitworks" component={Page} />
                                <Route path="/subjects" component={Subjects} />
                                <Route path="/paywall" component={Paywall} />
                                <Route path="/login">
                                  {user ? <Redirect to="/cards" /> : <LoginPage /> }
                                </Route>
                                {!user && <Route path="/createaccount" component={CreateAccount} />}
                                <Route path="/cards">
                                  {!user ? <Redirect to="/login" /> : <Cards />}
                                </Route> 
                                <Route component={NotFoundPage} />
                            </Switch>

                          </div>
                          <AdvertBlock />

                      <Footer />
                  </div>
                </main>
                </>
        //     </CSSTransition>
        // </TransitionGroup>
        );
      }} /> 
    </Router>)

};


export default App;
