"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class Slider extends StripesTheme {

    static defaultProps = {
        style: {},
        width: '100%',
        type: 'default',
        disabled: false,
        range: [0,100],
        snap: 1,
        handlesize: 20,
        showHandleValue: true,
        format: (n) => { return parseInt(n, 10); }
    }

    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
        this.pressing = this.pressing.bind(this);
        this.lifting = this.lifting.bind(this);
        this.dragging = this.dragging.bind(this);
        this.state = {
            active: false,
            value: 0,
            pressing: false,
            dragging: false,
            handleX: 0
        }
    }

    componentWillMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.updateStyles();
        }
    }

    updateStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    getValue() {
        //var offset = this.props.range[1] - this.props.range[0];
        return this.props.format((this.props.range[1] * (this.state.handleX/100)) - this.props.range[0]);
    }

    pressing(e) {
        this.setState({
            pressing: true
        }, () => {
            this.bindDragEvents();
            this.updateStyles();
        });
    }

    lifting() {
        this.setState({
            pressing: false
        }, () => {
            this.removeDragEvents();
            this.updateStyles();
        });
    }

    bindDragEvents() {
        document.addEventListener('mousemove', this.dragging);
        document.addEventListener('mouseup', this.lifting);
    }

    removeDragEvents() {
        document.removeEventListener('mousemove', this.dragging);
        document.removeEventListener('mouseup', this.lifting);
    }

    dragging(e) {
        e.stopPropagation();
        var handleX = 0;
        if(this.state.pressing) {
            var node = this.refs.slider;

            var x_on_bar = e.pageX - node.offsetLeft;
            handleX = x_on_bar * 100 / (node.offsetWidth);
            handleX = handleX < 0 ? 0 : handleX;
            handleX = handleX > 100 ? 100 : handleX;
            //console.log(node.offsetWidth, node.getBoundingClientRect().width);

        }
        this.setState({
            dragging: this.state.pressing,
            handleX: this.state.pressing ? handleX : this.state.handleX
        }, this.updateStyles);
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var styleObj = {
            container: {
                display: 'inline-block',
                margin: spacing.margin*2 + 'px',
                width: 'calc(' + this.props.width + ' - ' + spacing.margin*2 + 'px)',
                position: 'relative',
                padding: spacing.padding + 'px',
                height: this.props.handlesize + 'px'
            },
            bar: {
                height: '6px',
                backgroundColor: color.inactiveIcon,
                width: '100%',
                margin: '3px 0px',
                borderRadius: spacing.borderRadius + 'px',
                boxShadow: '0 1px 3px rgba(0,0,0,.25) inset'
            },
            handle: {
                borderRadius: '50%',
                backgroundColor: color.activeIcon,
                position: 'absolute',
                transition: 'box-shadow .25s',
                transform: 'translateX(-'+this.props.handlesize/2+'px)',
                left: this.state.handleX + '%', //'calc(' + this.state.handleX + '% - ' + ((this.state.handleX / 10) - 5) + 'px)',
                top: this.state.pressing ? '2px' : '1px',
                width: this.props.handlesize + 'px',
                height: this.props.handlesize + 'px',
                boxShadow: this.state.pressing ? '0 3px 6px rgba(0,0,0,.5), 0 2px 2px rgba(255,255,255,.25) inset' : '0 2px 5px rgba(0,0,0,.25)',
                userSelect: 'none'
            },
            value_box: {
                opacity: this.state.pressing ? '1.0' : '0',
                position: 'absolute',
                top: '-25px',
                minWidth: '50px',
                textAlign: 'center',
                left: this.state.handleX + '%',
                transform: 'translateX(-50%)',
                transition: 'opacity .25s ease-in-out .75s',
                color: 'white',
                backgroundColor: color.activeIcon,
                padding: spacing.padding + 'px',
                userSelect: 'none',
                borderRadius: spacing.borderRadius + 'px',
                fontSize: '10px'
            }
        }

        styleObj.container = Object.assign(styleObj.container, this.props.style);
        return styleObj;
    }

    render() {
        return (
            <div ref="slider"
                {...this.getDataSet(this.props)}
                style={this.state.style.container}
                onMouseDown={this.pressing}
            >
                <div style={this.state.style.bar}></div>
                <div style={this.state.style.value_box}>{this.getValue()}</div>
                <div
                    style={this.state.style.handle}
                ></div>
            </div>
        )
    }
}