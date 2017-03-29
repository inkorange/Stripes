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
import { Card, LeftNav, MenuItem } from '../src/Layouts'
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
        this.toggle = this.toggle.bind(this);

        this.state = {
            loadareas: [],
            leftnavopen: false,
            selected_load_area: 10,
            checked: false,
            date: null //"Wed Feb 08 2017 05:22:00 GMT-0500 (EST)"
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loadareas: [
                    {payload: "all", text: 'all areas'},
                    {payload: 11, text: 'Load area 1'},
                    {payload: 10, text: 'Load area 2'},
                    {payload: 9, defaultChecked:true, text: 'Load Area 3'},
                    {payload: 13, text: 'Load Area 4'},
                    {payload: 15, text: 'load Area 5'}
                ]
            })
        },2000)
    }

    changeIt(e,v) {
        console.log(v);
    }

    navigateto() {
        console.log('navigate!!!');
    }

    toggle() {
        this.refs.leftNav.toggleMenu(!this.refs.leftNav.isOpen());
        /*
        this.setState({
            leftnavopen: !this.refs.leftNav.isOpen()
        });
        */
    }

    triggerIt(val,selectedArea) {
        console.log(val,selectedArea);
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

        var loadAreaOptions = [];
        this.state.loadareas.map((option,key) => {
            //console.log(option.payload, this.state.selected_load_area);
            var selectedID = this.state.selected_load_area === "all" ? "all" : this.state.selected_load_area*1;
            var isArea = option.payload === selectedID;
            loadAreaOptions.push(<Item value={option.payload} defaultChecked={isArea} key={key}>{option.text}</Item>);
        });

        let navItems = [
            <DropDown
                placeholder="Please select an option..."
                showEmpty={true}
                width="250px"
                onChange={this.triggerIt}
            >
                {loadAreaOptions}
            </DropDown>,
            <MenuItem key="menu1" title="Doors Dashboard"
                      onClick={this.navigateto}
                      icon="view_by_2"
            />,
            <MenuItem key="menu2" title="Active Doors"
                      onClick={this.navigateto}
                      icon="loading"
            />,
            <MenuItem key="menu3" title="Load History"
                      onClick={this.navigateto}
                      icon="list"
            />,
            <MenuItem key="menu4" title="Notes"
                      onClick={this.navigateto}
                      icon="note"
            />,
            <MenuItem key="menu5" title="Help"
                      onClick={this.navigateto}
                      icon="help"
            />
        ];


        return (
            <div style={{backgroundColor: 'red', height: '400px'}}>

                <Tooltip iconid="info" width="400px" show={true}>This option will email a PDF file that contains all the images in this drawer for this load period.</Tooltip>

                <NavBar ref="NavBar"
                        leftIcon={
                        <LeftNav
                            ref="leftNav"
                            className="LeftNav"
                            docked={false}
                            open={this.state.leftnavopen}
                            modal={true}
                            color="white"
                            iconid="menu"
                            iconstyle={{height: '25px', marginTop: '18px', lineHeight: 0}}
                            data-event-click="LEFT_NAV"
                            data-event-desc={(this.state.leftnavopen ? "Closed" : "Opened") + " left nav"}
                        >
                            {navItems}
                        </LeftNav>
                        }
                        title="TITLE"
                        fixed={true}
                >
                    BAR
                </NavBar>
                <TabMenu>
                    <Item key="tab1" label="Apples"/>
                    <Item key="tab2" label="Bananas"/>
                    <Item key="tab3" label="Oranges"/>
                    <Item key="tab4" label="Lemons"/>
                </TabMenu>
<div style={{marginLeft: '200px', padding: '50px', background: 'gray'}}>
    <DropDown
        placeholder="Please select an option..."
        showEmpty={true}
        width="250px"
        onChange={this.triggerIt}
    >
        {loadAreaOptions}
    </DropDown>
</div>

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
