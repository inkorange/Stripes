"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from 'zebra-stripes/Table'

export class TableElement extends React.Component {

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
                title="Table"
                location="import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from 'zebra-stripes/Table';"
                propsMap={[
                        {name: 'columnMap', type: 'Object',  desc: 'Column definition object that describes how the columns should be structured within the table.' , default: 'null'},
                        {name: 'height',    type: 'string',  desc: 'Sets the table height, a string in css value format.' , default: 'null'},
                        {name: 'width',     type: 'string',  desc: 'Sets the table width, a string in css value format.', default: '100%'},
                    ]}
                colOneWidth="50%"
                colTwoWidth="50%"
                samples={[
                        {
                            desc: 'Default Table Usage',
                            code:
                                'import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from \'zebra-stripes/Table\'\n' +
                                '\n' +
                                'var tableCells = [];\n' +
                                'for(var i =0; i < 10; i++) {\n' +
                                '    tableCells.push(\n' +
                                '        <TableRow key={"row"+i}>\n' +
                                '            <TableCell>A{i}</TableCell>\n' +
                                '            <TableCell>B{i}</TableCell>\n' +
                                '        </TableRow>\n' +
                                '    );\n' +
                                '};\n' +
                                '<Table>\n' +
                                '    <TableHeader>\n' +
                                '        <TableHeaderRow>\n' +
                                '            <TableHeaderCell>Head 1</TableHeaderCell>\n' +
                                '            <TableHeaderCell>Head 2</TableHeaderCell>\n' +
                                '        </TableHeaderRow>\n' +
                                '        </TableHeader>\n' +
                                '        <TableBody>\n' +
                                '            {tableCells}\n' +
                                '        </TableBody>\n' +
                                '</Table>',
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
                        },
                        {
                            desc: 'Table with a Fixed Height',
                            code:
                                'import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from \'zebra-stripes/Table\'\n' +
                                '\n' +
                                'var tableCells = [];\n' +
                                'for(var i =0; i < 10; i++) {\n' +
                                '    tableCells.push(\n' +
                                '        <TableRow key={"row"+i}>\n' +
                                '            <TableCell>A{i}</TableCell>\n' +
                                '            <TableCell>B{i}</TableCell>\n' +
                                '        </TableRow>\n' +
                                '    );\n' +
                                '};\n' +
                                '<Table>\n' +
                                '    <TableHeader>\n' +
                                '        <TableHeaderRow>\n' +
                                '            <TableHeaderCell>Head 1</TableHeaderCell>\n' +
                                '            <TableHeaderCell>Head 2</TableHeaderCell>\n' +
                                '        </TableHeaderRow>\n' +
                                '        </TableHeader>\n' +
                                '        <TableBody height="200px" zebraStripes={true}>\n' +
                                '            {tableCells}\n' +
                                '        </TableBody>\n' +
                                '</Table>',
                            example: (
                                 <Table>
                                    <TableHeader>
                                        <TableHeaderRow>
                                            <TableHeaderCell isSortable={true}>Head 1</TableHeaderCell>
                                            <TableHeaderCell isSortable={true}>Head 2</TableHeaderCell>
                                        </TableHeaderRow>
                                    </TableHeader>
                                    <TableBody height="200px" zebraStripes={true}>
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
