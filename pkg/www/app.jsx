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
import { FlatButton, RaisedButton, RadioButtonGroup, CheckBoxGroup, CheckBox, Item, Fieldset, TextBox, TextArea, DropDown, DatePicker, TimePicker, DateTimePicker, Slider } from '../src/Forms'
import { Card } from '../src/Layouts'
import {Icon} from  '../src/Symbols/Icon'
import {Tooltip} from  '../src/Notifications/Tooltip'
import {ShowHide, TabMenu, IconMenu} from '../src/Layouts'

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
        this.changeIt = this.changeIt.bind(this);

        this.state = {
            checked: false,
            date: null //"Wed Feb 08 2017 05:22:00 GMT-0500 (EST)"
        }
    }

    componentDidMount() {
    }

    changeIt(e,v) {
        console.log(v);
    }

    render() {

        var labstyle = {
            padding: '10px',
            backgroundColor: 'rgb(240,240,240)'
        };
        var actions = ([
            <FlatButton key="action1" ref="action1" secondary={true}>Submit</FlatButton>,
            <FlatButton key="action2"
                        data-event-click="EMAIL_FORM"
                        ref="action2" secondary={true}>Cancel</FlatButton>
        ]);

        return (
            <div style={{backgroundColor: 'red', height: '400px'}}>

                <Tooltip iconid="info" width="400px" show={true}>This option will email a PDF file that contains all the images in this drawer for this load period.</Tooltip>



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

/*
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
 */
