"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {TabularListing} from 'zebra-stripes/Elements/TabularListing'

export class TabularListingElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var tableCells = [];
        for(var i =0; i < 8; i++) {
            tableCells.push(
                <TableRow key={"row"+i}>
                    <TableCell>A{i}</TableCell>
                    <TableCell>B{i}</TableCell>
                </TableRow>
            );
        };

        return (
            <ComponentDocumentation
                title="TabularListing"
                location="import {TabularListing} from 'zebra-stripes/Elements/TabularListing';"
                propsMap={[
                    {name: 'data',              type: 'Object',     desc: 'A complex data object that contains the table\'s structure, data, and pagination information.', default: 'null'},
                    {name: 'fullHeight',        type: 'boolean',    desc: 'Sets the table height, a string in css value format.' , default: 'true'},
                    {name: 'height',            type: 'string',     desc: 'Sets the table width, a string in css value format.', default: 'null'},
                    {name: 'bodyHeight',        type: 'string',     desc: 'Sets the table width, a string in css value format.', default: 'null'},
                    {name: 'onRowClick',        type: 'function',   desc: 'Sets the table width, a string in css value format.', default: '() => { return false;}'},
                    {name: 'onValueClick',      type: 'function',   desc: 'Sets the table width, a string in css value format.', default: '() => { return false;}'},
                    {name: 'onHeaderClick',     type: 'function',   desc: 'Sets the table width, a string in css value format.', default: '() => { return false;}'},
                    {name: 'zebraStripes',      type: 'boolean',    desc: 'Sets the table width, a string in css value format.', default: 'true'},
                    {name: 'sortable',          type: 'boolean',    desc: 'Sets the table width, a string in css value format.', default: 'true'},
                    {name: 'triggerLazyLoad',   type: 'function',   desc: 'Sets the table width, a string in css value format.', default: '() => { return false;}'},
                    {name: 'showMoreLoading',   type: 'boolean',    desc: 'Sets the table width, a string in css value format.', default: 'false'},
                    {name: 'showLazyLoading',   type: 'boolean',    desc: 'Sets the table width, a string in css value format.', default: 'false'},
                ]}
                colOneWidth="50%"
                colTwoWidth="50%"
                samples={[
                        {
                            desc: 'Default Table Usage',
                            code:
                                'import {TabularListing} from \'zebra-stripes/Elements/TabularListing\'\n' +
                                '\n' +
                                'var dataObj = {\n' +
                                                '   structure: [\n' +
                                                '       {\n' +
                                                '           width: '150px',\n' +
                                                '           name: 'Make',\n' +
                                                '           icon: 'alert',\n' +
                                                '           field: ['make'],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: false,\n' +
                                                '           className: 'column-notes'\n' +
                                                '       },\n' +
                                                '       {\n' +
                                                '           name: 'Model',\n' +
                                                '           field: ['model'],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: true\n' +
                                                '       },\n' +
                                                '       {\n' +
                                                '           name: 'Year',\n' +
                                                '           field: ['year'],\n' +
                                                '           filterable: false,\n' +
                                                '           sortable: true\n' +
                                                '       }\n' +
                                                '   ],\n' +
                                                '  rows: [\n' +
                                                '       {make: 'Ford', model: 'Focus', year: '2005'},\n' +
                                                '       {make: 'Ford', model: 'Bronco', year: '2001'},\n' +
                                                '       {make: 'Acura', model: 'TSX', year: '2012'},\n' +
                                                '       {make: 'Acura', model: 'TLX', year: '2016'},\n' +
                                                '       {make: 'Toyota', model: 'Camery', year: '2015'},\n' +
                                                '       {make: 'Toyota', model: 'Corolla', year: '2017'},\n' +
                                                '       {make: 'Toyota', model: 'Avalon', year: '2010'},\n' +
                                                '       {make: 'Nissan', model: 'Altima', year: '2008'},\n' +
                                                '       {make: 'Honda', model: 'CRV', year: '2015'},\n' +
                                                '       {make: 'Honda', model: 'Accord', year: '2014'}\n' +
                                                '   ],\n' +
                                                '   collection: {\n' +
                                                '       end: 10,\n' +
                                                '       returned: 10,\n' +
                                                '       start: 1,\n' +
                                                '       timestamp: 1484924493000,\n' +
                                                '       total: 10\n' +
                                                '   },\n' +
                                                '   sort_by: 'model',\n' +
                                                '   sort_direction: 'desc'\n' +
                                                '};\n\n' +
                                                '<TabularListing\n' +
                                                '    bodyHeight='250px'\n' +
                                                '    data={dataObj}\n' +
                                                '    onRowClick={() => {}}\n' +
                                                '    onValueClick={() => {}}\n' +
                                                '    onHeaderClick={() => {}}\n' +
                                                '    sortable={() => {}}\n' +
                                                '/>\n',
                            example: (
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
                            )
                        }
                    ]}
                    description={[
                        <p key="p1">Table components can take a collection of TableHeaderRow, with TableHeaderCells along with an array of TableRows with TableCell components within.</p>
                    ]}
            />
        )
    }
}
