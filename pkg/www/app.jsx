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

        var sliderFormat = function(val1,val2,isUnlimited) {
            return val1 + "% - " + (isUnlimited ? 'Unlimited' : val2 + "%");
        };

        var containerStyle = {
            maxHeight: '915px',
            overflowY: 'scroll',
            position: 'absolute',
            right: '0px',
            top: '44px',
            width: '700px',
            height: '300px',
            backgroundColor: 'white',
            zIndex: '2000',
            boxShadow: '0 0 10px rgba(0,0,0,.2)'
        }
        return (
            <div style={{backgroundColor: 'red', height: '400px'}}>
                <IconMenu
                    style={{float: 'right'}}
                    iconStyle={{padding: '20px'}}
                    direction="right"
                    iconid="filter"
                    direction="left"
                    ref="IconMenu"
                    contentStyle={{width: '675px'}}
                    onChange={(s) => { console.log(s); }}
                >
                    <DateTimePicker
                        id="open_after_date"
                        ref="open_after_date"
                        onChange={(a,b) => {console.log('onChange: ', a);} }
                        label="After Date"
                        placeholder={["After Date", "Time"]}
                        value={this.state.date}
                    />
                    <FlatButton key="action1" ref="action1" secondary={true} onClick={() => { console.log(this.refs.open_after_date.getValue()); }}>Get Value</FlatButton>
                    <FlatButton key="action2" ref="action2" secondary={true} onClick={() => { this.refs.open_after_date.setDateTime("Mon Feb 03 2017 06:18:21 GMT-0500 (EST)"); }}>Change Date</FlatButton>
                    <FlatButton key="action3" ref="action3" secondary={true} onClick={() => { this.refs.open_after_date.setDateTime("Thu Feb 09 2017 20:15:00 GMT-0500 (EST)"); }}>Change Date</FlatButton>
                    <FlatButton key="action4" ref="action4" secondary={true} onClick={() => { this.refs.open_after_date.setDateTime(null); }}>Empty Date</FlatButton>
                </IconMenu>


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
