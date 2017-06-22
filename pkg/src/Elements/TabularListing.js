"use strict"

import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'
import { FlatButton } from  '../Forms/Buttons'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../Table'

export class TabularListing extends StripesTheme {

    static defaultProps = {
        type: 'default',
        data: null,
        height: null,
        bodyHeight: null,
        onRowClick: () => { return false;},
        onValueClick: () => { return false;},
        onHeaderClick: () => { return false;},
        zebraStripes: true,
        sortable: true,
        triggerLazyLoad: () => { return false; },
        showMoreLoading: false,
        showLazyLoading: false
    }

    shouldComponentUpdate(props) {
        return props.data ? true : false;
    }

    componentDidMount() {
        this.resolveHeight();
    }

    componentDidUpdate(props) {
        if(props.height !== this.props.height) {
            this.resolveHeight();
        }

    }

    constructor(props) {
        super(props);
        this.clickValue = this.clickValue.bind(this);
        this.resolveHeight = this.resolveHeight.bind(this);
        this.state = {
            colors: this.getColors()[this.props.type],
            bodyHeight: this.props.bodyHeight
        }
    }

    resolveHeight() {
        if(this.props.height) {
            var parentHeight = this.props.height ? this.props.height : ReactDOM.findDOMNode(this.refs.TabularListing).parentElement.clientHeight;
            var tableHeaderHeight = ReactDOM.findDOMNode(this.refs.TableHeader).clientHeight;
            var bodyHeight = parentHeight - tableHeaderHeight;
            this.setState({
                bodyHeight: bodyHeight
            });
        }
    }

    clickValue(e) {
        if(this.props.onValueClick) {
            e.preventDefault();
            e.stopPropagation();
            var filterValue = e.currentTarget.getAttribute('data-value');
            this.props.onValueClick(filterValue);
            return false;
        }
    }

    render() {
        var sort_by = this.props.data.sort_by;
        var tableCells = [];
        this.props.data.rows.map((r, i) => {
            var cells = [];
            this.props.data.structure.map((header, key) => {
                var itemDOM = [];
                header.field.map((field, index) => {
                    var dimObj = this.dimensionalObjectResolution(r, field);
                    var value = header.formatFn ? header.formatFn(dimObj, field) : dimObj;
                    if(index === 0 && value) {
                        itemDOM.push(
                            <span key={"prim" + key + "" + index} onClick={header.filterable ? this.clickValue : false} data-filterable={header.filterable} data-value={dimObj}>{value}</span>
                        );
                    } else if(value) {
                        itemDOM.push(
                            <em key={"sec" + key + "" + index} onClick={header.filterable ? this.clickValue : false} data-filterable={header.filterable} data-value={dimObj} >{value}</em>
                        );
                    }
                });
                cells.push(
                    <TableCell
                        className={header.className}
                        key={"headcell"+key}
                        width={header.width}
                        data-filterable={header.filterable}
                        wrap={header.wrap ? true: false}>
                            {itemDOM}
                    </TableCell>
                );
            });
            tableCells.push(
                <TableRow onClick={(e) => { this.props.onRowClick(e, r); }} key={"row"+i}>
                    {cells}
                </TableRow>
            );
        });

        var showMoreStyle = {
            textAlign: 'center',
            backgroundColor: this.state.colors.inactiveIcon,
            boxShadow: '0 2px 0 rgb(150,150,150) inset'
        };

        if(tableCells && (this.props.showMoreLoading || this.props.listSummaryText)) {
            tableCells.push(
                <tr key="lazy_loading_line"
                    style={showMoreStyle}
                    data-event-click="LOAD_MORE"
                    data-event-desc={"Loading " + this.props.showMoreLoading + " Records"}
                    data-event-active={this.props.showMoreLoading}
                    data-automation-id="Load More Records"
                    onClick={this.props.triggerLazyLoad} className={"lazy_loading_empty " + (this.props.showLazyLoading ? 'loading' : null)}>
                    <td colSpan={this.state.smallView ? null : this.props.data.structure.length}>
                        {this.props.listSummaryText ? this.props.listSummaryText : null}
                        {this.props.showLazyLoading ?
                            null : this.props.showMoreLoading ?
                            (<FlatButton style={{marginLeft: '10px'}}>{'Load ' + this.props.showMoreLoading + ' records'}</FlatButton>) : null
                        }
                    </td>
                </tr>);
        }

        var tableHeaders = [];
        this.props.data.structure.map((c, i) => {
            var labelDOM = null;
            var sortdirection = null;
            if(c.icon) {
                labelDOM = (
                    <div>
                        <Icon key="icon" iconid={c.icon} style={{float: 'left'}} color={this.state.colors.activeIcon} size="small" />
                        <label key="label" style={c.sortable ? {cursor: 'pointer'} : null} dangerouslySetInnerHTML={{__html: c.name}} />
                    </div>
                );
            } else {
                labelDOM = ( <label key="label" style={c.sortable ? {cursor: 'pointer'} : null} dangerouslySetInnerHTML={{__html: c.name}} /> );
            }
            if(c.field[0] === sort_by && this.props.sortable) {
                sortdirection = this.props.data.sort_direction
            }
            tableHeaders.push(
                <TableHeaderCell
                    className={c.className}
                    isSortable={c.sortable ? c.sortable : false}
                    width={c.width ? c.width : null}
                    onClick={this.props.onHeaderClick}
                    key={"headercell" + i}
                    wrap={c.wrap ? true: false}
                    sortdirection={sortdirection}
                    field={c.field[0]}
                >
                    {labelDOM}
                </TableHeaderCell>
            )
        });

        return (
            <Table className="TabularListing" ref="TabularListing"  style={this.props.style} {...this.getDataSet(this.props)}>
                <TableHeader key="TableHeader" ref="TableHeader" {...this.getDataSet(this.props, '-TableHeader')}>
                    <TableHeaderRow>
                        {tableHeaders}
                    </TableHeaderRow>
                </TableHeader>
                <TableBody key="TableBody" {...this.getDataSet(this.props, '-TableBody')} height={this.state.bodyHeight} zebraStripes={this.props.zebraStripes}>
                    {tableCells}
                </TableBody>
            </Table>
        )
    }
}