import React from 'react'
import { render } from 'react-dom'

let stripes_theme = {};
stripes_theme.palette = {};
stripes_theme.spacing = {};
stripes_theme.icons;

export function Stripes(config)
{
    /* default constructor */
    var _init = function() {
        stripes_theme.palette = config.palette;
        stripes_theme.spacing = config.spacing;
        stripes_theme.icons = config.icons;
        if(stripes_theme.icons) {
            var iconNode = document.createElement("div");
            iconNode.setAttribute("style", "height: 0; width: 0; position: absolute; display: none;");
            iconNode.innerHTML = stripes_theme.icons;
            document.body.appendChild(iconNode);
        }
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
        this.handleSwitchOnChange = this.handleSwitchOnChange.bind(this);
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
                    cursor: this.props.onClick ? 'pointer' : 'text',
                    backgroundColor: color.inputBackground
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
            palette: stripes_theme.palette,
            spacing: stripes_theme.spacing
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
        return stripes_theme.palette;
    }

    getSpacing() {
        return stripes_theme.spacing;
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

    handleSwitchOnChange(e) {
        this.props.onChange(e, this.getValues()[0]);
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

    getDataSet(props, embellish) {
        var dataset = {};
        Object.keys(props).filter (value => {
            if (/data-\S+/gi.test(value)) {
                dataset[value] = embellish ? props[value] + embellish : props[value];
            }
        });
        return dataset;
    }

    mouseEventProps(props) {
        var dataset = {};
        var eventList = ['onMouseDown', 'onMouseUp', 'onMouseOver', 'onMouseOut', 'onMouseEnter', 'onMouseLeave'];
        Object.keys(props).filter (value => {
            if(eventList.indexOf(value) >= 0) {
                dataset[value] = props[value];
            }
        });
        return dataset;
    }

    dimensionalObjectResolution(data, objkey) {
        var keys = objkey.split('.');
        var value = null;
        keys.map((k) => {
            value = !value ? data[k] : value[k];
        });
        return value;
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
        //var x = e.pageX - target.offsetLeft - inkNode.clientWidth/2;
        //console.log(e.pageY, target.offsetTop, target.getBoundingClientRect());
        var x = e.pageX - target.getBoundingClientRect().left - inkNode.clientWidth/2;
        var y = e.pageY - target.offsetTop - inkNode.clientHeight/2 - target.getBoundingClientRect().height;
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
        var aniExplode = direction ? [
            { opacity: 0},
            { opacity: 1}
        ] : [
            { opacity: 1},
            { opacity: 0}
        ];
        var animation = node.animate(
            aniExplode,
            aniTiming
        );
        //animation.pause(); // must pause out of the gate or it will just run.
        animation.play();
    }

    animateSlide(node, direction) {
        var aniTiming = {
            duration: 500,
            iterations: 1,
            fill: 'both'
        };
        var aniExplode = [
            { overflow: 'hidden', maxHeight: 0},
            { overflow: 'hidden', maxHeight: '100vh'}
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

Array.prototype.equals = function (array, strict) {
    if (!array)
        return false;

    if (arguments.length == 1)
        strict = true;

    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i], strict))
                return false;
        }
        else if (strict && this[i] != array[i]) {
            return false;
        }
        else if (!strict) {
            return this.sort().equals(array.sort(), true);
        }
    }
    return true;
}

module.exports = {
    Stripes: Stripes,
    StripesTheme: StripesTheme
}