"use strict";

import React from 'react'
import ReactDOM from 'react-dom'
import { StripesTheme } from '../Core/Stripes'
import {Card} from '../Layouts'
import {FlatButton} from '../Forms'

export class Tour extends StripesTheme {

    static defaultProps = {
        script: [],
        zIndex: 1,
        type: 'default',
        showStepCount: true,
        onStart: () => { return false; },
        onStop: () => { return false; },
    };

    constructor(props) {
        super(props);
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.state = {
            focus: null,
            style: this.getStyles(),
            hide: true,
            shadowSize: Math.max(this.windowHeight,this.windowWidth)*1.5 + 'px'
        };
        this.step = 0;
        this.start = this.start.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.stop = this.stop.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.setStyles = this.setStyles.bind(this);
        this.replayStep = this.replayStep.bind(this);
        this.resolveCardDimensions = this.resolveCardDimensions.bind(this);
        this.resolveFocusDimensions = this.resolveFocusDimensions.bind(this);
    }

    componentDidMount() {
        this.setState ({
            cardTitle: this.props.script[this.step].title,
            cardSummary: this.props.script[this.step].summary,
            cardLocation: this.props.script[this.step].location,
            focus: ['50%','50%',this.windowWidth + 'px'],
            target: this.props.script[this.step].target,
            shadowSize: this.windowHeight*1.5 + 'px'
        }, this.setStyles);
        window.addEventListener('resize', this.replayStep, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.replayStep);
    }

    replayStep() {
        if(!this.state.hide) {
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            this.nextStep(this.step);
        }
    }

    start() {
        this.props.onStart();
        this.setState({
            hide: false
        }, () => {
            this.setStyles();
            setTimeout(() => {
                this.nextStep(0);
            }, 200);
        })
    }

    stop() {
        this.setState({
            show: false
        }, this.setStyles);
        setTimeout(() => {
            this.setState({
                hide: true
            }, this.setStyles);
            this.props.onStop();
        }, 500);
    }

    nextStep(step) {
        this.step = step === undefined ? this.step + 1 :  step;
        this.setState({
            cardTitle: this.props.script[this.step].title,
            cardSummary: this.props.script[this.step].summary,
            cardLocation: this.props.script[this.step].location,
            focus: this.props.script[this.step].focus,
            target: this.props.script[this.step].target,
            show: true,
            shadowSize: Math.max(this.windowHeight,this.windowWidth)*1.5 + 'px'
        }, this.setStyles);
    }

    setStyles() {
        this.setState({
            style: this.getStyles()
        });
    }

    resolveFocusDimensions() {
        let location = this.state ? this.state.focus : null;
        let target = this.state ? this.state.target : null;
        let x = 0;
        let y = 0;
        let w = 0;
        let h = 0;
        if(location) {
            w = location[2] ? parseInt(location[2]) : '300px';
            h = location[3] ? parseInt(location[3]) : w;
            if(target) {
                let el = document.querySelectorAll(target)[0];
                let rect = el.getBoundingClientRect();
                x = rect.left - (w - rect.width)/2;
                y = rect.top - (h - rect.height)/2;
            } else {
                x = location[0] ? 'calc(' + location[0] + ' - ' + w/2 + 'px)' : '25%';
                y = location[1] ? 'calc(' + location[1] + ' - ' + h/2 + 'px)' : '25%';
            }
        }
        return {
            x: x,
            y: y,
            w: w + 'px',
            h: h + 'px'
        }
    }

