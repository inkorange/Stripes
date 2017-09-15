"use strict"

import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

export class SelectPanel extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
        showSummary: false,
        data: [],
        show: false,
        width: null,
        dropOffset: null,
        onClose: () => {}
    }

    constructor(props) {
        super(props);

        var initialSelected = 0;
        props.data.map((v, i) => {
            if(v.checked) {
                initialSelected = i;
            }
        });

        this.getStyles = this.getStyles.bind(this);
        this.moveHighlight = this.moveHighlight.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.keyboardListeners = this.keyboardListeners.bind(this);

        this.state = {
            style: {},
            value: null,
            show: props.show,
            selected: null,
            isBeyond: null
        };
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

    withinFixed(el) {
        var isFixed = false;
        var scrollTop = 0;
        var top = 0;
        do  {
            el = el.parentElement;
            if(el) {
                scrollTop += el.scrollTop;
                top = el.offsetTop;
                if (window.getComputedStyle(el).getPropertyValue('position').toLowerCase() === 'fixed') {
                    isFixed = true;
                }
            }
        } while (el);
        return {fixed: isFixed, top: top, scrollTop: scrollTop};
    }

    getStyles() {
        var color = this.getColors()[this.props.type];
        var spacing = this.getSpacing()[this.props.type];
        var parent = this.refs.panelcontainer.parentElement;
        var parentClient = parent.getBoundingClientRect();
        var parentHeight = parentClient.top + (this.props.dropOffset ? this.props.dropOffset : spacing.dropDownOffset);
        var parentLeft = parentClient.left;
        var resultHeight = this.refs.resultList.offsetHeight + 20;
        var isFixedDom = this.withinFixed(this.refs.panelcontainer.parentElement);

        var top = parentHeight + spacing.dropDownOffset;
        if(isFixedDom.fixed) {
            top = parent.offsetTop + spacing.dropDownOffset + parentClient.height - isFixedDom.scrollTop;
        } else {
            top = top + resultHeight > window.innerHeight ? window.innerHeight - resultHeight : parentHeight;
        }
        var styleObj = {
            results: {
                position: 'fixed',
                top: top + 'px',
                maxWidth: this.props.width,
                width: this.props.width ? this.props.width : parentClient.width + 'px',
                left: isFixedDom.fixed ? parent.offsetLeft + 'px' : parentLeft + 'px',
                transition: 'opacity .3s, max-height .3s',
                maxHeight: this.state.show ? '500px' : '0px',
                overflow: 'hidden',
                opacity: this.state.show ? '1.0' : '0.25',
                background: 'white',
                padding: this.state.show ? '10px' : '0 10px',
                fontSize: '1.6rem',
                zIndex: spacing.menuZIndex,
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
                padding: spacing.padding*2 + 'px',
                margin: '0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                lineHeight: spacing.padding*4 + 'px',
                textAlign: 'left',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
            resultsp: {
                color: 'black',
                padding: spacing.padding*3 + 'px '+spacing.padding*3+'px '+spacing.padding+'px '+spacing.padding*3+'px',
                margin: spacing.margin*2 + 'px -'+spacing.margin*2+'px 0 -'+spacing.margin*2+'px',
                borderTop: '1px solid ' + color.borderColor
            },
            resultsliSelected: {
                fontWeight: '600',
                color: 'red'
            }
        };
        styleObj.activeli = Object.assign({
            background: color.highlightColor,
            boxShadow: "2px 0 0 " + color.highlightBorderColor + " inset"
        }, styleObj.resultsli);
        styleObj.resultsliSelected = Object.assign({
            fontWeight: '600',
            color: color.highlightBorderColor
        }, styleObj.resultsli);
        //console.log((parentHeight + spacing.dropDownOffset) + 'px', this.props.style);
        styleObj.results = Object.assign(styleObj.results, this.props.style);

        return styleObj;
    }

    moveHighlight(mod, e) {
        if(this.props.data.length) { // only if there are results
            this.refs.panelcontainer.focus();
            var newSelect = this.state.selected !== null ? this.state.selected + mod : 0;
            newSelect = newSelect < 0  ? this.props.data.length - 1 : newSelect;
            newSelect = newSelect >= this.props.data.length ? 0 : newSelect;
            this.setState({
                selected: newSelect
            }, () => {
                this.refs.panelcontainer.getElementsByTagName("LI")[newSelect].scrollIntoView({block: "end", behavior: "smooth"});
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }

    applyValue(selectedid, e) {
        if(this.props.data.length) {
            selectedid = selectedid !== null ? selectedid : this.state.selected;
            if(selectedid == null) {
                return false;
            }
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
            show: true,
            selected: null
        }, () => {
            var El = ReactDOM.findDOMNode(this.refs.panelcontainer).getBoundingClientRect();
            this.setState({
                isBeyond: (El.left + El.width > window.innerWidth) ? (El.left + El.width) - window.innerWidth : null
            }, () => {
                if(this.state.isBeyond) {
                    this.setState({
                        style: this.getStyles()
                    });
                }
            });
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
        this.props.data.map((v, i) => {
            var resultslistyle = this.state.style.resultsli;
            if(v.checked) {
                resultslistyle = this.state.style.resultsliSelected;
            }
            if(this.state.selected === i) {
                resultslistyle = this.state.style.activeli;
            }
            resultsDOM.push(
                <li key={"item-" + i}
                    onClick={()=> { this.applyValue(i); }}
                    onMouseOver={() => { this.updateSelected(i); }}
                    style={resultslistyle}
                    {...this.getDataSet(v)}
                >
                {v.label}
            </li>);
        });

        var summaryNode = this.props.showSummary ? (<p key="summary" style={this.state.style.resultsp}>There are {this.props.data ? this.props.data.length : 'NO'} results</p>) : null;
        return (
            <section {...this.getDataSet(this.props)} style={this.state.style.results} className="SelectPanel" tabIndex="1" ref="panelcontainer" onBlur={this.close}>
                <ul ref="resultList" style={this.state.style.resultsul}>
                    {resultsDOM}
                </ul>
                {summaryNode}
            </section>
        )
    }

}
