import React from 'react';

import { Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

import reducers from './src/reducers';
import thunk from 'redux-thunk';
import Route from './Route';

/* 
creating store for dev and production

*/

 const store = createStore(reducers, {}, applyMiddleware(thunk));

/* 

comment debug version of redux or install React Native debugger and enable debug in mobile

*/

// const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );
//

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}

export default App;
