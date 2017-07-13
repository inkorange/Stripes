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
import {TabularDetail} from '../src/Elements/TabularDetail'
import { A, Title, H1, H2, H3 } from '../src/Typography'
import { FlatButton, RaisedButton, RadioButtonGroup, CheckBoxGroup, CheckBox, Item, Fieldset, TextBox, TextArea, DropDown, DatePicker, TimePicker, DateTimePicker, Slider, RangeSlider } from '../src/Forms'
import { Dialog, Card, LeftNav, MenuItem, TwoColumnLayout } from '../src/Layouts'
import {Icon} from  '../src/Symbols/Icon'
import {Tooltip} from  '../src/Notifications/Tooltip'
import {Tag, ShowHide, TabMenu, IconMenu} from '../src/Layouts'
import {Alert} from '../src/Notifications/Alert'
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

const formatBydateTimeStacked = function(val, onClick) {
    return val;
};


const weightFormatter = function(data) {
    var objDOM = [];
    if(data !== null) {
        objDOM.push(<span key="weightspan">{data}</span>);
        objDOM.push(<em key="weightem">lbs.</em>);
    }
    return objDOM.length ? objDOM : null;
};

const scanrateFormatter = function(data) {
    var objDOM = [];
    if (data) {
        objDOM.push(<span>{data}</span>);
        if (data !== "" && data !== "--") {
            objDOM.push(<em>/hr</em>);
        }
    }
    return objDOM.length ? objDOM : null;
};

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
        var dataObj = {
            structure: [
                {
                    width: '100px',
                    tooltip: 'Indicates if this load has alerts or notes',
                    name: '<span>Alerts</span><em>& Notes</em>',
                    icon: 'alert',
                    field: ['alerts','alert_count', 'bookmarks'],
                    exports: [null, 'Alert Count', 'Bookmarks'],
                    filterable: false,
                    sortable: true,
                    sorted: true,
                    className: 'column-notes',
                    formatFn: annotationAlertFn
                },
                {
                    tooltip: 'Trailer number and trailer type',
                    name: 'Trailer<em>Type</em>',
                    field: ['number', 'trailer_type'],
                    sortable: true,
                    filterable: true,
                    className: 'column-trailer',
                },
                {
                    tooltip: 'Door number',
                    name: 'Door',
                    field: ['code'],
                    sortable: true,
                    filterable: true
                },
                {
                    tooltip: 'Trailer destination',
                    name: 'Dest',
                    field: ['destination'],
                    sortable: true,
                    filterable: true
                },
                {
                    tooltip: 'Trailer opened date/time',
                    name: 'Opened',
                    field: ['opened_at'],
                    sortable: true,
                    filterable: false,
                    className: 'column-opened',
                    formatFn: formatBydateTimeStacked
                },
                {
                    tooltip: 'Trailer closed date/time',
                    name: 'Closed',
                    field: ['closed_at'],
                    sortable: true,
                    filterable: false,
                    className: 'column-closed',
                    formatFn: formatBydateTimeStacked
                },
                {
                    tooltip: 'Total package count',
                    name: 'Pkgs',
                    field: ['metrics.total_packages'],
                    sortable: true,
                    filterable: false,
                    className: 'column-packages'
                },
                {
                    tooltip: 'RTCube score and TMS cube score',
                    name: 'RT Cube<em>TMS Cube</em>',
                    className: 'column-rtcube',
                    icon: 'rtcube',
                    field: ['metrics.rtcube', 'metrics.tms_cube'],
                    featured: true,
                    sortable: true,
                    filterable: false
                },
                {
                    tooltip: 'Trailer fullness TLA and TMS',
                    name: 'Full<em>TMS Full</em>',
                    className: 'column-full',
                    icon: 'fullness',
                    field: ['metrics.full', 'metrics.tms_full'],
                    featured: true,
                    sortable: true,
                    filterable: false
                },
                {
                    tooltip: 'Trailer weight',
                    name: 'Weight',
                    className: 'column-weight',
                    icon: 'weight',
                    field: ['metrics.trailer_weight'],
                    featured: true,
                    sortable: true,
                    filterable: false,
                    formatFn: weightFormatter
                }
            ],
            rows: [
                {"id":2535,"number":550530,"sequence_number":50133977,"opened_at":1380143749000,"closed_at":1380177697000,"code":"B212","tmu_id":64,"destination":"PORT","src":"/assets/blank.jpg","image_age":null,"bookmarks":1,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"53VAN","metrics":{"full":94,"rtcube":64,"tms_cube":78,"tms_full":99,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2716,"number":824873,"sequence_number":50139881,"opened_at":1380168867000,"closed_at":1380182801000,"code":"A201","tmu_id":18,"destination":"COLO","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":94,"rtcube":39,"tms_cube":26,"tms_full":24,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2802,"number":550530,"sequence_number":50140803,"opened_at":1380176301000,"closed_at":1380177672000,"code":"B212","tmu_id":64,"destination":"CHIC","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"53VAN","metrics":{"full":94,"rtcube":0,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2870,"number":818743,"sequence_number":50145224,"opened_at":1380207225000,"closed_at":1380241701000,"code":"A110","tmu_id":8,"destination":"DALL","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":94,"rtcube":81,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":3022,"number":811511,"sequence_number":50156398,"opened_at":1380233679000,"closed_at":1380248183000,"code":"C228","tmu_id":94,"destination":"BILL","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":94,"rtcube":72,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":3109,"number":820775,"sequence_number":50159842,"opened_at":1380238710000,"closed_at":1380265036000,"code":"B126","tmu_id":24,"destination":"CHAR","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":94,"rtcube":74,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":3168,"number":822511,"sequence_number":50161488,"opened_at":1380255746000,"closed_at":1380263710000,"code":"C217","tmu_id":83,"destination":"STPL","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":94,"rtcube":95,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2502,"number":813950,"sequence_number":50131135,"opened_at":1380136872000,"closed_at":1380149352000,"code":"B204","tmu_id":56,"destination":"OSHK","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":78,"tms_cube":73,"tms_full":99,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2518,"number":814206,"sequence_number":50132056,"opened_at":1380136883000,"closed_at":1380165459000,"code":"C220","tmu_id":86,"destination":"CRLS","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":70,"tms_cube":67,"tms_full":99,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2532,"number":805532,"sequence_number":50133774,"opened_at":1380144481000,"closed_at":1380158581000,"code":"C225","tmu_id":91,"destination":"STPL","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":111,"tms_cube":65,"tms_full":99,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2652,"number":820969,"sequence_number":50138124,"opened_at":1380160277000,"closed_at":1380163107000,"code":"A125","tmu_id":35,"destination":"WOOD","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":81,"tms_cube":6,"tms_full":14,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2670,"number":818593,"sequence_number":50138543,"opened_at":1380161289000,"closed_at":1380166236000,"code":"A201","tmu_id":18,"destination":"HRBG","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":"--","tms_cube":16,"tms_full":49,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2702,"number":809749,"sequence_number":50139749,"opened_at":1380168868000,"closed_at":1380218363000,"code":"B205","tmu_id":57,"destination":"OSHK","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":95,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2747,"number":825148,"sequence_number":50140109,"opened_at":1380168867000,"closed_at":1380226513000,"code":"A221","tmu_id":45,"destination":"QMIL","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":72,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2782,"number":56771,"sequence_number":50140603,"opened_at":1380174729000,"closed_at":1380182599000,"code":"A224","tmu_id":48,"destination":"RLTO","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":2,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2824,"number":809126,"sequence_number":50140185,"opened_at":1380168868000,"closed_at":1380217643000,"code":"C216","tmu_id":82,"destination":"SCHG","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":75,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2832,"number":821871,"sequence_number":50145037,"opened_at":1380207225000,"closed_at":1380227477000,"code":"B206","tmu_id":58,"destination":"OSHK","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":72,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2855,"number":805717,"sequence_number":50145188,"opened_at":1380207225000,"closed_at":1380228025000,"code":"A106","tmu_id":4,"destination":"MDSN","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":79,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2861,"number":816562,"sequence_number":50145123,"opened_at":1380207225000,"closed_at":1380219975000,"code":"B211","tmu_id":63,"destination":"CEDA","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":74,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2890,"number":822556,"sequence_number":50145261,"opened_at":1380207225000,"closed_at":1380252918000,"code":"C111","tmu_id":77,"destination":"NOKY","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":72,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2912,"number":550402,"sequence_number":50146351,"opened_at":1380207225000,"closed_at":1380251308000,"code":"B127","tmu_id":25,"destination":"CHAR","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"53VAN","metrics":{"full":93,"rtcube":34,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2927,"number":822705,"sequence_number":50146640,"opened_at":1380207225000,"closed_at":1380246129000,"code":"A123","tmu_id":16,"destination":"WOOD","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":73,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2936,"number":550396,"sequence_number":50152419,"opened_at":1380223367000,"closed_at":1380268209000,"code":"B213","tmu_id":65,"destination":"PORT","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"53VAN","metrics":{"full":93,"rtcube":80,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":2949,"number":52676,"sequence_number":50152843,"opened_at":1380223367000,"closed_at":1380241701000,"code":"A107","tmu_id":5,"destination":"MDSN","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":82,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}},{"id":3116,"number":825776,"sequence_number":50159901,"opened_at":1380247839000,"closed_at":1380269110000,"code":"B203","tmu_id":55,"destination":"MARI","src":"/assets/blank.jpg","image_age":null,"bookmarks":0,"alert_count":0,"alerts":[],"sorting":false,"trailer_type":"28DF","metrics":{"full":93,"rtcube":72,"tms_cube":0,"tms_full":0,"current_trailer":"???","trailer_weight":0,"scan_rate":"--","total_packages":"--"}}],
            collection: {"total":889,"returned":25,"start":1,"end":25,"timestamp":1495213909000},
            sort_by:"alerts",
            sort_direction:"desc"
        };

        this.onRemove = this.onRemove.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);

        this.state = {
            data: dataObj,
            showTooltip: false
        };
    }

    componentDidMount() {
        //this.resolveHeight();
        //window.addEventListener('resize', this.resolveHeight, true);
    }
    componentWillUpdate(props) {
    }


    onRemove(e,b) {
        console.log(e,b);
        this.refs.tag1.close();
    }

    toggleTooltip() {
        this.setState({
            showTooltip: !this.state.showTooltip
        });
    }

    render() {
        var trailerTypeOptions = [];
        var trailerTypes = ["28DF", "28SR", "45VAN", "48VAN", "53VAN", "33SR", "33DF"];
        trailerTypeOptions.push(<Item value="" data-automation-id="Trailer Option - All" key="defaulttype">All Trailer Types</Item>);
        if(trailerTypes) {
            trailerTypes.map((val, key) => {
                trailerTypeOptions.push(<Item data-automation-id={"Trailer Option - " + val} value={val} defaultChecked={this.state.trailerType === val} key={key}>{val}</Item>);
            });
        }

        var radioobj = [{"label":"No Filter","value":""},{"label":"Only Alerts","value":"alerts"},{"label":"Open Trailers","value":"only-open"},{"label":"Top 10 Worst RT Cube","value":"rt-cubes-score"},{"label":"Top 10 Trailer Weight","value":"trailer-weight"}];
        var filterItems = [];
        radioobj.map((v) => {
            filterItems.push(
                <Item data-event-click="FILTER"
                      data-event-desc={"Submit doors "+v.label}
                      data-automation-id={"Submit Filter By " + v.label}
                      key={"item"-v.value}
                      value={v.value}
                      defaultChecked={this.state.viewFilter === v.value} >
                    {v.label}
                </Item>
            );
        });

        return (

            <div style={{margin: '50px', textAlign: 'right', background: 'gray'}}>
            <TextBox
                width="50%"
                maxLength={10}
            />
            <br/><br/>

                <Tag key="tag1" ref="tag1" value="Option 1" onClick={() => {console.log('CLICK');}} onRemove={() => {console.log('REMOVE');}}>Big Test Here</Tag>
                <Tag key="tag2" value="Option 2" onRemove={this.onRemove}>f gfdgdfg  gf 2</Tag>
                <Tag key="tag3">Option 3</Tag>
                <Tag key="tag4" disabled={true}>Option 4</Tag>
                <Tag key="tag5" disabled={true} ref="tag1" value="Option 5" onRemove={this.onRemove}>Op dffdgfdgfgdtion 1</Tag>
                <Tag key="tag6" value="Option 2" onRemove={this.onRemove}>Option 2</Tag>
                <Tag key="tag7" disabled={true} ref="tag1" value="Option 7" onRemove={this.onRemove}>Optfdgfsadaa af d dsf ion 1</Tag>
                <Tag key="tag8" value="Option 2" onRemove={this.onRemove}>Option 2</Tag>

                <div style={{display: 'inline', position: 'relative', height: '52px', marginRight: '5px'}}>
                    <Icon ref="save_icon"
                        onClick={this.toggleTooltip}  key="saved_icon"  iconid="menu" color="red" size="2.2rem"
                    />
                    <Tooltip ref="tooltip"
                             className="HELLO"
                         width="400px"
                             duration="0"
                             style={{paddingBottom: this.state.showTooltip ? '10px' : '0'}}
                         show={this.state.showTooltip}>
                        <Tag key="tag1" ref="tag1" value="Option 1" onRemove={this.onRemove}>Opdsftion 1</Tag>
                        <Tag key="tag2" value="Option 2" onRemove={this.onRemove}>f gfdgdfg  gf 2</Tag>
                        <Tag key="tag1" ref="tag1" value="Option 1" onClick={() => {console.log('CLICK');}} onRemove={() => {console.log('REMOVE');}}>Big Test Here</Tag>
                        <Tag key="tag2" value="Option 2" onRemove={this.onRemove}>f gfdgdfg  gf 2</Tag>
                        <Tag key="tag3">Option 3</Tag>
                        <Tag key="tag4" disabled={true}>Option 4</Tag>
                        <Tag key="tag5" disabled={true} ref="tag1" value="Option 5" onRemove={this.onRemove}>Op dffdgfdgfgdtion 1</Tag>
                        <Tag key="tag6" value="Option 2" onRemove={this.onRemove}>Option 2</Tag>
                        <Tag key="tag7" disabled={true} ref="tag1" value="Option 7" onRemove={this.onRemove}>Optfdgfsadaa af d dsf ion 1</Tag>
                        <Tag key="tag8" value="Option 2" onRemove={this.onRemove}>Option 2</Tag>
                    </Tooltip>
                </div>

            </div>

        )

        /*

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

    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <IndexRoute component={Sandbox} />
        </Route>
    </Router>

),  document.getElementById('app'));
