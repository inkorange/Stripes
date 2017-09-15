"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../../Core/Stripes'
import {IconMenu, MenuItem} from '../../Layouts'
import { Icon } from  '../../Symbols/Icon'
import {CheckBox, CheckBoxGroup, Item} from '../../Forms'
import {TableHeaderCell} from './TableHeaderCell'

export class ColumnSelector extends StripesTheme {

    static defaultProps = {
        type: 'table',
        className: null,
        structure: [],
        hasData: false,
        onColumnSelect: () => { return false; }
    }

    constructor(props) {
        super(props);
        this.toggleShowHide = this.toggleShowHide.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.update = this.update.bind(this);

        this.state = {
            style: {},
            selectorDisabled: false,
            savedColumnVisibility: window.localStorage["tableShowing" + this.getEndPointKey()] ? JSON.parse(window.localStorage["tableShowing" + this.getEndPointKey()]) : null
        }
    }
    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
        if (this.state.savedColumnVisibility && this.props.hasData) {
            this.toggleShowHide(null, this.state.savedColumnVisibility);
        }
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
        var endPoint = location.pathname.split('/');
        var endPoint = endPoint[endPoint.length-1];
        return endPoint === "" ? "/" : endPoint;
    }

    toggleShowHide(e, columnValues) {
        if(e) {
            this.props.onColumnSelect(e.currentTarget.value, columnValues.indexOf(e.currentTarget.value) >= 0);
        }
        this.setState({
            savedColumnVisibility: columnValues,
            allChecked: this.props.structure.length === columnValues.length,
            selectorDisabled: columnValues.length <= 1
        },() => {
            this.setState({
                style: this.getStyles()
            });
            this.props.structure.map((c, i) => {
                var name = c.name.replace(/(<([^>]+)>)|( )/ig, "");
                name = name === "" ? c.field[0] : name;
                var showing = columnValues.indexOf(name) >= 0;
                var Els = document.querySelectorAll("[data-name='"+name+"']");
                for (var y=0; y < Els.length; y++)
                {
                    Els[y].style.display = showing ? 'table-cell' : 'none';
                }
            });
            window.localStorage["tableShowing" + this.getEndPointKey()] = JSON.stringify(columnValues);

        });

    }

    update() {
        if(this.state.savedColumnVisibility) {
            this.toggleShowHide(null, this.state.savedColumnVisibility);
        }
    }

    selectAll(e,a) {
        var columnValues = [];
        this.props.structure.map((c, i) => {
            var name = c.name.replace(/(<([^>]+)>)|( )/ig, "");
                name = name === "" ? c.field[0] : name;
            columnValues.push(name);
        });
        this.toggleShowHide(null, columnValues);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type].cell;
        var color = this.getColors()[this.props.type].header;
        var styleObj = {
            base: {
                position: 'absolute',
                top: '1px',
                right: '0',
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
        var ColumnItems = [];
        this.props.structure.map((c, i) => {
            var name = c.name.replace(/(<([^>]+)>)|( )/ig, "");
                name = name === "" ? c.field[0] : name;
            var label = c.name.replace(/(<([^>]+)>)/ig, " ");
                label = label === "" ? c.field[0] : label;
                label = label.substring(label.length - 1) === "/" ? label.substring(0, label.length - 1) : label;

            console.log();
            ColumnItems.push(
                <Item style={this.state.style.item}
                      defaultChecked={this.state.savedColumnVisibility ? this.state.savedColumnVisibility.indexOf(name) >= 0 : true}
                      disabled={this.state.selectorDisabled && (this.state.savedColumnVisibility ? this.state.savedColumnVisibility.indexOf(name) >= 0 : true)}
                      value={name}
                      {...this.getDataSet(this.props, ' ' + label)}
                      key={"option"+i}>{label}</Item>
            );
        });
        var someColsHidden = this.state.savedColumnVisibility && this.state.savedColumnVisibility.length !== this.props.structure.length;
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