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
        shadowSize: window.innerHeight*1.5 + 'px'
    };

    constructor(props) {
        super(props);
        this.state = {
            focus: null,
            style: this.getStyles(),
            hide: true
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
            focus: ['50%','50%',window.innerWidth + 'px'],
            target: this.props.script[this.step].target,
        }, this.setStyles);
        window.addEventListener('resize', this.replayStep, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.replayStep);
    }

    replayStep() {
        if(!this.state.hide) {
            this.nextStep(this.step);
        }
    }

    start() {
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
            show: true
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
        if(location) {
            w = location[2] ? parseInt(location[2]) : '300px';
            if(target) {
                let el = document.querySelectorAll(target)[0];
                let rect = el.getBoundingClientRect();
                x = rect.left - (w - rect.width)/2;
                y = rect.top - (w - rect.height)/2;
            } else {
                x = location[0] ? 'calc(' + location[0] + ' - ' + w/2 + 'px)' : '25%';
                y = location[1] ? 'calc(' + location[1] + ' - ' + w/2 + 'px)' : '25%';
            }
        }
        return {
            x: x,
            y: y,
            w: w + 'px'
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
        if(location) {
            x = location[0];
            y = location[1];
            w = location[2] ? parseInt(location[2]) : '300px';
            fw = focus[2] ? parseInt(focus[2]) : '300px';
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
                        xOff = w + fw/2;
                        break;
                    case 'right':
                        xOff = fw/2*-1;
                        break;
                    case null:
                        xOff = w/2;
                        break;
                }

                switch(y) {
                    case 'top':
                        yOff = fw/2 + cardH;
                        break;
                    case 'bottom':
                        yOff = fw/2*-1;
                        break;
                    case null:
                        yOff = cardH/2;
                        break;
                    default:
                        break;
                }

                x = xF - xOff;
                y = yF - yOff;
                x = x+w > window.innerWidth ? (window.innerWidth - w) - window.innerWidth*.01 : x;
                x = x < 0 ? window.innerWidth*.01 : x;
                y = y+cardH > window.innerHeight ? (window.innerHeight - cardH) - window.innerHeight*.01 : y;
                y = y < 0 ? window.innerHeight*.01 : y;

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
            screen: {
                position: 'absolute',
                top: screenDimensions.y,
                left: screenDimensions.x,
                width: screenDimensions.w,
                height: screenDimensions.w,
                margin: 0,
                padding: 0,
                borderRadius: '50%',
                backgroundColor: 'transparent',
                boxShadow: '0 0 ' + this.props.shadowSize + ' ' + this.props.shadowSize + ' rgba(0,0,0,.75), 0 0 20px 5px rgba(0,0,0,.25) inset',//, -10px -10px 10px rgba(0,0,0,.15) inset',
                transition: 'all .75s cubic-bezier(0.86, 0, 0.07, 1)',
                opacity: this.state ? this.state.show ? 1 : 0 : 0
            },
            count: {
                float: 'left',
                fontSize: '90%',
                opacity: .85,
                padding: spacing.padding * 3 + 'px'
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
                    title={this.state.cardTitle}
                    actions={[
                        this.props.showStepCount ? <span key="sc" style={this.state.style.count}>{this.step + 1} of {this.props.script.length}</span> : null,
                        this.step < this.props.script.length-1 ? <FlatButton key="action1" type="secondary" onClick={this.stop}>DONE</FlatButton> : null,
                        this.step === this.props.script.length-1 ? <FlatButton key="action2" onClick={this.stop} type="secondary">DONE</FlatButton> : <FlatButton key="action2" onClick={this.nextStep} type="primary">NEXT</FlatButton>
                    ]}
                >
                    {this.state.cardSummary}
                </Card>
            </div>
        )
    }
}