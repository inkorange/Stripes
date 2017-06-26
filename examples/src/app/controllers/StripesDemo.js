"use strict"

import React from 'react'
import { render } from 'react-dom'

import {Typography} from '../element_guides/Typography'
import {CardElement} from '../element_guides/CardElement'
import {PaperElement} from '../element_guides/PaperElement'
import {TwoColumnElement} from '../element_guides/TwoColumnElement'
import {FieldsetElement} from '../element_guides/FieldsetElement'
import {DialogElement} from '../element_guides/DialogElement'
import {LeftNavElement} from '../element_guides/LeftNavElement'
import {NavBarElement} from '../element_guides/NavBarElement'
import {TabMenuElement} from '../element_guides/TabMenuElement'
import {IconMenuElement} from '../element_guides/IconMenuElement'
import {TableElement} from '../element_guides/TableElement'
import {TabularListingElement} from '../element_guides/TabularListingElement'
import {SliderElement, RangeSliderElement} from '../element_guides/SliderElements'
import {DatePickerElement, TimePickerElement, DateTimePickerElement} from '../element_guides/DateTimeElements'
import {FlatButtonElement, RaisedButtonElement} from '../element_guides/ButtonElements'
import {CheckBoxElement, CheckBoxGroupElement, RadioButtonGroupElement} from '../element_guides/SwitchElements'
import {IconElement} from '../element_guides/IconElement'
import {AlertElement} from '../element_guides/AlertElement'
import {TextBoxElement, TextAreaElement, DropDownElement} from '../element_guides/InputElements'

import {FlatButton, RaisedButton} from 'zebra-stripes/Forms'

import {Card, Dialog, Paper, TwoColumnLayout, IconMenu, LeftNav, NavBar, TabMenu} from 'zebra-stripes/Layouts'
import {H1, H2, H3, Title, A} from 'zebra-stripes/Typography'

import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from 'zebra-stripes/Table'
import {TabularListing} from 'zebra-stripes/Elements/TabularListing'

import {RadioButtonGroup, CheckBoxGroup, Item, Fieldset, TextBox, TextArea, DropDown, DatePicker, TimePicker, DateTimePicker, Slider} from 'zebra-stripes/Forms'

import {Alert} from  'zebra-stripes/Notifications/Alert'
import {Icon} from  'zebra-stripes/Symbols/Icon'

import { Stripes } from 'zebra-stripes/Core/Stripes'

class StripesDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertshow: true,
            checkboxdisable: false,
            radiobuttondisabled: false,
            inputerror: null
        }
        this.toggleCheckboxDisable = this.toggleCheckboxDisable.bind(this);
        this.toggleRadioDisable = this.toggleRadioDisable.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this._scrollToFromMenu = this._scrollToFromMenu.bind(this);
    }

    componentDidMount() {
    }

    toggleCheckboxDisable() {
        this.setState({
            checkboxdisable: !this.state.checkboxdisable
        });
    }

    toggleRadioDisable() {
        this.setState({
            radiobuttondisabled: !this.state.radiobuttondisabled
        });
    }

    toggleError() {
        this.setState({
            inputerror: this.state.inputerror ? null : 'you have an error.'
        });
    }

    toggleMenu() {
        this.refs.LeftNav.toggleMenu();
    }

    _scrollToFromMenu(e) {
        e.preventDefault();
        var target = e.target.getAttribute("data-anchor").substring(1);
        var deviation = 0;
        var ypos = document.getElementById(target).offsetTop - deviation;
        window.location.hash = '#'+target;
        //console.log(document.getElementById(target).offsetTop, ypos);
        window.scrollTo(0, ypos);
        return false;
    }

    _syncWithLeftNav() {
        console.log(window.scrollY);
        if(window.scrollY > 50) {
            console.log('add class');
        }

    }

    render() {
        var tableCells = [];
        for(var i =0; i < 10; i++) {
            tableCells.push(
                <TableRow key={"row"+i}>
                    <TableCell>A{i}</TableCell>
                    <TableCell>B{i}</TableCell>
                </TableRow>
            );
        };

        var StyleGuideConfig = {

            // layouts
            "Typography": (<Typography />),

            "Layouts": [<H1>Layouts</H1>, <CardElement />, <PaperElement />, <TwoColumnElement />, <DialogElement />],

            "Navigation": [<H1>Navigation</H1>, <IconMenuElement />, <LeftNavElement />, <NavBarElement />, <TabMenuElement />],

            "Table": [<H1>Table</H1>, <TableElement/>],

            "TabularListing": [<H1>TabularListing</H1>, <TabularListingElement/>],

            "Form Elements": ([<H1>Form Elements</H1>, <FieldsetElement />, <SliderElement />, <RangeSliderElement/>]),

            "DateTimePicker":([<H1>DateTime Elements</H1>, <DatePickerElement/>, <TimePickerElement/>, <DateTimePickerElement/>]),

            "Buttons":([<H1>Buttons</H1>, <FlatButtonElement/>,<RaisedButtonElement/> ]),

            "Switches":([<H1>Switches</H1>,<CheckBoxElement/>,<CheckBoxGroupElement/>, <RadioButtonGroupElement/> ]),

            "Icon": ([<H1>Icons</H1>, <IconElement />]),

            "Inputs": ([<H1>Inputs</H1>, <TextBoxElement/>, <TextAreaElement/>, <DropDownElement/>]),

            // components
            "Alert": ([<H1>Alert</H1>, <AlertElement/>])

                /*
                <div style={{position: "relative", width: '35px', margin: '20px 20px 20px 200px'}}>
                    <Icon
                        iconid="admin"
                        size="large"/>
                    <Alert show={true}>This is an alert on the left</Alert>
                </div>
                <div style={{position: "relative",  width: "35px",margin: "20px"}}>
                    <Icon
                        iconid="admin"
                        size="large"
                        style={{cursor: "pointer"}}
                        onClick={() => {this.setState({alertshow: !this.state.alertshow})}}
                    />
                    <Alert show={this.state.alertshow} position="right">This is an alert on the right</Alert>
                </div>
            </div>)
            */

        };

        var navSideStyle = {
            marginTop: '-40px',
            width: '160px',
            position: 'fixed'
        };

        var contentSideStyle = {
            marginLeft: '200px',
            position: 'relative'
        };








        var LayoutNavigator = [];
        var LayoutSect = [];

        Object.keys(StyleGuideConfig).map((k,v) => {
            LayoutSect.push(<section id={k} key={"comp"+k}>{StyleGuideConfig[k]}</section>);
            LayoutNavigator.push(<p style={{lineHeight: '15px'}} key={"nav"+k}><A onClick={this._scrollToFromMenu} data-anchor={"#" + k}>{k}</A></p>);
        });






        return (
            <article className="main_content_child" style={{padding: '0 0 105px 0', marginTop: '140px'}}>
                <div style={navSideStyle}>
                    {LayoutNavigator}
                </div>
                <div style={contentSideStyle}>
                    {LayoutSect}
                </div>

            </article>
        )
    }

}

module.exports = StripesDemo;