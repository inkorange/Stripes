import React from 'react'
import { render } from 'react-dom'

let palette = {}
let spacing = {}

export function Stripes(config)
{
    /* default constructor */
    var _init = function() {
        palette = config.palette;
        spacing = config.spacing;
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
        this.onInputClick = this.onInputClick.bind(this);
        this.onInputBlur = this.onInputBlur.bind(this);
        this.getBaseStyling = this.getBaseStyling.bind(this);
    }

    getBaseStyling(spacing, color) {
        return {
            inputs: { // input shared styling ****************************************************
                container: {
                    display: 'inline',
                    position: 'relative',
                    borderBottom: spacing.underlineHeight + 'px solid ' + (this.props.error ? color.inactiveUnderErrorlineColor : color.inactiveUndlerlineColor),
                    paddingBottom: (spacing.margin * 2) + 'px',
                    transition: 'all 0.3s ease-in-out 0s'
                },
                input: {
                    fontSize: spacing.fontSize,
                    padding: (spacing.margin * 1.5) + 'px ' + spacing.margin * +'px',
                    color: color.textColor,
                    border: 'none',
                    outline: 'none',
                    width: this.props.width,
                    resize: 'vertical'
                },
                active: {
                    base: {
                        position: 'absolute',
                        width: '100%',
                        height: spacing.underlineHeight + 'px',
                        bottom: '-' + spacing.underlineHeight + 'px',
                        left: 0,
                        backgroundColor: this.props.error ? color.underErrorlineColor : color.underlineColor,
                        transition: 'all 0.3s ease-in-out 0s'

                    },
                    on: {
                        visibility: 'visible',
                        transform: 'scaleX(1)'
                    },
                    off: {
                        visibility: 'hidden',
                        transform: 'scaleX(0)'
                    }
                },
                error: {
                    display: this.props.error ? 'block' : 'none',
                    fontSize: spacing.errorFontSize,
                    position: 'absolute',
                    bottom: (spacing.margin * -4) + 'px',
                    right: 0,
                    maxWidth: '100%',
                    color: color.underErrorlineColor
                }
            }
        }
    }

    getTheme() {
        return {
            palette: palette,
            spacing: spacing
        }
    }

    getColors() {
        return palette;
    }

    getSpacing() {
        return spacing;
    }

    mouseOver() {
        this.setState({hover: true});
    }

    mouseOut() {
        this.setState({hover: false});
    }

    onInputClick(e) {
        this.setState({
            active: true
        });
    }

    onInputBlur(e) {
        this.setState({
            active: false
        });
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