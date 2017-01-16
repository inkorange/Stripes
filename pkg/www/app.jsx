import React from 'react';
import { render } from 'react-dom';

import Link from 'react-router/lib/Link'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import browserHistory from 'react-router/lib/browserHistory'
import { Stripes } from '../src/Core/Stripes'

import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../src/Table'
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

    render() {

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
                            <TableHeaderCell>Type</TableHeaderCell>
                            <TableHeaderCell>Category</TableHeaderCell>
                            <TableHeaderCell>Description</TableHeaderCell>
                            <TableHeaderCell>Site</TableHeaderCell>
                            <TableHeaderCell>Time</TableHeaderCell>
                            <TableHeaderCell>IP Address</TableHeaderCell>
                        </TableHeaderRow>
                    </TableHeader>
                    <TableBody zebraStripes={true}>
                        {tableCells}
                    </TableBody>
                </Table>
            </div>
        )
    }
};

// theme
const theme = require('./themes/Theme');

Stripes({
    palette: theme.palette,
    spacing: theme.spacing
});

render((

    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <IndexRoute component={Sandbox} />
        </Route>
    </Router>

),  document.getElementById('app'));
