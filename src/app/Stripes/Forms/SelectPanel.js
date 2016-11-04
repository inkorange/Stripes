"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class SelectPanel extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
        selected: null,
        showSummary: false,
        data: [],
        onClose: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            style: {},
            value: null,
            show: false
        };

        this.state = {
            style: this.getStyles()
        };

        this.getStyles = this.getStyles.bind(this);
        this.moveHighlight = this.moveHighlight.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.keyboardListeners = this.keyboardListeners.bind(this);
    }

    componentDidMount() {
        this.setState({
            style: this.getStyles()
        });
    }

    componentDidUpdate(props) {
        if(props !== this.props) {
            this.setState({
                style: this.getStyles()
            });
        }
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];

        var styleObj = {
            results: {
                position: 'absolute',
                top: '32px',
                right: 0,
                left: 0,
                transition: 'all .3s',
                maxHeight: this.state.show ? '500px' : '0px',
                overflow: 'hidden',
                opacity: this.state.show ? '1.0' : '0.25',
                background: 'white',
                padding: this.state.show ? '10px' : '0 10px',
                fontSize: '1.6rem',
                zIndex: 2,
                borderRadius: '0 0 2px 2px',
                boxShadow: '0 2px 10px rgba(0,0,0,.5)',
                outline: 'none'
            },
            resultsul: {
                listStyle: 'none',
                margin: 0,
                padding: 0,
                maxHeight: '300px',
                overflow: 'auto'
            },
            resultsli: {
                padding: '10px',
                margin: '0',
                cursor: 'pointer'
            },
            resultsp: {
                color: 'black',
                padding: '15px 15px 5px 15px',
                margin: '10px -10px 0 -10px',
                borderTop: '1px solid ' + color.borderColor
            }
        };
        return styleObj;
    }

    moveHighlight(mod, e) {
        if(this.props.data.length) { // only if there are results
            this.refs.panelcontainer.focus();
            var newSelect = this.state.selected + mod;
            newSelect = newSelect < 0  ? this.props.data.length - 1 : newSelect;
            newSelect = newSelect >= this.props.data.length ? 0 : newSelect;
            this.setState({
                selected: newSelect
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }

    applyValue(selectedid, e) {
        if(this.props.data.length) {
            selectedid = selectedid ? selectedid : this.state.selected;
            this.props.onSelect(this.props.data[selectedid]);
            this.setState({
                value: this.props.data[selectedid].label,
                show: false
            }, () => {
                this.setState({
                    style: this.getStyles()
                });
            });
        }
    }

    updateSelected(newSelect) {
        this.setState({
            selected: newSelect
        });
    }

    keyboardListeners(e) {
        switch (e.keyCode) {
            case 13 : // enter
                this.applyValue(null, e);
                break;
            case 38: // up
                this.moveHighlight(-1,e);
                break;
            case 40: // down
                this.moveHighlight(1,e);
                break;
        }
    }

    open(willFocus) {
        this.setState({
            show: true
        }, () => {
            if (willFocus === undefined || willFocus) {
                this.refs.panelcontainer.focus();
            }
            window.addEventListener('keydown', this.keyboardListeners);
        });

    }

    close() {
        this.setState({
            show: false
        }, () => {
            this.props.onClose();
            this.setState({
                style: this.getStyles()
            });
        });
        window.removeEventListener('keydown', this.keyboardListeners);
    }

    render() {
        var resultsDOM = [];
        var color = this.getColors()[this.props.type];
        this.props.data.map((v, i) => {
            var activeStyling = {
                background: color.highlightColor,
                boxShadow: "2px 0 0 " + color.highlightBorderColor + " inset"
            };
            var resultslistyle = Object.assign(this.state.selected === i ? activeStyling : v.value ? {} : {opacity: '.5'}, this.state.style.resultsli);

            resultsDOM.push(<li key={"item-" + i} onClick={()=> { this.applyValue(i); }} onMouseOver={() => { this.updateSelected(i); }} data-selected={this.state.selected === i} style={resultslistyle}>
                {v.label}
            </li>);
        });

        var summaryNode = this.props.showSummary ? (<p key="summary" style={this.state.style.resultsp}>There are {this.props.data ? this.props.data.length : 'NO'} results</p>) : null;
        return (
            <section style={this.state.style.results} className="SelectPanel" tabIndex="1" ref="panelcontainer" onBlur={this.close}>
                <ul style={this.state.style.resultsul}>
                    {resultsDOM}
                </ul>
                {summaryNode}
            </section>
        )
    }

}
