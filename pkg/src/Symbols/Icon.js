"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Icon extends StripesTheme {

    static defaultProps = {
        inactive: false,
        onClick: null,
        type: 'default',
        basestyle: {},
        style: {},
        size: 'small',
        color: null,
        className: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: this.getStyles()
        }
        this.clickAction = this.clickAction.bind(this);
    }

    clickAction(e) {
        if(this.props.onClick) {
            this.props.onClick(e);
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var iconSize = '2rem';
        switch(this.props.size) {
            case 'xsmall':
                iconSize = '1.75rem';
                break;
            case 'small':
                iconSize = '2rem';
                break;
            case 'medium':
                iconSize = '2.5rem';
                break;
            case 'large':
                iconSize = '3.5rem';
                break;
            default:
                iconSize = this.props.size;
        }

        var styleObj = {
            Icon: {
                display: 'inline-block',
                position: 'relative',
                cursor: this.props.onClick ? 'pointer' : 'default'
            },
            svg: {
                fill: this.props.color ? this.props.color : color.iconColor,
                width: iconSize,
                height: iconSize,
                transition: '.5s fill'
            }
        }

        return styleObj;
    }


    render() {
        var useTag = '<use xlink:href="#' + this.props.iconid + '" />';
        var styles = this.getStyles();
        var SVGstyle = Object.assign(styles.svg, this.props.style);
        var Iconstyle = Object.assign(styles.Icon, this.props.basestyle);
        var svg = <svg data-id={this.props["data-id"]} style={SVGstyle} viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: useTag }} />;
        return (
            <div className={"Icon " + this.props.className}
                 title={this.props.title}
                 style={Iconstyle}
                 {...this.getDataSet(this.props)}
                 data-name={this.props.iconid}
            >
                {svg}
                { this.props.onClick ? <div style={{position: 'absolute', cursor: 'pointer', top: 0, bottom: 0, right: 0, left: 0, backgroundColor:'rgba(0,0,0,.001)'}} className="icon-click-target" onClick={this.clickAction}></div> : null }
                {this.props.children}
            </div>
        )
    }
}