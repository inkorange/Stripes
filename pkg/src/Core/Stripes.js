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
        this.extendChildren = this.extendChildren.bind(this);
        this.updateStyling = this.updateStyling.bind(this);
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
                    resize: 'vertical',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    cursor: this.props.onClick ? 'pointer' : 'default'
                },
                anchor: {
                    position: 'absolute',
                    top: '50%',
                    right: '0',
                    transform: 'translateY(-50%)',
                    cursor: this.props.onClick && !this.props.disabled ? 'pointer' : 'default'
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
            },
            animation: {
                ink: {
                    display: 'block',
                    position: 'absolute',
                    background: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '100%',
                    transform:'scale(0)'
                },
                visibility: {
                    opacity: 1.0
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

    updateStyling(trigger) {
        if(trigger) {
            this.setState({
                style: this.getStyles()
            });
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
        }, () => {
            if(this.props.onClick) {
                this.props.onClick(e);
            }
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

    flattenDate(date) {
        return date;
    }

    addTimeToDate(date, datetime, ignoreDate) {
        /*
         if the ignoreDate flag is passed in as true, it will set the binding date for the time to be 1900.
         Being 1900 has it not show in the view, this is important in cases where we want to distinguish between
         setting just a date ... or setting just a time.
         Otherwise, the date will be set to the current date when the time is set.
         */
        var m_dateTime = m(datetime);
        var m_date = m(date ? date : (ignoreDate ? new Date(1900, 0, 1) : new Date()));
        m_date.hours(m_dateTime.hours());
        m_date.minutes(m_dateTime.minutes());
        //console.log("getting time from date...   ", m_date);
        return m_date.toDate();
    }

    mergeDates(date, datewithtime) {
        if(datewithtime) {
            var m_dateTime = m(datewithtime);
            var m_date = m(date);
            m_date.hour(m_dateTime.format('HH'));
            m_date.minute(m_dateTime.format('mm'));
            return m_date.toDate();
        } else {
            return date;
        }
    }

    animateBackground(e) {
        var target = e.target;
        var inkNode = target.querySelector('.ink');
        if(!inkNode) {
            return false;
        }
        var aniTiming = {
            duration: 400,
            iterations: 1
        };
        var aniExplode = [
            { opacity: 1, transform: 'scale(0)'},
            { opacity: 0, transform: 'scale(2.5)'}
        ];
        var d = Math.max(target.offsetWidth, target.offsetHeight);
        var x = e.pageX - target.offsetLeft - inkNode.clientWidth/2;
        var y = e.pageY - target.offsetTop - inkNode.clientHeight/2;
        inkNode.style.height=d + "px";
        inkNode.style.width=d + "px";
        inkNode.style.top=y + "px";
        inkNode.style.left=x + "px";

        inkNode.animate(
            aniExplode,
            aniTiming
        );
    }

    animateShow(node, direction) {
        var aniTiming = {
            duration: 500,
            iterations: 1,
            fill: 'both'
        };
        var aniExplode = [
            { opacity: 0},
            { opacity: 1}
        ];
        var animation = node.animate(
            aniExplode,
            aniTiming
        );
        animation.pause(); // must pause out of the gate or it will just run.

        if(direction) {
            animation.play();
        } else {
            animation.reverse();
        }

    }

    extendChildren(children, propsObj) {
        var childrenNodes = [];
        React.Children.toArray(children).map((node, i) => {
            childrenNodes.push(React.cloneElement(node, Object.assign(propsObj, {key: 'nodeItem' + i, index: i})));
        });
        return childrenNodes;
    }

}

module.exports = {
    Stripes: Stripes,
    StripesTheme: StripesTheme
}