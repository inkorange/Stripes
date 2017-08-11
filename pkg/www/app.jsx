import React from 'react';
import { render } from 'react-dom'
import { browserHistory} from 'react-router';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { Stripes } from '../src/Core/Stripes'

import {NavBar} from '../src/Layouts'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../src/Table'
import {TabularListing} from '../src/Elements/TabularListing'
import {TabularDetail} from '../src/Elements/TabularDetail'
import { A, Title, H1, H2, H3 } from '../src/Typography'
import { FlatButton, RaisedButton, RadioButtonGroup, CheckBoxGroup, CheckBox, Item, Fieldset, TextBox, TextArea, DropDown, DatePicker, TimePicker, DateTimePicker, Slider, RangeSlider } from '../src/Forms'
import { Dialog, Card, LeftNav, MenuItem, TwoColumnLayout } from '../src/Layouts'
import {Calendar} from '../src/Elements/Calendar'
import {Icon} from  '../src/Symbols/Icon'
import {Tooltip} from  '../src/Notifications/Tooltip'
import {Tag, ShowHide, TabMenu, IconMenu} from '../src/Layouts'
import {Alert} from '../src/Notifications/Alert'
import {ProgressSpinner} from '../src/Elements/ProgressSpinner'
require('es6-object-assign').polyfill();

import m from 'moment'
// theme
const theme = require('./themes/Theme');
const icons = require('./themes/iconLibrary.js');

Stripes({
    palette: theme.palette,
    spacing: theme.spacing,
    icons: icons
});




class Sandbox extends React.Component {

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    componentWillUpdate(props) {
    }
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Add Sandbox Creation BELOW %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
    render() {
        return (
            <div>
                <Icon iconid="admin"
                      style={{margin: "10px"}}
                      onClick={() => { alert("clicked admin"); }}
                      size="large"/>
                <Calendar />
            </div>
        )
    }
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Add Sandbox Creation ABOVE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
};


render((
    <BrowserRouter history={ browserHistory }>
        <div>
            <Route exact path="/" component={Sandbox} />
        </div>
    </BrowserRouter>
),  document.getElementById('app'));
