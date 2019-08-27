import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './pages/App';

export const ROUTES = {
    SEARCH_PARAM: "searchParam"
};

const routing = (
    <Router>
        <div>
            <Route path={`/:${ROUTES.SEARCH_PARAM}?`} component={App} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
