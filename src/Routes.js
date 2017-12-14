import React from 'react';
import {
    Router,
    Route
} from 'react-router-dom';
import Pool from './Polling';
import Create from './Create';
import showPoll from './showPoll';
import editPoll from './editPoll';


import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory()

const MyRoutes = () => (
    <Router history={customHistory}>
        <div>
            <Route exact path="/" component={Pool} />
            <Route path="/create" component={Create} />
            <Route path="/showPoll" component={showPoll} />
            <Route path="/editPoll" component={editPoll} />
            {/*<Route path="/contact/:username" component={Contact} />*/}
            {/*<Route component={Nothing} />*/}

        </div>
    </Router>
)

export default MyRoutes;