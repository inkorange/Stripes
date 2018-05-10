import React from 'react';
import { render } from 'react-dom'
import { browserHistory} from 'react-router';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { autobind } from 'core-decorators';
import { Stripes } from '../src/Core/Stripes'

import {NavBar} from '../src/Layouts'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../src/Table'
import {TabularListing} from '../src/Elements/TabularListing'
import {TabularDetail} from '../src/Elements/TabularDetail'
import { A, Title, H1, H2, H3 } from '../src/Typography'
import { FlatButton, RaisedButton, RadioButtonGroup, CheckBox, CheckBoxGroup, Item, Fieldset, TextBox, TextArea, DropDown, DatePicker, TimePicker, DateTimePicker, Slider, RangeSlider } from '../src/Forms'
import { Dialog, Card, LeftNav, MenuItem, TwoColumnLayout } from '../src/Layouts'
import {Icon} from  '../src/Symbols/Icon'
import {Tooltip, Alert, Tour} from  '../src/Notifications'
import {Tag, ShowHide, TabMenu, IconMenu} from '../src/Layouts'
import {ProgressSpinner} from '../src/Elements/ProgressSpinner'
require('es6-object-assign').polyfill();

import m from 'moment'

const annotationAlertFn = function(val, field) {
    if(!val) {
        return null;
    }
    if (field === "alerts" && val.length && window.breakpoint.name !== 'xsmall') { // active alerts
        var ieStyle = Global.isIE ? {height: '50px'} : null;
        return (<AlertAnnotation style={'black'} alerts={val}></AlertAnnotation>);
    }
    if (field === "alert_count" && val === true && !hasAlert) {
        return (<Icon iconid="circle_alert" color={'red'} size="small"/>);
    }
    if (field === "bookmarks" && val === true) {
        return (<Icon iconid="note" color={'blue'} size="small"/>);
    }
};

const tableStructure = [
    {
        name: "Tag ID",
        width: "200px",
        field: ["epc_id"],
        filterable: false,
        sortable: true
    },
    {
        width: "125px",
        name: "Velocity (ft/s)",
        field: ["velocity"],
        filterable: false,
        sortable: false
    },
    {
        width: "100px",
        name: "X (ft)",
        field: ["position.x"],
        filterable: false,
        sortable: true
    },
    {
        width: "100px",
        name: "Y (ft)",
        field: ["position.y"],
        filterable: false,
        sortable: true
    },
    {
        width: "100px",
        name: "Z (ft)",
        field: ["position.z"],
        filterable: false,
        sortable: true
    },
    {
        width: "150px",
        name: "Confidence",
        field: ["confidence"],
        filterable: false,
        sortable: true
    }
];

@autobind
class Sandbox extends React.Component {

