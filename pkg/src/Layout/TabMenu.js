"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class TabMenu extends StripesTheme {

    static defaultProps = {
        style: {},
        contentStyle: {},
        type: 'tabmenu',
        onClick: () => {},
        className: null     // Adds a class name to the root.
    }

    constructor(props) {
        super(props);
        this.clickItem = this.clickItem.bind(this);
        this._setChildrenMap = this._setChildrenMap.bind(this);

        this.state = {
            selected: 0,
            style: {}
        }
        //this._setChildrenMap();

    }

    _setChildrenMap() {
        var selected = 0;
        this.props.children.map((item,pos) => {
            if(item.props.selected) {
                selected = pos;
            }
        });
        this.setState({
                selected: selected
            },
            () => { this.setState({style: this.getStyles()})}
        )
    }

    componentDidMount() {
        this._setChildrenMap();
    }

    componentDidUpdate(props) {
        if(this.props.children != props.children) {
            this._setChildrenMap();
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var itemCount = this.props.children.length;

        var itemBase = {
            padding: "0px " + spacing.padding + "px",
            minHeight: spacing.minHeight + 'px',
            lineHeight: spacing.minHeight + 'px',
            color: color.textColor,
            fontSize: spacing.fontSize,
            flexGrow: 1,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'opacity .3s',
            width: 100/this.props.children.length + "%",
            userSelect: 'none'
        }
        var styleObj = {
            base: {
                backgroundColor: color.background,
                position: 'relative',
                display: 'flex',
                flexWrap: 'nowrap'
            },
            item: Object.assign({opacity:.5}, itemBase),
            selecteditem: Object.assign({opacity: 1}, itemBase),
            indicator: {
                transition: 'left .5s',
                position: 'absolute',
                left: (100/itemCount * this.state.selected) + '%',
                bottom: 0,
                height: spacing.indicatorHeight + 'px',
                width: 100 / itemCount + "%",
                backgroundColor: color.indicator
            },
            content: {

            }
        };
        //styleObj.selecteditem = styleObj.item;
        //styleObj.selecteditem.opacity = 1;
        styleObj.base = Object.assign(styleObj.base, this.props.style);
        styleObj.content = Object.assign(styleObj.content, this.props.contentStyle);

        return styleObj;
    }

    clickItem(e) {
        var pos = e.target.getAttribute("data-itemid")*1;
        var value = e.target.getAttribute("data-value");
        this.setState({
            selected: pos
        }, () => {
            this.setState({
                style: this.getStyles()
            });
            this.props.onClick(e,pos,value);
        });
    }

    render() {
        var items = [];
        var content = [];
        this.props.children.map((item, pos) => {
            items.push(
                <div onClick={this.clickItem} data-value={item.props.value} data-itemid={pos} key={"item" + pos} style={pos == this.state.selected ? this.state.style.selecteditem : this.state.style.item}>
                    {item.props.label}
                </div>
            );
            content.push(item.props.children ? item.props.children : null);
        });

        return (
            <div {...this.getDataSet(this.props)} className={this.props.className}>
                <section style={this.state.style.base}>
                    {items}
                    <span ref="selected" style={this.state.style.indicator}></span>
                </section>
                <section style={this.state.style.content}>
                    {content[this.state.selected]}
                </section>
            </div>
        )
    }
}