    resolveCardDimensions() {
        let location = this.state ? this.state.cardLocation : null;
        let target = this.state ? this.state.target : null;
        let focus = this.state ? this.state.focus : null;
        let x = 0;
        let y = 0;
        let w = 0;
        let fw = 0;
        let fh = 0;
        if(location) {
            x = location[0];
            y = location[1];
            w = location[2] ? parseInt(location[2]) : '300px';
            fw = focus[2] ? parseInt(focus[2]) : '300px';
            fh = focus[3] ? parseInt(focus[3]) : fw;
            if(target) {
                let el = document.querySelectorAll(target)[0];
                let rect = el.getBoundingClientRect();
                let xOff = 0;
                let yOff = 0;
                let xF = rect.left + rect.width/2;
                let yF = rect.top + rect.height/2;
                let cardH = ReactDOM.findDOMNode(this.refs.tourCard).offsetHeight;
                switch(x) {
                    case 'left':
                        xOff = w + fw/2 + this.windowWidth*.01;
                        break;
                    case 'right':
                        xOff = fw/2*-1 - this.windowWidth*.01;
                        break;
                    case null:
                        xOff = w/2;
                        break;
                }

                switch(y) {
                    case 'top':
                        yOff = fh/2 + cardH + this.windowHeight*.01;
                        break;
                    case 'bottom':
                        yOff = fh/2*-1 - this.windowHeight*.01;
                        break;
                    case null:
                        yOff = cardH/2;
                        break;
                    default:
                        break;
                }

                x = xF - xOff;
                y = yF - yOff;
                x = x+w > this.windowWidth ? (this.windowWidth - w) - this.windowWidth*.01 : x;
                x = x < 0 ? this.windowWidth*.01 : x;
                y = y+cardH > this.windowHeight ? (this.windowHeight - cardH) - this.windowHeight*.01 : y;
                y = y < 0 ? this.windowHeight*.01 : y;

            } else {
                x = location[0] ? location[0] : '25%';
                y = location[1] ? location[1] : '25%';
            }
        }
        return {
            x: x,
            y: y,
            w: w + 'px'
        }
    }

    getStyles() {
        let cardDimensions = this.resolveCardDimensions();
        let screenDimensions = this.resolveFocusDimensions();
        const spacing = this.getSpacing()[this.props.type];
        return {
            base: {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                transition: 'opacity .5s',
                display: this.state ? this.state.hide ? 'none' : 'block' : 'none',
                opacity: this.state ? this.state.show ? 1 : 0 : 0,
                zIndex: this.props.zIndex,
                margin: 0,
                padding: 0
            },
            card: {
                position: 'absolute',
                top: cardDimensions.y,
                left: cardDimensions.x,
                width: cardDimensions.w,
                transition: 'all .5s .25s',
                opacity: this.state ? this.state.show ? 1 : 0 : 0,
                margin: 0
            },
            cardFooter: {
                padding: 0
            },
            screen: {
                position: 'absolute',
                top: screenDimensions.y,
                left: screenDimensions.x,
                width: screenDimensions.w,
                height: screenDimensions.h,
                margin: 0,
                padding: 0,
                borderRadius: '50%',
                backgroundColor: 'transparent',
                boxShadow: '0 0 ' + (this.state ? this.state.shadowSize : '2000px') + ' ' + (this.state ? this.state.shadowSize : '2000px') + ' rgba(0,0,0,.75), -3px -3px 15px rgba(0,0,0,.45) inset',
                transition: 'all .75s cubic-bezier(0.86, 0, 0.07, 1)',
                opacity: this.state ? this.state.show ? 1 : 0 : 0
            },
            count: {
                position: 'absolute',
                top: 0,
                right: 0,
                fontSize: '90%',
                opacity: .85,
                padding: spacing.padding*5+2 + 'px ' + spacing.padding*4 + 'px 0 0'
            }
        };
    }




    render() {
        return (
            <div className={this.props.className} style={this.state.style.base}>
                <div key="screen" style={this.state.style.screen}></div>
                <Card
                    key="card"
                    ref="tourCard"
                    style={this.state.style.card}
                    footerStyle={this.state.style.cardFooter}
                    title={this.state.cardTitle}
                    actions={[
                        this.props.showStepCount ? <span key="sc" style={this.state.style.count}>{this.step + 1} of {this.props.script.length}</span> : null,
                        this.step < this.props.script.length-1 ? <FlatButton key="action1" onClick={this.stop}>DONE</FlatButton> : null,
                        this.step === this.props.script.length-1 ? <FlatButton key="action2" onClick={this.stop}>DONE</FlatButton> : <FlatButton key="action2" onClick={this.nextStep}>NEXT</FlatButton>
                    ]}
                >
                    {this.state.cardSummary}
                </Card>
            </div>
        )
    }
}