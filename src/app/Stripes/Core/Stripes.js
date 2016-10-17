import React from 'react'
import { render } from 'react-dom'

let palette = {}
let spacing = {}
let component = {}

export function Stripes(config)
{
    /* default constructor */
    var _init = function() {
        palette = config.palette;
        spacing = config.spacing;
        component = config.component;
    };

    _init();
}

export class StripesTheme extends React.Component {

    constructor(props) {
        super(props);
        this.getTheme = this.getTheme.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.resolveStyling = this.resolveStyling.bind(this);
    }

    getTheme() {
        return {
            palette: palette,
            spacing: spacing,
            component: component
        }
    }

    getColors() {
        return palette;
    }

    getSpacing() {
        return spacing;
    }

    getComponentStyle(componentType) {
        return component[componentType] ? component[componentType] : {};
    }

    mouseOver() {
        this.setState({hover: true});
    }

    mouseOut() {
        this.setState({hover: false});
    }

    handleClick() {
        if(!this.state.disabled) {
            this.props.onClick();
        }
    }

    resolveStyling(obj) {
        Object.keys(obj).map((k,v) => {
            var val = obj[k];
            console.log(val);
        });
        return obj;
    }

}

module.exports = {
    Stripes: Stripes,
    StripesTheme: StripesTheme
}