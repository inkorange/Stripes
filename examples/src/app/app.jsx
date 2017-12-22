import React from 'react';
import { render } from 'react-dom';
import { browserHistory} from 'react-router';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Stripes } from 'zebra-stripes/Core/Stripes'
require('es6-object-assign').polyfill();

// layouts
import {MainLayout} from './layouts/MainLayout';

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
    <div>
        <BrowserRouter history={ browserHistory }>
            <div>
                <Route exact path="/" render={() => <Redirect to={"home"} />} />
                <Route path="*" component={MainLayout}/>
            </div>
        </BrowserRouter>
    </div>
),  document.getElementById('app'));
