import React from 'react';
import { render } from 'react-dom';

import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'
import { Stripes } from '../src/Core/Stripes'

import {NavBar} from '../src/Layouts'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../src/Table'
import {TabularListing} from '../src/Elements/TabularListing'
import { Title, H1, H2, H3 } from '../src/Typography'
import {Icon} from  '../src/Symbols/Icon'
import {ShowHide, TabMenu} from '../src/Layouts'
import {Item} from '../src/Forms'

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

class Sandbox extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }



    render() {

        var labstyle = {
            padding: '10px',
            backgroundColor: 'rgb(240,240,240)'
        };

        return (
            <div>

                <Title>This is the title text and we need it to wrap This is the title text and we need it to wrap This is the title text and we need it to wrap</Title>
                <H1>this is header text that will wrap  this is header text that will wrap  this is header text that will wrap  this is header text that will wrap  this is header text that will wrap</H1>
                <H2>this is header text that will wrap this is header text that will wrap this is header text that will wrap this is header text that will wrap</H2>
                <H3>this is header text that will wrap this is header text that will wrap this is header text that will wrap this is header text that will wrap this is header text that will wrap</H3>


                <ShowHide
                    label="Show Hide This"
                    initialShow={true}
                    labelStyle={labstyle}
                    contentStyle={{padding: '10px'}}
                    icons={["up","down"]}
                >
                    <p>This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open</p>
                    <p>This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open</p>
                    <p>This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open</p>
                    <p>This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open</p>
                    <p>This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open</p>
                    <p>This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open This Text will only show if this component is currently open</p>
                </ShowHide>
               <p>outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text</p>
                <p>outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text</p>
                <p>outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text</p>
                <p>outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text outside the text</p>


            </div>
        )

        /*
        return (

            <div>Get to building...</div>
        )
        */
    }
};

// theme
const theme = require('./themes/Theme');
const icons = require('./themes/iconLibrary.js');

Stripes({
    palette: theme.palette,
    spacing: theme.spacing,
    icons: icons
});

render((

    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <IndexRoute component={Sandbox} />
        </Route>
    </Router>

),  document.getElementById('app'));
