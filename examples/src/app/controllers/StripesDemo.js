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
import {DatePickerElement} from '../element_guides/DateTimeElements'

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

            "DateTimePicker":([<H1>DateTime Elements</H1>, <DatePickerElement/>]),
            /*
            //inputs
            "DateTimePicker":(<div>
                        <section>
                            <H3>Date and Time Pickers</H3>
                            <DatePicker
                                width="150px"
                                placeholder="Select Date"
                            />
                            <TimePicker
                                width="150px"
                                placeholder="Select Time"
                            />
                        </section>
                        <section>
                            <H3>Date/Time Picker</H3>
                            <DateTimePicker
                                placeholder={["Date","Time"]}
                            />
                        </section>
                </div>),*/
            "Buttons": (<div>
            <section>
                <H3>FlatButton</H3>
                <FlatButton key="button1">FlatButton</FlatButton>
                <FlatButton key="button2" type="primary">FlatButton</FlatButton>
                <FlatButton key="button3" type="secondary" onClick={() => { alert('I clicked'); }}>FlatButton</FlatButton>
                <FlatButton key="button4" disabled={true}>FlatButton</FlatButton>
            </section>
            <section>
                <H3>RaisedButton</H3>
                <RaisedButton key="button5">RaisedButton</RaisedButton>
                <RaisedButton key="button6" type="primary">RaisedButton</RaisedButton>
                <RaisedButton key="button7" type="secondary">RaisedButton</RaisedButton>
            </section>
                </div>),
            "Checkbox": (<div>
                <H3>Checkbox ({this.state.checkboxdisable ? 'DISABLED' : 'VISIBLE'})</H3>
                <CheckBoxGroup ref="checkboxgroup" disabled={this.state.checkboxdisable}>
                    <Item defaultChecked={true} key="option1">Checkbox Option 1</Item>
                    <Item key="option2">Checkbox Option 2</Item>
                    <Item key="option3">Checkbox Option 3</Item>
                </CheckBoxGroup>
                <RaisedButton key="button1" onClick={() => { alert("Selected Values Are: " + this.refs.checkboxgroup.getValues()); }}>What are the Values?</RaisedButton>
                <RaisedButton key="button2" onClick={() => { this.refs.checkboxgroup.setChecked("Checkbox Option 1", false); }}>Un-checking A</RaisedButton>
                <RaisedButton key="button3" onClick={this.toggleCheckboxDisable}>Toggle Disable</RaisedButton>
            </div>),
            "RadioButtonGroup": (<div>
                    <H3>RadioButtonGroup ({this.state.radiobuttondisabled ? 'DISABLED' : 'VISIBLE'})</H3>
                    <RadioButtonGroup ref="radiobuttongroup" name="group1" disabled={this.state.radiobuttondisabled}>
                        <Item key="option1" defaultChecked={true} >Radio Option 1</Item>
                        <Item value="opt2" key="option2">Radio Option 2</Item>
                        <Item key="option3">Radio Option 3</Item>
                    </RadioButtonGroup>
                    <RaisedButton key="button1" onClick={() => { alert("Selected value is: " + this.refs.radiobuttongroup.getValues()); }}>What is the Value?</RaisedButton>
                    <RaisedButton key="button2" onClick={() => { this.refs.radiobuttongroup.setChecked("Radio Option 1", false); }}>Un-checking A</RaisedButton>
                    <RaisedButton key="button3" onClick={this.toggleRadioDisable}>Toggle Disable</RaisedButton>
                </div>),
            "Textbox": (<div>
                <H3>TextBox</H3>
                <Fieldset>
                    <TextBox placeholder="This is a placeholder" />
                </Fieldset>
                <Fieldset>
                    <TextBox width="50%" placeholder="This is a placeholder" />
                </Fieldset>
                <Fieldset>
                    <TextBox width="100%" placeholder="This is a placeholder" />
                </Fieldset>
                <Fieldset title="Input with Suggestions" style={{marginTop: "20px"}} >
                    <TextBox
                        width="50%"
                        showSuggestions={true}
                        suggestionData={['Alabama', 'Alaska','Arkansas','California','Colorado','New York','Connecticut']}
                        placeholder="This is a placeholder" />
                </Fieldset>
                <Fieldset>
                    <TextBox placeholder="This is a placeholder" error={this.state.inputerror}/>
                    <RaisedButton key="button1" onClick={this.toggleError}>Trigger Error</RaisedButton>
                </Fieldset>
            </div>),
            "TextArea": (<div>
                <H3>TextArea</H3>
                <Fieldset>
                    <TextArea placeholder="This is a placeholder" />
                </Fieldset>
                <Fieldset>
                    <TextArea width="100%" placeholder="This is a placeholder" />
                </Fieldset>
            </div>),
            "DropDown": (<div>
                <H3>DropDown</H3>
                <Fieldset>
                    <DropDown
                        placeholder="Please select an option..."
                        showEmpty={true}
                        width="250px"
                    >
                        <Item value={null} key="option0">--- select one ---</Item>
                        <Item value="1" key="option1">Select Option 1</Item>
                        <Item value="2" key="option2">Select Option 2</Item>
                        <Item value="3" key="option3">Select Option 3</Item>
                        <Item value="4" key="option4">Select Option 4</Item>
                        <Item value="5" key="option5">Select Option 5</Item>
                        <Item value="6" key="option6">Select Option 6</Item>
                        <Item value="7" key="option7">Select Option 7</Item>
                        <Item value="8" key="option8">Select Option 8</Item>
                        <Item value="9" key="option9">Select Option 9</Item>
                        <Item value="10" key="option10">Select Option 10</Item>
                        <Item value="11" key="option11">Select Option 11</Item>
                        <Item value="12" key="option12">Select Option 12</Item>
                        <Item value="13" key="option13">Super long input for this select Option 13</Item>
                    </DropDown>
                </Fieldset>
            </div>),

            // components
            "Alert": (<div>
                <H3>Alert</H3>
                <div style={{position: "relative", width: '35px', margin: '20px 20px 20px 200px'}}>
                    <Icon
                        iconid="admin"
                        size="large"/>
                    <Alert show={true}>This is an alert on the left</Alert>
                </div>
                <div style={{position: "relative",  width: '35px',margin: '20px'}}>
                    <Icon
                        iconid="admin"
                        size="large"
                        style={{cursor: 'pointer'}}
                        onClick={() => {this.setState({alertshow: !this.state.alertshow})}}
                    />
                    <Alert show={this.state.alertshow} position="right">This is an alert on the right</Alert>
                </div>
            </div>),
            "Icon": (<div>
                <H3>Icon</H3>
                <Icon
                    style={{margin: '10px'}}
                    iconid="view_by_2"
                    size="large"
                />
                <Icon
                    style={{margin: '10px'}}
                    iconid="view_by_2"
                    size="large"
                    type="primary"
                />
                <Icon
                    style={{margin: '10px'}}
                    iconid="view_by_2"
                    size="large"
                    color="orange"
                />
            </div>)
        };

        var h1style = {
            borderBottom: 'solid 1px #3366CC',
            paddingBottom: '20px'
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