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
        fullHeight: true,
        height: '100%',
        onRowClick: () => { return false;},
        onValueClick: () => { return false;},
        headerClick: () => { return false;},
        bodyHeight: 0,
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
        window.onresize = this.resolveHeight;
    }

    componentWillUpdate(props) {
        if(props.data !== this.props.data) {
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
        var _this = this;
        var parentHeight = ReactDOM.findDOMNode(_this.refs.TabularListing).parentElement.clientHeight;
        var tableHeaderHeight = ReactDOM.findDOMNode(_this.refs.TableHeader).clientHeight;
        var bodyHeight = parentHeight - tableHeaderHeight;
        //console.log('parent height: ', parentHeight);
        //console.log('tableHeaderHeight height: ', tableHeaderHeight, ReactDOM.findDOMNode(_this.refs.TableHeader).getClientRects());
        //console.log(bodyHeight);
        _this.setState({
            bodyHeight: bodyHeight
        });
    }

    clickValue(e) {
        if(this.props.fnValueClick) {
            e.preventDefault();
            e.stopPropagation();
            var filterValue = $(e.currentTarget).attr('data-value');
            this.props.fnValueClick(filterValue);
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
                var value = [];
                header.field.map((field, index) => {
                    var dimObj = this.dimensionalObjectResolution(r, field);
                    var value = header.formatFn ? header.formatFn(dimObj, field) : dimObj;
                    if(index === 0) {
                        itemDOM.push(
                            <span key={"prim" + key + "" + index} onClick={header.filterable ? this.clickValue : false} data-filterable={header.filterable} data-value={dimObj}>{value}</span>
                        );
                    } else {
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
                        data-value={value}
                        wrap={header.wrap ? true: false}>
                            {itemDOM}
                    </TableCell>
                );
            });
            tableCells.push(
                <TableRow onClick={this.props.onRowClick} key={"row"+i}>
                    {cells}
                </TableRow>
            );
        });

        if(tableCells && (this.props.showMoreLoading || this.props.listSummaryText)) {
            tableCells.push(
                <tr key={"lazy_loading_line"}
                    style={{textAlign: 'center'}}
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
                    onClick={this.props.headerClick}
                    key={"headercell" + i}
                    wrap={c.wrap ? true: false}
                    sortdirection={sortdirection}
                >
                    {labelDOM}
                </TableHeaderCell>
            )
        });
        return (
            <Table className="TabularListing" ref="TabularListing" height={this.props.height} style={this.props.style} {...this.getDataSet(this.props)}>
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