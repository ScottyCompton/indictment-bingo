import ReactDOM from 'react-dom';
import {store} from './appData';
import {Provider} from 'react-redux';
import App from './App';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hooks';
import {app_refreshUserSession} from './appData';

const AppLoader:React.FC = () => {
  const user = useAppSelector(state => state.appData.uiState.user);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if(!user) {
      dispatch(app_refreshUserSession());
    }
  }, [dispatch, user])


  return (
      <App />
    )
}


ReactDOM.render(<Provider store={store}><AppLoader /></Provider>, document.getElementById('root'));
