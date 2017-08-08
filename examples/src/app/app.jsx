import React from 'react';
import { render } from 'react-dom';
import { browserHistory} from 'react-router';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Stripes } from 'zebra-stripes/Core/Stripes'
require('es6-object-assign').polyfill();

// layouts
const MainLayout = require('./layouts/MainLayout');

// theme
const theme = require('./themes/Theme');

// page components

const icons = require('./themes/iconLibrary.js');

Stripes({
   palette: theme.palette,
   spacing: theme.spacing,
   icons: icons
});

render((
    <BrowserRouter history={ browserHistory }>
        <div>
            <Route exact path="/" render={() => <Redirect to={"home"} />} />
            <Route exact path="/home" component={MainLayout} />
            <Route exact path="/components" component={MainLayout} />
        </div>
    </BrowserRouter>
),  document.getElementById('app'));