    static defaultProps = {
        className: '',
        doors: [
            {title: 'RS-TITLE1', value: '3:32', className: 'inactive'},
            {title: 'RS-TITLE2', value: '', className: 'active'},
            {title: 'RS-TITLE3', value: '22%', className: 'inactive'},
            {title: 'RS-TITLE4', value: '33%', className: 'needsimprovement'},
            {title: 'RS-TITLE5', value: '', className: 'ready'},
            {title: 'RS-TITLE6', value: '55%', className: 'ready'},
            {title: 'RS-TITLE7', value: '', className: 'ready'},
            {title: 'RS-TITLE8', value: '', className: 'unavailable'},
            {title: 'RS-TITLE9', value: '23%', className: 'poor'},
            {title: 'RS-TITLE10', value: '', className: 'ready'},
            {title: 'RS-TITLE11', value: '', className: 'ready'},
            {title: 'RS-TITLE1', value: '3:32', className: 'inactive'},
            {title: 'RS-TITLE2', value: '', className: 'active'},
            {title: 'RS-TITLE3', value: '22%', className: 'inactive'},
            {title: 'RS-TITLE4', value: '33%', className: 'needsimprovement'},
            {title: 'RS-TITLE5', value: '', className: 'ready'},
            {title: 'RS-TITLE6', value: '55%', className: 'ready'},
            {title: 'RS-TITLE7', value: '', className: 'ready'},
            {title: 'RS-TITLE8', value: '', className: 'unavailable'},
            {title: 'RS-TITLE9', value: '23%', className: 'poor'},
            {title: 'RS-TITLE10', value: '', className: 'ready'},
            {title: 'RS-TITLE11', value: '', className: 'ready'}
        ]
    }

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            count: 0,
            sort: null,
            sort_by: 'epc_id'
        };
        this.countInterval = null;
    }

    componentDidMount() {
        setTimeout(this.killTest, 10000);
        //this.countInterval = setInterval(this.updateData, 10);
    }

    componentWillUpdate(props) {
    }

    componentWillMount() {

    }

    killTest() {
        clearInterval(this.countInterval);
    }

    updateData() {
        let i = Math.floor(Math.random()*20)+1;
        this.state.rows[i] = {epc_id: i, velocity: Math.floor(Math.random()*3), position: {x: Math.floor(Math.random()*50), y:Math.floor(Math.random()*50), z:Math.floor(Math.random()*5)}, confidence: Math.floor(Math.random()*100), alert: null};
        this.setState({
            count: this.state.count + 1,
            rows: this.state.rows
        });
    }

    testDropDown(a) {
        this.setState({
            sort: a
        });
    }

    sortByColumn(a,b) {
        console.log('switching sort_by to ', a);
    }

    RowSelection(v) {
        console.log(v);
    }

    render() {
        const dataObj = {
            structure: tableStructure,
            rows: this.state.rows,
            sort_by: this.state.sort_by,
            sort_direction: 'desc',
        };
        return (
            <div>

                <TabMenu className="LiveTabMenu" contentStyle={{height: 'calc(20vh - 50px)', position: 'relative'}}>
                    <Item width="250px" key="tab1" label="Tag Details">
                    </Item>
                    <Item width="250px" key="tab2" label="Tags on the Move and a long title">
                        Tags on the MOve
                    </Item>
                </TabMenu>

                <TabMenu className="LiveTabMenu" contentStyle={{height: 'calc(20vh - 50px)', position: 'relative'}}>
                    <Item key="tab1" label="Tag Details">
                    </Item>
                    <Item key="tab2" label="Tags on the Move">
                        Tags on the MOve
                    </Item>
                </TabMenu>

            </div>
        )

        /*

<div>
                Count: {this.state.count}
                <CheckBox checked="checked" value="checkall"></CheckBox>
                </div>
                <TabularListing
                    height="300"
                    data={dataObj}
                    onHeaderClick={this.sortByColumn}
                    rowSelector={true}
                    rowSelectorKey="epc_id"
                    onRowSelection={this.RowSelection}
                />

{JSON.stringify(this.state.rows)}
        <Fieldset title="Containing Two Items">
                <DropDown
                    placeholder="Please select an option here"
                    showEmpty={true}
                    width="50%"
                >
                    <Item value={null} key="option0">--- select one ---</Item>
                    <Item value="1" key="option1">Select Option 1</Item>
                    <Item value="2" key="option2">Select Option 2</Item>
                    <Item value="3" key="option3">Select Option 3</Item>
                    <Item value="13" key="option13">Super long input for this select Option 4</Item>
                </DropDown>
                <TextBox
                    placeholder="First Name"
                    width="50%"
                />
                </Fieldset>
                <TextBox
                    placeholder="Last Name"
                    width="200px"
                    error="Absolutely horrible."
                />

                <RaisedButton key="action1" onClick={() => { this.toggleDialog(true); }}>Launch Dialog</RaisedButton><br/>
                <TextArea
                    placeholder="Send a Note"
                    width="600px"
                />
                <Fieldset title="This is a slider" style={{position: 'relative'}}>
                    <Slider/>
                </Fieldset>
                <Fieldset title="This is a RangeSlider" style={{position: 'relative'}}>
                    <RangeSlider/>
                </Fieldset>

<TabularListing
                    height="750"
                    data={this.state.data}
                    columnSelector={true}
                />
         {window.innerWidth > 600 ?
         <TabularListing
         height={this.state.height}
         data={this.state.data}
         onHeaderClick={this._sortByColumn}
         onRowClick={this._loadDrawer}
         onValueClick={this._executeInlineSearch}
         triggerLazyLoad={this._loadMoreRecords}
         showMoreLoading={true}
         showLazyLoading={false}
         listSummaryText={summaryText}
         /> :
         <TabularDetail
         style={{paddingLeft: '50px'}}
         height={this.state.height}
         data={this.state.data}
         onHeaderClick={this._sortByColumn}
         onRowClick={this._loadDrawer}
         onValueClick={this._executeInlineSearch}
         triggerLazyLoad={this._loadMoreRecords}
         showMoreLoading={true}
         showLazyLoading={false}
         listSummaryText={summaryText}
         />
         }

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
    <BrowserRouter history={ browserHistory }>
        <div>
            <Route exact path="/" component={Sandbox} />
        </div>
    </BrowserRouter>
),  document.getElementById('app'));
