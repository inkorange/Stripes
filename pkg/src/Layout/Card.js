"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Card extends StripesTheme {

    static defaultProps = {
        style: {},
        headerStyle: {},
        footerStyle: {},
        type: 'default',
        title: null,
        actions: null,
        fillContainer: false,
        forceBottomAlign: false,
        inactiveDepth: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: this.getStyles()
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            base: {
                transition: "all .25s ease-in-out",
                zIndex: "2",
                background: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,.5)'
            },
            header: {
                backgroundColor: color.headerBackgroundColor,
                padding: spacing.padding * 6 + "px " + spacing.padding * 5 + "px",
                fontSize: '2rem',
                color: 'white',
                zIndex: 1,
                position: 'relative'
            },
            body: {
                padding: spacing.padding * 5 + 'px'
            },
            footer: {
                borderTop: 'solid 1px #ccc',
                padding: spacing.padding*3 + 'px ',
                textAlign: 'right',
                background: 'white',
                zIndex: 1
            },
            inactiveScreen: {
                position: 'absolute',
                top: '80px',
                right: 0,
                bottom: 0,
                left: 0,
                background: 'white',
                zIndex: 3,
                opacity: this.props.inactiveDepth
            }
        };

        if(this.props.fillContainer) {
            styleObj.base.position = 'absolute';
            styleObj.base.bottom = 0;
            styleObj.base.right = 0;
            styleObj.base.left = 0;
            styleObj.base.top = 0;
        }

        if(this.props.forceBottomAlign) {
            styleObj.footer.position= 'fixed';
            styleObj.footer.bottom= 0;
            styleObj.footer.right= 0;
            styleObj.footer.left= 0;
        }

        styleObj.header = Object.assign(styleObj.header, this.props.headerStyle);
        styleObj.footer = Object.assign(styleObj.footer, this.props.footerStyle);
        styleObj.base = Object.assign(styleObj.base, this.props.style);

        return styleObj;
    }

    render() {

        var containerStyle = this.state.style.base;

        return (
            <section {...this.getDataSet(this.props)} style={containerStyle} className={"Card " + this.props.className}>
                {this.props.title ? (
                    <header key="card_header" ref="card_header" style={this.state.style.header}>{this.props.title}</header>
                ) : null}
                <div key="card_body" ref="card_body" style={this.state.style.body}>
                    {this.props.children}
                </div>
                {this.props.actions ? (
                    <footer key="card_footer" ref="card_footer" style={this.state.style.footer}>
                        {this.props.actions}
                    </footer>
                ) : null }
                {this.props.inactiveDepth > 0 ? (
                    <div key="inactivepanel" className="inactivePanel" style={this.state.style.inactiveScreen}></div>
                ): null}
            </section>
        )
    }
}