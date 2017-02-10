"use strict"

import React from 'react'
import { render } from 'react-dom'

import {Typography} from '../element_guides/Typography'
import {CardElement} from '../element_guides/CardElement'
import {PaperElement} from '../element_guides/PaperElement'
import {TwoColumnElement} from '../element_guides/TwoColumnElement'
import {FieldsetElement} from '../element_guides/FieldsetElement'

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
        this.toggleDialog = this.toggleDialog.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this._setTableState = this._setTableState.bind(this);
        this._scrollToFromMenu = this._scrollToFromMenu.bind(this);
    }

    componentDidMount() {
        //window.addEventListener('scroll', this._syncWithLeftNav);
        var els = document.getElementsByTagName('section');
        console.log(els);
        /*
        els.map(el => {
           console.log(el.offsetTop);
        });
        */
    }

    componentWillUnmount() {
    }

    componentWillUpdate() {
    }

    _setTableState() {
        return {
            structure: [
                {
                    width: '150px',
                    name: 'Make',
                    icon: 'alert',
                    field: 'make',
                    filterable: false,
                    sortable: false,
                    className: 'column-notes'
                },
                {
                    name: 'Model',
                    field: 'model',
                    filterable: false,
                    sortable: true
                },
                {
                    name: 'Year',
                    field: 'year',
                    filterable: false,
                    sortable: true
                }
            ],
            rows: [
                {make: 'Ford', model: 'Focus', year: '2005'},
                {make: 'Ford', model: 'Bronco', year: '2001'},
                {make: 'Acura', model: 'TSX', year: '2012'},
                {make: 'Acura', model: 'TLX', year: '2016'},
                {make: 'Toyota', model: 'Camery', year: '2015'},
                {make: 'Toyota', model: 'Corolla', year: '2017'},
                {make: 'Toyota', model: 'Avalon', year: '2010'},
                {make: 'Nissan', model: 'Altima', year: '2008'},
                {make: 'Honda', model: 'CRV', year: '2015'},
                {make: 'Honda', model: 'Accord', year: '2014'}
            ],
            collection: {
                end: 10,
                returned: 10,
                start: 1,
                timestamp: 1484924493000,
                total: 10
            },
            sort_by: "model",
            sort_direction: "desc"
        };
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

    toggleDialog(open) {
        if(open) {
            this.refs.Dialog.open();
        } else {
            this.refs.Dialog.close();
        }
    }

    closeMenu() {
        this.refs.LeftNav.close();
    }

    toggleMenu() {
        this.refs.LeftNav.toggleMenu();
    }

    _scrollToFromMenu(e) {
        e.preventDefault();
        var target = e.target.getAttribute("data-anchor").substring(1);
        var deviation = 0;
        var ypos = document.getElementById(target).offsetTop - deviation;
        console.log(document.getElementById(target).offsetTop, ypos);
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

        var dataObj = this._setTableState();

        var StyleGuideConfig = {

            // layouts
            "Typography": (<Typography />),

            "Layouts": [<H1>Layouts</H1>, <CardElement />, <PaperElement />, <TwoColumnElement />],
            
            "Fieldset": (<FieldsetElement />),
            "Dialog": (<div>
                <H3>Dialog</H3>
                <RaisedButton key="action1" onClick={() => { this.toggleDialog(true); }}>Launch Dialog</RaisedButton>
                <Dialog ref="Dialog"
                        modal={true}
                        title="This is the Card Title"
                        width="50%"
                        actions={[
                                                <FlatButton key="action1" onClick={() => { this.toggleDialog(false); }}>Submit</FlatButton>,
                                                <RaisedButton key="action2" onClick={() => { this.toggleDialog(false); }}type="primary">Cancel</RaisedButton>
                                            ]}
                >
                    This is the content area of the dialog.This is the content area of the dialog.This is the content
                    area of the dialog.This is the content area of the dialog.This is the content area of the
                    dialog.This is the content area of the dialog.This is the content area of the dialog.This is the
                    content area of the dialog.
                </Dialog>
            </div>),
            "LeftNav": (<div>
                <H3>LeftNav</H3>
                <LeftNav ref="LeftNav" modal={true}>

                    <Paper style={{width: '90%', margin: '20px 5%'}} depth="1">You can nest any kind of component in
                        here, this is a Paper component.</Paper>
                    <RaisedButton style={{position: 'absolute', bottom: 0, left: 0, width: 'calc(100% - 10px)'}}
                                  key="button6" type="primary" onClick={this.closeMenu}>Manually Close</RaisedButton>
                </LeftNav>
                                        <pre>
                                        <code className="language-js">
                                            {
                                                '<LeftNav ref="LeftNav" modal={true}>\n' +
                                                '    Left Nav Content\n' +
                                                '</LeftNav>\n'
                                            }
                                        </code>
                                        </pre>
            </div>),
            "NavBar": (<div>
                <H3>NavBar</H3>
                <NavBar ref="NavBar"
                        leftIcon={(
                                                <Icon
                                                    color="white"
                                                    iconid="menu"
                                                    size="medium"
                                                    onClick={this.toggleMenu}
                                                    basestyle={{cursor: 'pointer', height: '25px', marginTop: '18px', lineHeight: 0}}
                                                />)}
                        title="This is a NavBar Title"
                >
                    This is my nav bar, hope you enjoy.
                </NavBar>
                                        <pre>
                                        <code className="language-js">
                                            {
                                                '<NavBar ref="NavBar"\n' +
                                                '        leftIcon={(\n' +
                                                '                <Icon\n' +
                                                '                    color="white"\n' +
                                                '                    iconid="menu"\n' +
                                                '                    size="medium"\n' +
                                                '                    onClick={this.toggleMenu}\n' +
                                                '                    basestyle={{cursor: "pointer", height: "25px", marginTop: "18px", lineHeight: 0}}\n' +
                                                '        />)}\n' +
                                                '        title="This is a NavBar Title"\n' +
                                                '>\n' +
                                                '    This is my nav bar, hope you enjoy.\n' +
                                                '</NavBar>\n'
                                            }
                                        </code>
                                        </pre>
            </div>),
            "TabMenu": (<div>
                <H3>TabMenu</H3>
                <TabMenu>
                    <Item key="tab1" label="Menu Item 1"/>
                    <Item key="tab2" selected={true} label="Menu Item 2"/>
                    <Item key="tab3" label="Menu Item 3"/>
                    <Item key="tab4" label="Menu Item 4"/>
                </TabMenu>
            </div>),
            "IconMenu": (<div>
                <H3>IconMenu</H3>
                <IconMenu style={{float: 'right'}} iconid="filter" direction="left" max-width="500px">
                    <TwoColumnLayout
                        style={{padding: '20px', width: '300px'}}
                        columnOne={<div>This is content for the first column. This will display on the left side of the component.</div>}
                        columnTwo={<div>This is content for the second column. This will display on the right side of the component.</div>}
                    />
                </IconMenu>
                <IconMenu iconid="filter" direction="bottom" max-width="500px">
                    <TwoColumnLayout
                        style={{padding: '20px', width: '300px'}}
                        columnOne={<div>This is content for the first column. This will display on the left side of the component.</div>}
                        columnTwo={<div>This is content for the second column. This will display on the right side of the component.</div>}
                    />
                </IconMenu>
                <IconMenu style={{marginLeft: '50px'}} iconid="filter" direction="top" max-width="500px">
                    <TwoColumnLayout
                        style={{padding: '20px', width: '300px'}}
                        columnOne={<div>This is content for the first column. This will display on the left side of the component.</div>}
                        columnTwo={<div>This is content for the second column. This will display on the right side of the component.</div>}
                    />
                </IconMenu>
            </div>),
            "Table": (<div>
                <H3>Table (no fixed height)</H3>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHeaderCell>Head 1</TableHeaderCell>
                            <TableHeaderCell>Head 2</TableHeaderCell>
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody>
                        {tableCells}
                    </TableBody>
                </Table>

                <H3>Table (with a fixed height)</H3>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHeaderCell isSortable={true}>Head 1</TableHeaderCell>
                            <TableHeaderCell isSortable={true} sortdirection="desc">Head 2</TableHeaderCell>
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody height="200px" zebraStripes={true}>
                        {tableCells}
                    </TableBody>
                </Table>
            </div>),
            "TabularListing": (<div>
                <H3>TableListing</H3>
                <p>Users would pass through a complex table structure object, similar to an API response</p>

                <TabularListing
                    bodyHeight="250px"
                    data={dataObj}
                    onRowClick={() => {}}
                    onValueClick={() => {}}
                    headerClick={() => {}}
                    sortable={() => {}}
                />

                                        <pre>
                                        <code className="language-js">
                                            {
                                                "var dataObj = {\n" +
                                                "   structure: [\n" +
                                                "       {\n" +
                                                "           width: '150px',\n" +
                                                "           name: 'Make',\n" +
                                                "           icon: 'alert',\n" +
                                                "           field: 'make',\n" +
                                                "           filterable: false,\n" +
                                                "           sortable: false,\n" +
                                                "           className: 'column-notes'\n" +
                                                "       },\n" +
                                                "       {\n" +
                                                "           name: 'Model',\n" +
                                                "           field: 'model',\n" +
                                                "           filterable: false,\n" +
                                                "           sortable: true\n" +
                                                "       },\n" +
                                                "       {\n" +
                                                "           name: 'Year',\n" +
                                                "           field: 'year',\n" +
                                                "           filterable: false,\n" +
                                                "           sortable: true\n" +
                                                "       }\n" +
                                                "   ],\n" +
                                                "   rows: [\n" +
                                                "       {make: 'Ford', model: 'Focus', year: '2005'},\n" +
                                                "       {make: 'Ford', model: 'Bronco', year: '2001'},\n" +
                                                "       {make: 'Acura', model: 'TSX', year: '2012'},\n" +
                                                "       {make: 'Acura', model: 'TLX', year: '2016'},\n" +
                                                "       {make: 'Toyota', model: 'Camery', year: '2015'},\n" +
                                                "       {make: 'Toyota', model: 'Corolla', year: '2017'},\n" +
                                                "       {make: 'Toyota', model: 'Avalon', year: '2010'},\n" +
                                                "       {make: 'Nissan', model: 'Altima', year: '2008'},\n" +
                                                "       {make: 'Honda', model: 'CRV', year: '2015'},\n" +
                                                "       {make: 'Honda', model: 'Accord', year: '2014'}\n" +
                                                "   ],\n" +
                                                "   collection: {\n" +
                                                "       end: 10,\n" +
                                                "       returned: 10,\n" +
                                                "       start: 1,\n" +
                                                "       timestamp: 1484924493000,\n" +
                                                "       total: 10\n" +
                                                "   },\n" +
                                                "   sort_by: 'model',\n" +
                                                "   sort_direction: 'desc'\n" +
                                                "};\n\n" +
                                                "<TabularListing\n" +
                                                "    bodyHeight='250px'\n" +
                                                "    data={dataObj}\n" +
                                                "    onRowClick={() => {}}\n" +
                                                "    onValueClick={() => {}}\n" +
                                                "    headerClick={() => {}}\n" +
                                                "    sortable={() => {}}\n" +
                                                "/>\n"
                                            }
                                        </code>
                                        </pre>
            </div>),

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
                </div>),
            "Slider": (<div>
                <H3>Slider</H3>
                <Slider />
            </div>),
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
                        <Item key="option2">Radio Option 2</Item>
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