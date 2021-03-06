"use strict"

import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Icon } from  '../Symbols/Icon'
import { FlatButton } from  '../Forms/Buttons'
import { Item, DropDown } from '../Forms'
import {ColumnSelector} from '../Table'
export class TabularDetail extends StripesTheme {

    static defaultProps = {
        type: 'default',
        data: null,
        fullHeight: true,
        height: null,
        onRowClick: () => { return false;},
        onValueClick: () => { return false;},
        onHeaderClick: () => { return false;},
        onColumnSelect: () => { return false;},
        bodyHeight: 0,
        zebraStripes: true,
        columnSelector: false,
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
            let parentHeight = this.props.height ? this.props.height : ReactDOM.findDOMNode(this.refs.TabularDetail).parentNode.clientHeight;
            let tableHeaderHeight = ReactDOM.findDOMNode(this.refs.FieldSelector).clientHeight;
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

    getStyles() {
        let color = this.getColors()[this.props.type];
        let rowColor = this.getColors().table.row;
        let spacing = this.getSpacing()[this.props.type];
        let styleObj = {
            base: {

            },
            fieldSelector: {
                background: rowColor.zebraStripe,
                borderBottom: 'solid 1px ' + color.border,
                textAlign: 'right',
                padding: spacing.padding
            },
            showMoreStyle: {
                textAlign: 'center',
                backgroundColor: color.inactiveIcon,
                boxShadow: '0 2px 0 rgb(150,150,150) inset'
            },
            row: {
                borderBottom: '1px solid ' + color.border,
                position: 'relative',
                padding: spacing.padding + 'px 0'

            },
            contentCell: {
                color: 'black',
                display: 'block',
                overflow: 'hidden',
                margin: '0 ' + spacing.padding + 'px',
                padding: spacing.padding + 'px 0',
                borderBottom: '1px solid rgba(0,0,0,.1)'
            },
            rowLabel: {
                float: 'left',
                fontSize: '1.5rem',
                display: 'block',
                color: 'gray',
                textTransform: 'uppercase',
                paddingLeft: spacing.padding + 'px'
            },
            contentValue: {
                float: 'right',
                textAlign: 'right',
                paddingRight: spacing.padding + 'px'
            },
            clickLink: {
                cursor: 'pointer',
                color: color.activeIcon
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
        let sort_by = this.props.data.sort_by;
        let color = this.getColors().table.row;
        let tableRows = [];

        this.props.data.rows.map((r, i) => {
            let cells = [];
            this.props.data.structure.map((header, key) => {
                let itemDOM = [];
                let label = header.name; //.replace(/(<([^>]+)>)/ig, " ");
                label = label === "" ? header.field[0] : label;
                let labelDOM = ( <span key="label" dangerouslySetInnerHTML={{__html: label}}/> );
                header.field.map((field, index) => {
                    let dimObj = this.dimensionalObjectResolution(r, field);
                    let value = header.formatFn ? header.formatFn(dimObj, field) : dimObj;
                    let clickStyle = header.filterable ? this.state.style.clickLink : {};
                    if (index === 0 && value) {
                        itemDOM.push(
                            <span key={"prim" + key + "" + index}
                                  className={header.filterable ? 'filterable' : ''}
                                  onClick={header.filterable ? this.clickValue : () => { return false; }}
                                  style={clickStyle}
                                  data-filterable={header.filterable} data-value={dimObj}>{value}</span>
                        );
                    } else if(value){
                        itemDOM.push(
                            <em key={"sec" + key + "" + index} onClick={header.filterable ? this.clickValue : () => { return false; }}
                                className={header.filterable ? 'filterable' : ''}
                                style={clickStyle}
                                data-filterable={header.filterable} data-value={dimObj}>{value}</em>
                        );
                    }
                });
                let name = header.name !== "" ? header.name.replace(/(<([^>]+)>)|( )/ig, "") : header.field[0];
                cells.push(<div
                    style={this.state.style.contentCell}
                    className={header.className}
                    data-name={name}
                    key={"headcell"+key}
                    data-filterable={header.filterable}
                    wrap={header.wrap ? true: false}>
                    <label style={this.state.style.rowLabel}>{labelDOM}</label>
                    <div style={this.state.style.contentValue}>{itemDOM}</div>
                </div>);
            });
            tableRows.push(
                <div className="detail_row" style={Object.assign({background: i%2 ? color.zebraStripe : 'white'}, this.state.style.row)} onClick={(e) => { this.props.onRowClick(e, r); }} key={"row"+i}>
                    {cells}
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
                    onClick={this.props.triggerLazyLoad} className={"lazy_loading_empty " + (this.props.showLazyLoading ? 'loading' : () => { return false; })}>
                        {this.props.listSummaryText ? this.props.listSummaryText : null}
                        {this.props.showLazyLoading ?
                            null : this.props.showMoreLoading ?
                            (<FlatButton style={{marginLeft: '10px'}}>{'Load ' + this.props.showMoreLoading + ' records'}</FlatButton>) : null
                        }
                </div>);
        }

        let fieldOptions = [];
        this.props.data.structure.map((c, i) => {
            if(c.sortable) {
                let label = c.name.replace(/(<([^>]+)>)/ig, "/");
                label = label === "" ? c.field[0] : label;
                label = label.substring(label.length - 1) === "/" ? label.substring(0, label.length - 1) : label;
                fieldOptions.push(
                    <Item
                        data-automation-id={"Field Sorter - " + c.field[0]}
                        value={c.field[0]}
                        defaultChecked={c.field[0] === sort_by && this.props.sortable}
                        key={"fielditem" + i}>
                        {label}
                    </Item>
                );
            }
        });

        return (
            <article className="TabularDetail" style={{position: 'relative'}} ref="TabularDetail"  {...this.getDataSet(this.props)}>
                <div ref="FieldSelector" style={this.state.style.fieldSelector}>
                    <div style={{position: 'relative', display: 'inline-block', paddingRight: this.props.columnSelector ? '40px' : 0}}>
                        <label>Sort By: </label>
                        <DropDown
                            showEmpty={true}
                            onChange={this.headerClick}
                            style={{marginTop: 0, marginBottom: 0}}
                        >
                            {fieldOptions}
                        </DropDown>
                    </div>
                </div>
                <div ref="TabularDetailContent" style={{height: this.state.bodyHeight ? this.state.bodyHeight : null, overflow: 'auto'}}>
                    {tableRows}
                </div>
                {this.props.columnSelector ?
                    <ColumnSelector
                        {...this.getDataSet(this.props, ' ColumnSelector')}
                        key="ColumnSelector"
                        ref="ColumnSelector"
                        style={{marginTop: '-3px'}}
                        displayValue="block"
                        hasData={(this.props.data.rows && this.props.data.rows.length) ? true: false}
                        structure={this.props.data.structure}
                        onColumnSelect={this.props.onColumnSelect}
                    /> : null
                }
            </article>
        )
    }
}