import {Router, Route, Switch} from 'react-router-dom';
import {Paywall, Page, HomePage, Cards, NotFoundPage, CreateAccount, Subjects} from './pages';
import {Header, Footer} from './components/layout';
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
                                <Route path="/indictable-news" component={Page} />
                                <Route path="/indictable-swag" component={Page} />
                                <Route path="/donate" component={Page} />
                                <Route path="/about" component={Page} />
                                <Route path="/hate-mail" component={Page} />
                                <Route path="/whatitis" component={Page} />
                                <Route path="/howitworks" component={Page} />
                                <Route path="/subjects" component={Subjects} />
                                <Route path="/paywall" component={Paywall} />
                                {!user && <Route path="/createaccount" component={CreateAccount} />}
                                {user && <Route path="/cards" component={Cards} />}
                                <Route component={NotFoundPage} />
                            </Switch>

                              </div>
                            <AdvertBlock />

                      <Footer />
                  </div>
                </main>
                </>
        );
      }} /> 
    </Router>)

};


export default App;
