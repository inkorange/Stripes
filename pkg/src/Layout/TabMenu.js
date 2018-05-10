"use strict";

import React from 'react'
import { StripesTheme } from '../Core/Stripes'

export class TabMenu extends StripesTheme {

    static defaultProps = {
        style: {},
        contentStyle: {},
        type: 'tabmenu',
        onClick: () => {},
        className: null     // Adds a class name to the root.
    };

    constructor(props) {
        super(props);
        this.clickItem = this.clickItem.bind(this);
        this._setChildrenMap = this._setChildrenMap.bind(this);
        this.state = {
            selected: 0,
            style: {}
        };
        this.color = this.getColors()[this.props.type];
        this.spacing = this.getSpacing()[this.props.type];

    }

    _setChildrenMap() {
        let selected = 0;
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
        const itemCount = this.props.children.length;

        let itemBase = {
            padding: "0px " + this.spacing.padding + "px",
            minHeight: this.spacing.minHeight + 'px',
            color: this.color.textColor,
            fontSize: this.spacing.fontSize,
            flexGrow: 1,
            position: 'relative',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'opacity .3s',
            width: 100/this.props.children.length + "%",
            userSelect: 'none'
        };
        let styleObj = {
            base: {
                backgroundColor: this.color.background,
                position: 'relative',
                display: 'flex',
                flexWrap: 'nowrap'
            },
            item: Object.assign({opacity:.5}, itemBase),
            tabcontent: {
                position: 'absolute',
                textAlign: 'center',
                top: '50%',
                right: 0,
                left: 0,
                transform: 'translate(0, -50%)'
            },
            selecteditem: this.hardExtend(
                {opacity: 1, backgroundColor: this.color.selectedBackground},
                itemBase),
            indicator: {
                transition: 'left .5s',
                position: 'absolute',
                left: (100/itemCount * this.state.selected) + '%',
                bottom: 0,
                height: this.spacing.indicatorHeight + 'px',
                width: 100 / itemCount + "%",
                backgroundColor: this.color.indicator
            },
            content: {}
        };
        styleObj.base = this.hardExtend(styleObj.base, this.props.style);
        styleObj.content = this.hardExtend(styleObj.content, this.props.contentStyle);
        return styleObj;
    }

    clickItem(e) {
        const pos = e.currentTarget.getAttribute("data-itemid")*1;
        const value = e.currentTarget.getAttribute("data-value");
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
        let items = [];
        let content = [];
        let indstyle = this.state.style.indicator;
        let leftCount = 0;
        this.props.children.map((item, pos) => {
            let style = pos === this.state.selected ? this.state.style.selecteditem : this.state.style.item;
            if(item.props && item.props.width) {
                const styleExtend = {width: item.props.width, flexGrow: 'initial'};
                style = !style ? styleExtend: this.hardExtend(style, styleExtend);
                if(indstyle && pos === this.state.selected && (item.props && item.props.width)) {
                    indstyle = this.hardExtend(indstyle,
                        {
                            width: item.props.width,
                            left: leftCount + "px"
                        });
                }
                leftCount += parseInt(item.props.width);
            }

            items.push(
                <div onClick={this.clickItem} data-value={item.props.value} data-itemid={pos} key={"item" + pos} style={style}>
                    <div style={this.state.style.tabcontent}>
                    {item.props.label ? item.props.label : item.props.children}
                    </div>
                </div>
            );
            content.push(item.props.children ? item.props.children : null);
        });

        return (
            <div {...this.getDataSet(this.props)} className={this.props.className}>
                <section style={this.state.style.base}>
                    {items}
                    <span ref="selected" style={indstyle}></span>
                </section>
                <section style={this.state.style.content}>
                    {content[this.state.selected]}
                </section>
            </div>
        )
    }
}