import React from 'react';
import { render } from 'react-dom';

import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'
import { Stripes } from '../src/Core/Stripes'

import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../src/Table'
import {TabularListing} from '../src/Elements/TabularListing'
import { Title, H1, H3 } from '../src/Typography'

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
        this.state = {
            data: this._setTableState.bind(this),
            columnMap: [
                { name: 'Column1',  width: '10%'},
                { name: 'Column2',  width: '10%'},
                { name: 'Column3',  width: '20%'},
                { name: 'Column4',  width: '30%'},
                { name: 'Column5',  width: '15%'},
                { name: 'Column6',  width: '20%'}
            ]
        };
        this._swapSize = this._swapSize.bind(this);
        this._setTableState = this._setTableState.bind(this);
    }

    _swapSize() {
        this.setState({
            columnMap: [
                { name: 'Column1',  width: '20%'},
                { name: 'Column2',  width: '20%'},
                { name: 'Column3',  width: '10%'},
                { name: 'Column4',  width: '10%'},
                { name: 'Column5',  width: '20%'},
                { name: 'Column6',  width: '20%'}
            ]
        }, this.forceUpdate);
    };

    componentDidMount() {

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

    render() {

        var dataObj = this._setTableState();
        return (
            <TabularListing
                data={dataObj}
                onRowClick={() => {}}
                onValueClick={() => {}}
                headerClick={() => {}}
                sortable={() => {}}
            />
        )
        /*
        var tableCells = [];
        for(var i = 0; i < 30; i++) {
            tableCells.push(
                <TableRow key={"row"+i}>
                    <TableCell>onload</TableCell>
                    <TableCell>LOADPAGE</TableCell>
                    <TableCell>Initial Page Load</TableCell>
                    <TableCell>fspmemptla01.ground.fedex.com</TableCell>
                    <TableCell>564345645656</TableCell>
                    <TableCell>23.23.23.23</TableCell>
                </TableRow>
            );
        }

        return (
            <div>
                <Title>SANDBOX</Title>
                <div onClick={this._swapSize}>SWAP!</div>
                <Table>
                    <TableHeader>
                        <TableHeaderRow>
                            <TableHeaderCell isSortable={true}>Type</TableHeaderCell>
                            <TableHeaderCell isSortable={true}>Category</TableHeaderCell>
                            <TableHeaderCell isSortable={true}>Description</TableHeaderCell>
                            <TableHeaderCell isSortable={true}>Site</TableHeaderCell>
                            <TableHeaderCell isSortable={true}>Time</TableHeaderCell>
                            <TableHeaderCell isSortable={true}>IP Address</TableHeaderCell>
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody height="300px" zebraStripes={true}>
                        {tableCells}
                    </TableBody>
                </Table>
            </div>
        )
        */


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
