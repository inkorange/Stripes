"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import { Card } from './Card'

export class Dialog extends StripesTheme {

    static defaultProps = {
        style: {},
        type: 'default',
        modal: true,
        title: null,
        actions: null,
        width: '80%'
    }

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
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
        }, 500);
    }

    open() {
        this.refs.dialogContainer.style.display = "block";
        setTimeout(() => {
            this.toggleDialog(true);
        }, 50);
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
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
                transform: 'translate(-50%, -50%)'
            },
            card: {
                base: {
                    borderRadius: spacing.borderRadius + "px"
                },
                header: {
                    padding: spacing.padding*8 + "px " + spacing.padding*4 + "px",
                    borderRadius: spacing.borderRadius + "px " + spacing.borderRadius + "px 0 0"
                },
                footer: {
                    padding: spacing.padding*3 + "px " + spacing.padding*4 + "px",
                    borderRadius: "0 0 " + spacing.borderRadius + "px " + spacing.borderRadius + "px"
                }
            }
        };
        styleObj.container = Object.assign(styleObj.container, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <section style={this.state.style.container} ref="dialogContainer" className="Dialog">
                <div style={this.state.style.dialog}>
                    <Card
                        title={this.props.title}
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