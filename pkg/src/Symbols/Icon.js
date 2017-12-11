"use strict"

import React from 'react'
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
    };

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            style: this.getStyles()
        };
        this.clickAction = this.clickAction.bind(this);
    }

    componentWillUpdate(props) {
        if(this.props.color !== props.color || this.props.iconid !== props.iconid) {
            this.state = {
                style: this.getStyles()
            }
        }
    }

    clickAction(e) {
        if(this.props.onClick) {
            this.props.onClick(e);
        }
    }

    getStyles() {
        const color = this.getColors()[this.props.type];
        let iconSize = '2rem';
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

        return {
            Icon: {
                display: 'inline-block',
                position: 'relative',
                cursor: this.props.onClick ? 'pointer' : 'default',
                opacity: this.props.inactive ? .5 : 1
            },
            svg: {
                fill: this.props.color ? this.props.color : color.iconColor,
                width: iconSize,
                height: iconSize,
                transition: '.5s fill'
            }
        };
    }


    render() {
        let useTag = '<use xlink:href="#' + this.props.iconid + '" />';
        let styles = this.getStyles();
        const SVGstyle = Object.assign(styles.svg, this.props.style);
        const Iconstyle = Object.assign(styles.Icon, this.props.basestyle);
        return (
            <div className={"Icon " + this.props.className}
                 title={this.props.title}
                 style={Iconstyle}
                 {...this.getDataSet(this.props)}
                 data-name={this.props.iconid}
            >
                <svg data-id={this.props["data-id"]} style={SVGstyle} viewBox="0 0 100 100"  dangerouslySetInnerHTML={{__html: useTag }} />
                { this.props.onClick && !this.props.inactive ? <div style={{position: 'absolute', cursor: 'pointer', top: 0, bottom: 0, right: 0, left: 0, backgroundColor:'rgba(0,0,0,.001)'}} className="icon-click-target" onClick={this.clickAction} {...this.getDataSet(this.props, ' clickTarget')}></div> : null }
                {this.props.children}
            </div>
        )
    }
}