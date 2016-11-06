import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, hashHistory} from 'react-router';
import routes from './routes';
import rootReducers from './reducers/index-reducer';
import './components/bundle.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import logMiddleware from './middlewares/log-middleware';
import resourceMiddleware from './middlewares/resource-middleware';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index-sagas';
import ReduxToastr from 'react-redux-toastr';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logMiddleware, resourceMiddleware, routerMiddleware(hashHistory), sagaMiddleware];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(rootReducers);
sagaMiddleware.run(rootSaga);

// Needed for onTouchTap refer http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(hashHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}
              onUpdate={() => window.scrollTo(0, 0)}
              routes={routes}
      />
      <ReduxToastr position="bottom-right"/>
    </div>
  </Provider>,
  document.getElementById('bms-root'));
