"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Icon} from  '../Symbols/Icon'

export class TabMenu extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'tabmenu',
        title: null,
        leftIcon: null,
        onClick: () => {}
    }

    constructor(props) {
        super(props);
        this.clickItem = this.clickItem.bind(this);

        var selected = 0;
        this.props.children.map((item,pos) => {
            if(item.props.selected) {
                selected = pos;
            }
        });
        this.state = {
            style: {},
            selected: selected
        }
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
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
            transition: 'opacity .3s'
        }
        var styleObj = {
            base: {
                backgroundColor: color.background,
                boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
                position: 'relative',
                zIndex: 1,
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

        return styleObj;
    }

    clickItem(e) {
        var pos = e.target.getAttribute("data-itemid")*1;
        this.setState({
            selected: pos
        }, () => {
            this.setState({
                style: this.getStyles()
            });
            this.props.onClick();
        });
    }

    render() {
        var items = [];
        var content = [];
        this.props.children.map((item, pos) => {
            items.push(
                <div onClick={this.clickItem} data-itemid={pos} key={"item" + pos} style={pos == this.state.selected ? this.state.style.selecteditem : this.state.style.item}>
                    {item.props.label}
                </div>
            );
            content.push(item.props.children ? item.props.children : null);
        });

        return (
            <div>
                <section style={this.state.style.base}>
                    {items}
                    <span ref="selected" style={this.state.style.indicator}></span>
                </section>
                <section>
                    {content[this.state.selected]}
                </section>
            </div>
        )
    }
}