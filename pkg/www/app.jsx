import React from 'react';
import { render } from 'react-dom';

import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'
import { Stripes } from '../src/Core/Stripes'

import { Slider } from '../src/Forms/Slider'
import { Title, H1, H3 } from '../src/Typography'

// layouts
const MainLayout = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});

const Sandbox = React.createClass({
    render() {
        return (
            <div>
                <Title>SANDBOX</Title>
                <div style={{width:'50%', margin: '25px auto'}}>
                    <Slider />
                </div>
            </div>
        )
    }
});

// theme
const theme = require('./themes/Theme');

Stripes({
    palette: theme.palette,
    spacing: theme.spacing
});

render((

    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <IndexRoute component={Sandbox} />
        </Route>
    </Router>

),  document.getElementById('app'));
