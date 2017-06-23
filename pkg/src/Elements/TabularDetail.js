"use strict"

import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'
import { FlatButton } from  '../Forms/Buttons'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../Table'
import { Item, DropDown } from '../Forms'
export class TabularDetail extends StripesTheme {

    static defaultProps = {
        type: 'default',
        data: null,
        fullHeight: true,
        height: null,
        onRowClick: () => { return false;},
        onValueClick: () => { return false;},
        onHeaderClick: () => { return false;},
        bodyHeight: 0,
        zebraStripes: true,
        sortable: true,
        triggerLazyLoad: () => { return false; },
        showMoreLoading: false,
        showLazyLoading: false,
        style: {}
    }

    shouldComponentUpdate(props) {
        return props.data ? true : false;
    }

    componentDidMount() {
        this.resolveHeight();
        this.setState({
            style: this.getStyles()
        })
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
        this.headerClick = this.headerClick.bind(this);
        this.state = {
            style: this.getStyles(),
            bodyHeight: this.props.bodyHeight
        }
    }

    resolveHeight() {
        if(this.props.height) {
            var parentHeight = this.props.height ? this.props.height : ReactDOM.findDOMNode(this.refs.TabularDetail).parentElement.clientHeight;
            var tableHeaderHeight = ReactDOM.findDOMNode(this.refs.FieldSelector).clientHeight;
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

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            base: {

            },
            fieldSelector: {
                background: '#ccc',
                textAlign: 'right',
                padding: spacing.padding
            },
            showMoreStyle: {
                textAlign: 'center',
                backgroundColor: color.inactiveIcon,
                boxShadow: '0 2px 0 rgb(150,150,150) inset'
            },
            row: {
                display: 'flex',
                flexFlow: 'row nowrap',
                borderBottom: '1px solid #ccc',
                padding: '0 ' + spacing.padding*2 + 'px',
                background: 'white',
                position: 'relative'
            },
            detailContent: {
                display: 'flex',
                flexFlow: 'row wrap',
                alignContent: 'stretch',
                zIndex: '1'
            },
            contentCell: {
                color: 'black',
                width: '80px',
                margin: spacing.padding*2 + 'px'
            },
            rowLabel: {
                fontSize: '1.5rem',
                display: 'block',
                color: 'gray',
                textTransform: 'uppercase'
            },
            activeIconColor: color.activeIcon
        };
        styleObj.row = Object.assign(styleObj.row, this.props.style);
        return styleObj;
    }

    headerClick(field) {
        this.props.onHeaderClick(field);
    }

    render() {
        var sort_by = this.props.data.sort_by;

        var tableRows = [];

        this.props.data.rows.map((r, i) => {
            var cells = [];
            this.props.data.structure.map((header, key) => {
                var itemDOM = [];
                var labelDOM = null;

                // constructing the headers *****************************************
                labelDOM = ( <label key="label" dangerouslySetInnerHTML={{__html: header.name}}/> );

                // constructing the values *****************************************
                header.field.map((field, index) => {
                    var dimObj = this.dimensionalObjectResolution(r, field);
                    var value = header.formatFn ? header.formatFn(dimObj, field) : dimObj;
                    if (index === 0 && value) {
                        itemDOM.push(
                            <span key={"prim" + key + "" + index}
                                  onClick={header.filterable ? this.clickValue : false}
                                  data-filterable={header.filterable} data-value={dimObj}>{value}</span>
                        );
                    } else if(value){
                        itemDOM.push(
                            <em key={"sec" + key + "" + index} onClick={header.filterable ? this.clickValue : false}
                                data-filterable={header.filterable} data-value={dimObj}>{value}</em>
                        );
                    }
                });

                cells.push(
                    <div
                        style={Object.assign({width: header.width}, this.state.style.contentCell)}
                        className={header.className}
                        key={"headcell"+key}
                        data-filterable={header.filterable}
                        wrap={header.wrap ? true: false}>
                        <label style={this.state.style.rowLabel}>{labelDOM}</label>
                        {itemDOM}
                    </div>
                );

            });
            tableRows.push(
                <div style={this.state.style.row} onClick={(e) => { this.props.onRowClick(e, r); }} key={"row"+i}>
                    <div style={this.state.style.detailContent}>{cells}</div>
                </div>
            );
        });

        if(tableRows && (this.props.showMoreLoading || this.props.listSummaryText)) {
            tableRows.push(
                <div key="lazy_loading_line"
                    style={this.state.style.showMoreStyle}
                    data-event-click="LOAD_MORE"
                    data-event-desc={"Loading " + this.props.showMoreLoading + " Records"}
                    data-event-active={this.props.showMoreLoading}
                    data-automation-id="Load More Records"
                    onClick={this.props.triggerLazyLoad} className={"lazy_loading_empty " + (this.props.showLazyLoading ? 'loading' : null)}>
                        {this.props.listSummaryText ? this.props.listSummaryText : null}
                        {this.props.showLazyLoading ?
                            null : this.props.showMoreLoading ?
                            (<FlatButton style={{marginLeft: '10px'}}>{'Load ' + this.props.showMoreLoading + ' records'}</FlatButton>) : null
                        }
                </div>);
        }

        var fieldOptions = [];
        this.props.data.structure.map((c, i) => {
            if(c.sortable) {
                fieldOptions.push(
                    <Item
                        data-automation-id={"Field Sorter - " + c.field[0]}
                        value={c.field[0]}
                        defaultChecked={c.field[0] === sort_by && this.props.sortable}
                        key={"fielditem" + i}>
                        {c.name.replace(/<\/?[^>]+(>|$)/g, " ").trim()}
                    </Item>
                );
            }
        });

        return (
            <article className="TabularDetail" ref="TabularDetail"  {...this.getDataSet(this.props)}>
                <div ref="FieldSelector" style={this.state.style.fieldSelector}>
                    <div style={{position: 'relative', display: 'inline-block'}}>
                        <DropDown
                            placeholder="All trailer types"
                            showEmpty={true}
                            onChange={this.headerClick}
                        >
                            {fieldOptions}
                        </DropDown>
                    </div>
                </div>
                <div ref="TabularDetailContent" style={{height: this.state.bodyHeight ? this.state.bodyHeight : null, overflow: 'auto'}}>
                    {tableRows}
                </div>
            </article>
        )
    }
}