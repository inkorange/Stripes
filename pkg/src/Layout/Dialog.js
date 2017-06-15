"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Card } from './Card'
import { Icon } from  '../Symbols/Icon'

export class Dialog extends StripesTheme {

    static defaultProps = {
        style: {},
        dialogStyle: {},
        cardStyle: {},
        type: 'default',
        showClose: false,
        title: null,
        actions: null,
        width: '80%',
        onClose: () => { return false; }
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.state = {
            open: false,
            style: {}
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    toggleDialog(open) {
        this.setState({
            open: open !== undefined ? open : !this.state.open
        }, () => {
            this.setState({
                style: this.getStyles()
            });
        })
    }

    close() {
        this.toggleDialog(false);
        setTimeout(() => {
            this.refs.dialogContainer.style.display = "none";
            this.props.onClose();
        }, 250);
    }

    open() {
        this.refs.dialogContainer.style.display = "block";
        setTimeout(() => {
            this.toggleDialog(true);
        }, 50);
    }

    getStyles() {
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            container: {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                display: 'none',
                opacity: this.state.open ? 1 : 0,
                transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                background: 'rgba(0,0,0,.75)',
                zIndex: spacing.menuZIndex
            },
            dialog: {
                width: this.props.width,
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, ' + (this.state.open ? '-50%' : '-80%') + ')',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },
            card: {
                base: {
                    borderRadius: spacing.borderRadius + 'px'
                },
                header: {
                    padding: spacing.padding*7 + "px " + spacing.padding*4 + "px",
                    borderRadius: spacing.borderRadius + "px " + spacing.borderRadius + "px 0 0"
                },
                footer: {
                    padding: spacing.padding*3 + "px " + spacing.padding*4 + "px",
                    borderRadius: "0 0 " + spacing.borderRadius + "px " + spacing.borderRadius + "px"
                },
                closebutton: {
                    float: 'right',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: "calc(50% - 10px)",
                    right: spacing.padding*4 + "px "
                }
            }
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        styleObj.dialog = Object.assign(styleObj.dialog, this.props.dialogStyle);
        styleObj.card.base = Object.assign(styleObj.card.base, this.props.cardStyle);
        return styleObj;
    }

    render() {
        var titleNode = null;

        if(this.props.title || this.props.showClose) {
            titleNode = (
                <div>
                    {this.props.title}
                    {this.props.showClose ? (<Icon key="titleclose" onClick={this.close} iconid="close" color="white" size="xsmall" basestyle={this.state.style.card.closebutton}/>) : null}
                </div>
            );
        }
        return (
            <section {...this.getDataSet(this.props)} style={this.state.style.container} ref="dialogContainer" className={"Dialog " + this.props.className}>
                <div style={this.state.style.dialog}>
                    <Card
                        title={titleNode}
                        actions={this.props.actions}
                        style={this.state.style.card.base}
                        headerStyle={this.state.style.card.header}
                        footerStyle={this.state.style.card.footer}
                    >
                        {this.props.children}
                    </Card>
                </div>
            </section>
        )
    }
}