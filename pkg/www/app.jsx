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
import {ProgressSpinner} from '../src/Elements/ProgressSpinner'


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
        this._updateViewFilter = this._updateViewFilter.bind(this);
        this.showdate = this.showdate.bind(this);

        this.state = {
            trailerType: '28DF',
            viewFilter: 'only-open'
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
                ],
                showing: false,
                viewFilter: '',
                //selected: 'notes',
                tabstyle: {width: '100%'}
            });
        },2000);
    }


    _updateViewFilter(e,v) {
        this.setState({
            viewFilter: v
        });
    }

    showdate() {
        console.log(this.refs.dater.getValue());
    }

    render() {

        var trailerTypeOptions = [];
        var trailerTypes = ["28DF", "28SR", "45VAN", "48VAN", "53VAN", "33SR", "33DF"];
        trailerTypeOptions.push(<Item value="" key="defaulttype">All Trailer Types</Item>);
        if(trailerTypes) {
            trailerTypes.map((val, key) => {
                trailerTypeOptions.push(<Item value={val} defaultChecked={this.state.trailerType === val} key={key}>{val}</Item>);
            });
        }
        console.log(this.state.viewFilter);
        return (
            <div>

<div style={{color: 'white'}}>



                <DateTimePicker
                    ref="dater"
                    placeholder={["Date","Time"]}
                    manual={true}
                />
    <FlatButton onClick={this.showdate}>DATE????</FlatButton>
                </div>
                {this.state.showing ?
                <ProgressSpinner /> : null }

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
 <Tooltip iconid="info" width="400px" show={true}>This option will email a PDF file that contains all the images in this drawer for this load period.</Tooltip>

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
