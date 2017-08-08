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

            "Layouts": [<H1 key="l1">Layouts</H1>, <CardElement key="l2" />, <PaperElement key="l3" />, <TwoColumnElement key="l4" />, <DialogElement key="l5" />],

            "Navigation": [<H1 key="n1">Navigation</H1>, <IconMenuElement key="n2" />, <LeftNavElement key="n3" />, <NavBarElement key="n4" />, <TabMenuElement key="n5" />],

            "Table": [<H1 key="t1">Table</H1>, <TableElement key="t2"/>],

            "TabularListing": [<H1 key="tb1">TabularListing</H1>, <TabularListingElement key="tb2"/>],

            "Form Elements": ([<H1 key="f1">Form Elements</H1>, <FieldsetElement key="f2" />, <SliderElement key="f3" />, <RangeSliderElement key="f4"/>]),

            "DateTimePicker":([<H1 key="d1">DateTime Elements</H1>, <DatePickerElement key="d2"/>, <TimePickerElement key="d3"/>, <DateTimePickerElement key="d4"/>]),

            "Buttons":([<H1 key="b1">Buttons</H1>, <FlatButtonElement key="b2"/>,<RaisedButtonElement key="b3"/> ]),

            "Switches":([<H1 key="s1">Switches</H1>,<CheckBoxElement key="s2"/>,<CheckBoxGroupElement key="s3"/>, <RadioButtonGroupElement key="s4"/> ]),

            "Icon": ([<H1 key="i1">Icons</H1>, <IconElement key="i2" />]),

            "Inputs": ([<H1 key="ii1">Inputs</H1>, <TextBoxElement key="ii2"/>, <TextAreaElement key="ii3"/>, <DropDownElement key="ii4"/>]),

            "Alert": ([<H1 key="a1">Alert</H1>, <AlertElement key="a2"/>])
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
                <div key="navside" style={navSideStyle}>
                    {LayoutNavigator}
                </div>
                <div key="layoutside" style={contentSideStyle}>
                    {LayoutSect}
                </div>

            </article>
        )
    }

}

module.exports = StripesDemo;