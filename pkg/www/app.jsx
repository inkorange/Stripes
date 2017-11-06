import React from 'react';
import { render } from 'react-dom'
import { browserHistory} from 'react-router';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import { Stripes } from '../src/Core/Stripes'

import {NavBar} from '../src/Layouts'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../src/Table'
import {TabularListing} from '../src/Elements/TabularListing'
import {TabularDetail} from '../src/Elements/TabularDetail'
import {Ribbon, Alert, Tooltip} from '../src/Notifications'
import {Debug} from '../src/Notifications/Debug'
import { A, Title, H1, H2, H3 } from '../src/Typography'
import { FlatButton, RaisedButton, RadioButtonGroup, CheckBoxGroup, CheckBox, Item, Fieldset, TextBox, TextArea, DropDown, DatePicker, TimePicker, DateTimePicker, Slider, RangeSlider } from '../src/Forms'
import { Dialog, Card, LeftNav, MenuItem, TwoColumnLayout } from '../src/Layouts'
import {Calendar} from '../src/Elements/Calendar'
import {Icon} from  '../src/Symbols/Icon'
import {Tag, ShowHide, TabMenu, IconMenu} from '../src/Layouts'
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
        NavBar: null
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.state = {
            showtooltip: false,
            showribbon: false,
            navwidth: '200px'
        };
    }

    componentDidMount() {
    }

    componentWillUpdate(props) {
    }

    toggleDialog(open) {
        if(open) {
            this.refs.Dialog.open();
        } else {
            this.refs.Dialog.close();
        }
    }


/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Add Sandbox Creation BELOW %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
    render() {

        return (
            <div ref="top" style={{margin: '50px'}}>

                <Slider /><br/>
                <RangeSlider /><br/>

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
