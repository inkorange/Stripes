"use strict"

import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'
import { FlatButton } from  '../Forms/Buttons'
import { ProgressSpinner } from  '../Elements/ProgressSpinner'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell, ColumnSelector} from '../Table'

export class TabularListing extends StripesTheme {

    static defaultProps = {
        type: 'table',
        columnSelector: false,
        data: null,
        height: null,
        bodyHeight: null,
        onRowClick: () => { return false;},
        onValueClick: () => { return false;},
        onHeaderClick: () => { return false;},
        onColumnSelect: () => { return false;},
        zebraStripes: true,
        sortable: true,
        triggerLazyLoad: () => { return false; },
        showMoreLoading: false,
        showLazyLoading: false,
        disabled: false
    };

    constructor(props) {
        super(props);
        this.clickValue = this.clickValue.bind(this);
        this.resolveHeight = this.resolveHeight.bind(this);
        this.handleHeaderScroll = this.handleHeaderScroll.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            colors: this.getColors()[this.props.type],
            bodyHeight: this.props.bodyHeight,
            style: {},
            header_left: null
        };
        this.ticking = false;
    }

    shouldComponentUpdate(props) {
        return props.data ? true : false;
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.TableBody).addEventListener('scroll', this.handleHeaderScroll, false);
        this.setState({
            style: this.getStyles()
        });
        this.resolveHeight();
    }

    componentDidUpdate(props, state) {
        if(props.height !== this.props.height) {
            this.resolveHeight();
        }
        this.resolveHiddenFields();
    }

    update(e) {
        this.ticking = false;
        this.refs.TableHeaderContainer.scrollLeft = e.target.scrollLeft;
    }

    handleHeaderScroll(e) {
        this.ticking = this.ticking || requestAnimationFrame(() => { this.update(e); });
    }

    resolveHeight() {
        if(this.props.height) {
            let parentHeight = parseInt(this.props.height ? this.props.height : ReactDOM.findDOMNode(this.refs.TabularListing).parentNode.clientHeight);
            let tableHeaderHeight = ReactDOM.findDOMNode(this.refs.TableHeader).clientHeight;
            let bodyHeight = parentHeight - tableHeaderHeight;
            this.setState({
                bodyHeight: bodyHeight
            });
        }
    }

    clickValue(e) {
        if(this.props.onValueClick) {
            e.preventDefault();
            e.stopPropagation();
            let filterValue = e.currentTarget.getAttribute('data-value');
            this.props.onValueClick(filterValue);
            return false;
        }
    }

    resolveHiddenFields() {
        if(this.refs.ColumnSelector) {
            this.refs.ColumnSelector.update();
        }
    }

    getStyles() {
        const spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            base: {
                overflow: 'hidden'
            },
            header: {
                width: '100%',
                overflowX: 'auto'
            },
            listSummary: {
                position: 'relative',
                top: '1px',
                lineHeight: spacing.padding*6 + 'px',
                display: 'inline-block'
            },
            showMoreStyle: {
                textAlign: 'right',
                fontSize: spacing.fontSize,
                paddingTop: spacing.cell.padding,
                backgroundColor: 'white',
                boxShadow: '0 2px 0 rgb(150,150,150) inset'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        let sort_by = this.props.data.sort_by;
        let tableCells = [];
        this.props.data.rows.map((r, i) => {
            let cells = [];
            this.props.data.structure.map((header, key) => {
                let itemDOM = [];
                let fieldStr = "";
                header.field.map((field, index) => {
                    let dimObj = this.dimensionalObjectResolution(r, field);
                    let value = header.formatFn ? header.formatFn(dimObj, field) : dimObj;
                    let filterA = header.filterable ?
                        header.filterable.length ? header.filterable[0] : header.filterable : null;
                    let filterB = header.filterable ?
                        header.filterable.length ? header.filterable[1] : header.filterable : null;
                    if(index === 0 && value) {
                        itemDOM.push(
                            <span key={"prim" + key + "" + index} onClick={filterA ? this.clickValue : null} data-filterable={filterA} data-value={dimObj}>{value}</span>
                        );
                    } else if(value) {
                        itemDOM.push(
                            <em key={"sec" + key + "" + index} onClick={filterB ? this.clickValue : null} data-filterable={filterB} data-value={dimObj} >{value}</em>
                        );
                    }
                    fieldStr += field + " ";
                });
                let name = header.name !== "" ? header.name.replace(/(<([^>]+)>)|( )/ig, "") : header.field[0];
                cells.push(
                    <TableCell
                        className={header.className}
                        data-name={name}
                        key={"headcell"+key}
                        width={header.width}
                        data-filterable={header.filterable}
                        { ...(header.filterable ? this.getDataSet(this.props, ' TableCell ' + fieldStr) : {}) }
                        wrap={header.wrap ? true: false}>
                            {itemDOM}
                    </TableCell>
                );
            });
            if(this.props.columnSelector) {
                cells.push(
                    <TableCell
                        key="columnSelector"
                        width="30px"
                    />
                );
            }
            let rowclass = this.props.data.rowClassFormatter ? this.props.data.rowClassFormatter(r) : "";
            tableCells.push(
                <TableRow className={rowclass} onClick={(e) => { this.props.onRowClick(e, r); }} key={"row"+i}>
                    {cells}
                </TableRow>
            );
        });

        if(tableCells && (this.props.showMoreLoading || this.props.listSummaryText)) {
            tableCells.push(
                <tr key="lazy_loading_line"
                    style={this.state.style.showMoreStyle}
                    {...this.getDataSet(this.props, ' Load More Records')}
                    onClick={this.props.triggerLazyLoad} className={"lazy_loading_empty " + (this.props.showLazyLoading ? 'loading' : null)}>
                    <td style={{padding: 0, margin: 0}} colSpan={this.state.smallView ? null : this.props.data.structure.length + (this.props.columnSelector ? 1 : 0)}>
                        {this.props.listSummaryText ? <span style={this.state.style.listSummary}>{this.props.listSummaryText}</span> : null}
                        {this.props.showLazyLoading ?
                            <ProgressSpinner style={{position: 'static', margin: '10px 10px 0 10px', float: 'right'}} size={30} /> : this.props.showMoreLoading ?
                            (<FlatButton style={{marginLeft: '10px'}}>{'Load ' + this.props.showMoreLoading + ' records'}</FlatButton>) : null
                        }
                    </td>
                </tr>);
        }

        let tableHeaders = [];
        this.props.data.structure.map((c, i) => {
            let labelDOM = null;
            let sortdirection = null;
            if(c.icon) {
                labelDOM = [
                    <Icon key="icon" iconid={c.icon} style={{float: 'left'}} color={this.state.colors.textColor} size="16px" />,
                    <label key="label" style={c.sortable ? {cursor: 'pointer'} : null} dangerouslySetInnerHTML={{__html: c.name}} />
                ];
            } else {
                labelDOM = ( <label key="label" style={c.sortable ? {cursor: 'pointer'} : null} dangerouslySetInnerHTML={{__html: c.name}} /> );
            }
            if(c.field[0] === sort_by && this.props.sortable) {
                sortdirection = this.props.data.sort_direction
            }
            let name = c.name !== "" ? c.name.replace(/(<([^>]+)>)|( )/ig, "") : c.field[0];
            tableHeaders.push(
                <TableHeaderCell
                    className={c.className}
                    isSortable={c.sortable ? c.sortable : false}
                    data-name={name}
                    width={c.width ? c.width : null}
                    onClick={this.props.onHeaderClick}
                    key={"headercell" + i}
                    wrap={c.wrap ? true: false}
                    sortdirection={sortdirection}
                    field={c.field[0]}
                    {...this.getDataSet(this.props, ' TableHeader ' + name)}
                >
                    {labelDOM}
                </TableHeaderCell>
            );
        });
        if(this.props.columnSelector) {
            tableHeaders.push(
                <TableHeaderCell key="ColumnSelector" width="30px" className="ColumnSelector" />
            );
        }
        return (
            <Table className="TabularListing" ref="TabularListing"  style={this.state.style.base} {...this.getDataSet(this.props)}>
                <div ref="TableHeaderContainer" className="TableHeaderContainer" style={this.state.style.header}>
                    <TableHeader key="TableHeader" ref="TableHeader">
                        <TableHeaderRow>
                            {tableHeaders}
                        </TableHeaderRow>
                    </TableHeader>
                    {this.props.columnSelector ?
                        <ColumnSelector
                            {...this.getDataSet(this.props, ' ColumnSelector')}
                            key="ColumnSelector"
                            ref="ColumnSelector"
                            hasData={(this.props.data.rows && this.props.data.rows.length) ? true: false}
                            structure={this.props.data.structure}
                            onColumnSelect={this.props.onColumnSelect}
                        /> : null
                    }
                </div>
                <TableBody ref="TableBody" key="TableBody" height={this.state.bodyHeight} disabled={this.props.disabled} zebraStripes={this.props.zebraStripes}>
                    {tableCells}
                </TableBody>
            </Table>
        )
    }
}