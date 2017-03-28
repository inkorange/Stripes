"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Icon extends StripesTheme {

    static defaultProps = {
        inactive: false,
        enhancedClick: false,
        onClick: () => { return false; },
        type: 'default',
        basestyle: {},
        style: {},
        size: 'small',
        color: null
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
        this.props.onClick(e);
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
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
                display: 'inline-block'
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
        var SVGstyle = this.props.style ? Object.assign(this.props.style, styles.svg) : styles.svg;
        var Iconstyle = Object.assign(this.props.basestyle, styles.Icon);

        var svg = <svg data-id={this.props["data-id"]} style={SVGstyle} viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: useTag }} />;
        var enhanced =  (<div style={{position: 'relative'}}>
            {svg}
            <div style={{position: 'absolute', cursor: 'pointer', top: 0, bottom: 0, right: 0, left: 0, backgroundColor:'rgba(0,0,0,.001)'}} className="icon-click-target" onClick={this.clickAction}></div>
        </div>);
        return (
            <div className="Icon"
                 title={this.props.title}
                 style={Iconstyle}
                 data-event-click={this.props["data-event-click"]}
                 data-event-desc={this.props["data-event-desc"]}
                 data-highlight={this.props.highlight}
                 data-name={this.props.iconid}
                 onClick={this.props.enhancedClick ? null : this.clickAction}
            >
                {this.props.enhancedClick ? enhanced : svg}
                {this.props.children}
            </div>
        )
    }
}