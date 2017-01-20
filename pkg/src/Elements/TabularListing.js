"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../Table'

export class TabularListing extends StripesTheme {

    static defaultProps = {
        type: 'default',
        data: null,
        onRowClick: () => { return false;},
        onValueClick: () => { return false;},
        headerClick: () => { return false;},
        sortable: false,
        bodyHeight: null,
        zebraStripes: true
    }

    shouldComponentUpdate(props) {
        return props.data ? true : false;
    }
    constructor(props) {
        super(props);
    }

    render() {
        var tableCells = [];
        this.props.data.rows.map((r, i) => {
            var cells = [];
            this.props.data.structure.map((c, i) => {
                cells.push(
                    <TableCell key={"headcell"+i} width={c.width}>{r[c.field]}</TableCell>
                );
            });
            tableCells.push(
                <TableRow onClick={this.props.onRowClick} key={"row"+i}>
                    {cells}
                </TableRow>
            );
        });

        var tableHeaders = [];
        this.props.data.structure.map((c, i) => {
            tableHeaders.push(
                <TableHeaderCell
                    isSortable={c.sortable ? c.sortable : false}
                    width={c.width ? c.width : null}
                    onClick={this.props.headerClick}
                    key={"headercell" + i}
                >
                    {c.name}
                </TableHeaderCell>
            )
        });

        return (
            <Table>
                <TableHeader>
                    <TableHeaderRow>
                        {tableHeaders}
                    </TableHeaderRow>
                </TableHeader>
                <TableBody height={this.props.bodyHeight} zebraStripes={this.props.zebraStripes}>
                    {tableCells}
                </TableBody>
            </Table>
        )
    }
}