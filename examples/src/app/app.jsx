import React from 'react';
import { render } from 'react-dom';

import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'

import { Stripes } from '../lib/Core/Stripes'

// layouts
const MainLayout = require('./layouts/MainLayout');

// theme
const theme = require('./themes/Theme');

// page components
const StripesDemo = require('./controllers/StripesDemo');

Stripes({
   palette: theme.palette,
   spacing: theme.spacing
});

render((

    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <IndexRoute component={StripesDemo} />
        </Route>
    </Router>

),  document.getElementById('app'));