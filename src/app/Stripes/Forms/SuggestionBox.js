"use strict"

import React from 'react'
import { render } from 'react-dom'
import { StripesTheme } from '../Core/Stripes'

class SuggestionBox extends StripesTheme {
    static defaultProps = {
        style:  {},
        type: 'inputs',
        selected: null,
        data: []
    }

    constructor(props) {
        super(props);
        this.state = {
            style: {},
            value: null,
            results: [],
            show: false
        };

        this.getStyles = this.getStyles.bind(this);
        this.moveHighlight = this.moveHighlight.bind(this);
        this.applyValue = this.applyValue.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.getResults = this.getResults.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount() {
        var _this = this;
        this.setState({
            style: this.getStyles()
        });
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                    case 13 : // enter
                        _this.applyValue(null, e);
                        break;
                    case 38: // up
                        _this.moveHighlight(-1,e);
                        break;
                    case 40: // down
                        _this.moveHighlight(1,e);
                        break;
                }
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
                top: '35px',
                right: 0,
                left: 0,
                display: this.state.value && this.state.show ? 'block' : 'none',
                transition: '.3s all',
                maxHeight: this.state.value ? '500px' : '0px',
                opacity: this.state.value ? '1.0' : '0',
                background: 'white',
                padding: '10px',
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
                cursor: 'pointer',
                opacity: '0.5'
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

        if(this.state.results.length) { // only if there are results
            this.refs.result_container.focus();
            var newSelect = this.state.selected + mod;
            newSelect = newSelect < 0  ? this.state.results.length - 1 : newSelect;
            newSelect = newSelect >= this.state.results.length ? 0 : newSelect;
            this.setState({
                selected: newSelect
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    }

    applyValue(selectedid, e) {
        if(this.state.results.length) {
            selectedid = selectedid ? selectedid : this.state.selected;
            this.props.onSelect(this.state.results[selectedid]);
            this.setState({
                value: '',
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

    getResults(term) {
        if(!term) {
            return [];
        }
        term = term.toUpperCase();
        var results = [];
        this.props.data.map((v) => {
            if(v.toUpperCase().indexOf(term) >= 0) {
                results.push(v);
            }
        });

        return this.sortResults(results);
    }

    sortResults(results) {
        return results.sort(function(a,b) {return (a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0);} );
    }

    updateSearch(val) {
        var results = this.getResults(val);
        this.setState({
            value: val,
            results: results,
            selected: 0,
            show: results.length > 0
        }, () => {
            this.setState({
                style: this.getStyles()
            });
        });
    }

    render() {
        var resultsDOM = [];
        var color = this.getColors()[this.props.type];
        this.state.results.map((v, i) => {
            var activeStyling = {
                background: color.highlightColor,
                boxShadow: "2px 0 0 " + color.highlightBorderColor + " inset"
            };
            var resultslistyle = Object.assign(this.state.selected === i ? activeStyling : {}, this.state.style.resultsli);

            resultsDOM.push(<li key={"result-" + i} onClick={()=> { this.applyValue(i); }} onMouseOver={() => { this.updateSelected(i); }} data-selected={this.state.selected === i} style={resultslistyle}>
                {v}
            </li>);
        });
        return (
            <section style={this.state.style.results} tabIndex="1" ref="result_container">
                <ul style={this.state.style.resultsul}>
                    {resultsDOM}
                </ul>
                <p key="summary" style={this.state.style.resultsp}>There are {this.state.results ? this.state.results.length : 'NO'} results</p>
            </section>
        )
    }

}

module.exports = {
    SuggestionBox: SuggestionBox
}