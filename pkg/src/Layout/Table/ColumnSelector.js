"use strict";

import React from 'react'
import { StripesTheme } from '../../Core/Stripes'
import {IconMenu} from '../../Layouts'
import {CheckBox, CheckBoxGroup, Item} from '../../Forms'
import {autobind} from "core-decorators";

@autobind
export class ColumnSelector extends StripesTheme {

    static defaultProps = {
        type: 'table',
        className: null,
        structure: [],
        hasData: false,
        displayValue: 'table-cell',
        onColumnSelect: () => { return false; }
    };

    constructor(props) {
        super(props);
        this.state = {
            style: {},
            selectorDisabled: false,
            savedColumnVisibility: window.localStorage["tableShowing" + this.getEndPointKey()] ? JSON.parse(window.localStorage["tableShowing" + this.getEndPointKey()]) : null
        }
    }
    componentWillMount() {
        if(!this.state.savedColumnVisibility) {
            this.toggleVisibilityDefaults();
        }
        this.setState({
            style: this.getStyles(),
            savedColumnVisibility: window.localStorage["tableShowing" + this.getEndPointKey()] ? JSON.parse(window.localStorage["tableShowing" + this.getEndPointKey()]) : null
        }, () => {
            if (this.state.savedColumnVisibility && this.props.hasData) {
                this.toggleShowHide(null, this.state.savedColumnVisibility);
            }
        });
    }

    componentWillUpdate(props) {
        if (this.state.savedColumnVisibility && (props.hasData !== this.props.hasData)) {
            this.toggleShowHide(null, this.state.savedColumnVisibility);
        }
    }

    componentDidMount() {
        this.setState({
            allChecked: (!this.props.structure || !this.state.savedColumnVisibility) || (this.props.structure.length === this.state.savedColumnVisibility.length)
        });
    }

    getEndPointKey() {
        let endPoint = location.pathname.split('/');
        endPoint = endPoint[endPoint.length-1];
        return endPoint === "" ? "/" : endPoint;
    }

    toggleVisibilityDefaults() {
        let colvals = [];
        this.props.structure.map((c, i) => {
            let name = c.name.replace(/(<([^>]+)>)|( )/ig, "");
            name = name === "" ? c.field[0] : name;
            if (!(c.visibility !== undefined && c.visibility === false)) {
                colvals.push(name);
            }
        });
        window.localStorage["tableShowing" + this.getEndPointKey()] = JSON.stringify(colvals);
    }

    toggleShowHide(checked, columnValues, props) {
        if(props) {
            this.props.onColumnSelect(props.value, columnValues.indexOf(props.value) >= 0);
        }
        this.setState({
            savedColumnVisibility: columnValues,
            allChecked: !columnValues || this.props.structure.length === columnValues.length,
            selectorDisabled: !columnValues || columnValues.length <= 1
        },() => {
            this.setState({
                style: this.getStyles()
            });
            this.props.structure.map((c, i) => {
                let name = c.name.replace(/(<([^>]+)>)|( )/ig, "");
                name = name === "" ? c.field[0] : name;
                let showing = !columnValues || columnValues.indexOf(name) >= 0;
                let Els = document.querySelectorAll("[data-name='"+name+"']");
                for (let y=0; y < Els.length; y++)
                {
                    Els[y].style.display = showing ? this.props.displayValue : 'none';
                }
            });
            window.localStorage["tableShowing" + this.getEndPointKey()] = JSON.stringify(columnValues);
            this.setState({
                initialLoad: true
            });
        });

    }

    update() {
        if(this.state.savedColumnVisibility) {
            this.toggleShowHide(null, this.state.savedColumnVisibility);
        }
    }

    selectAll(e,a) {
        let columnValues = [];
        this.props.structure.map((c, i) => {
            let name = c.name.replace(/(<([^>]+)>)|( )/ig, "");
                name = name === "" ? c.field[0] : name;
            columnValues.push(name);
        });
        this.toggleShowHide(null, columnValues);
    }

    getStyles() {
        let spacing = this.getSpacing()[this.props.type].cell;
        let color = this.getColors()[this.props.type].header;
        let styleObj = {
            base: {
                position: 'absolute',
                top: '1px',
                right: '2px',
                zIndex: 1
            },
            content: {
                minWidth: '230px',
                textAlign: 'left'
            },
            iconStyle: {
                padding: spacing.padding + 'px'
            },
            item: {
                lineHeight: '20px'
            },
            selectall: {
                borderBottom: '1px solid ' + color.border,
                padding: spacing.padding + 'px',
                opacity: this.state.allChecked ? '.5' : '1'
            }
        };
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        return styleObj;
    }

    render() {
        let ColumnItems = [];
        this.props.structure.map((c, i) => {
            let name = c.name.replace(/(<([^>]+)>)|( )/ig, "");
                name = name === "" ? c.field[0] : name;
            let label = c.name.replace(/(<([^>]+)>)/ig, " - ");
                label = label.replace(/(- &)/ig, "&");
                label = label === "" ? c.field[0] : label.trim();
                label = label.substring(label.length - 1) === "/" || label.substring(label.length - 1) === "-" ? label.substring(0, label.length - 1) : label;
            let checked = this.state.savedColumnVisibility ?
                this.state.savedColumnVisibility.indexOf(name) >= 0 :
                    c.visibility !== undefined && c.visibility === false ? false : true
            ColumnItems.push(
                <Item style={this.state.style.item}
                      defaultChecked={checked}
                      disabled={this.state.selectorDisabled && (this.state.savedColumnVisibility ? this.state.savedColumnVisibility.indexOf(name) >= 0 : true)}
                      value={name}
                      {...this.getDataSet(this.props, ' ' + label)}
                      key={"option"+i}>{label}</Item>
            );
        });
        let someColsHidden = this.state.savedColumnVisibility && this.state.savedColumnVisibility.length !== this.props.structure.length;
        return (
            <IconMenu
                {...this.getDataSet(this.props)}
                backgroundColor={["transparent","white"]}
                iconColor={[someColsHidden ? this.getColors()['default'].activeIcon : this.getColors()['default'].inactiveIcon, this.getColors()['default'].activeIcon]}
                iconid="column"
                direction="left"
                constrainHeight={true}
                ref="ColumnSelectorIconMenu"
                style={this.state.style.base}
                contentStyle={this.state.style.content}
                iconSize="small"
                iconStyle={this.state.style.iconStyle}
                closeOnBlur={true}
            >
                <div key="checkbox_holder" style={this.state.style.selectall}>
                    <CheckBox key="allcheck"
                              ref="allcheck"
                              onChange={this.selectAll}
                              style={this.state.style.item}
                              checked={this.state.allChecked}
                              label="Select All"/>
                </div>
                <CheckBoxGroup
                    key="checkboxgroup"
                    style={{margin: '10px'}}
                    ref="checkboxgroup"
                    onChange={this.toggleShowHide}
                >
                    {ColumnItems}
                </CheckBoxGroup>
            </IconMenu>
        )
    }
}