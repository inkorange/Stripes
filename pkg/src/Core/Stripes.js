import React from 'react'
import {autobind} from "core-decorators";

let stripes_theme = {};
stripes_theme.palette = {};
stripes_theme.spacing = {};
stripes_theme.icons;

export function Stripes(config)
{
    /* default constructor */
    let _init = function() {
        stripes_theme.palette = config.palette;
        stripes_theme.spacing = config.spacing;
        stripes_theme.icons = config.icons;
        if(stripes_theme.icons) {
            let iconNode = document.createElement("div");
            iconNode.setAttribute("style", "height: 0; width: 0; position: absolute; display: none;");
            iconNode.innerHTML = stripes_theme.icons;
            document.body.appendChild(iconNode);
        }
    };

    _init();
}
@autobind
export class StripesTheme extends React.Component {

    constructor(props) {
        super(props);
    }

    getBaseStyling(spacing, color) {
        return {
            inputs: { // input shared styling ****************************************************
                container: {
                    display: 'inline-block',
                    position: 'relative',
                    borderBottom: (this.props.readOnly && !this.props.error) ? 'none' : spacing.underlineHeight + 'px solid ' + (this.props.error ? color.inactiveUnderErrorlineColor : color.inactiveUndlerlineColor),
                    padding: spacing.padding + 'px 0',
                    margin: spacing.padding*2 + 'px ' + spacing.padding*2 + 'px ' + spacing.padding*2 + 'px 0',
                    transition: 'all 0.3s ease-in-out 0s',
                    outline: 'none',
                    width: this.props.width ? 'calc(' + this.props.width + ' - ' + spacing.padding*2 + 'px)': 'auto'
                },
                input: {
                    fontSize: spacing.fontSize,
                    margin: 0,
                    position: 'relative',
                    color: color.textColor,
                    border: 'none',
                    outline: 'none',
                    resize: 'vertical',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    lineHeight: parseFloat(spacing.fontSize)*1.25 + 'rem',
                    cursor: this.props.onClick ? 'pointer' : 'text',
                    backgroundColor: 'transparent',
                    padding: 0,
                    width: '100%'
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
                    top: 'calc(100% + 5px)',
                    right: 0,
                    width: '100%',
                    lineHeight: '1.2rem',
                    textAlign: 'right',
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

    isIE() {
        return (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("rv:11.0") >= 0);
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

    onInputBlur() {
        this.setState({
            active: false
        });
    }

    handleClick() {
        if(!this.state.disabled && !this.props.disabled) {
            this.props.onClick();
        }
    }

    handleSwitchOnChange(e) {
        this.props.onChange(e, this.getValues());
    }

    resolveStyling(obj) {
        Object.keys(obj).map((k,v) => {
            let val = obj[k];
            console.log(val);
        });
        return obj;
    }

    getDataSet(props, embellish) {
        let dataset = {};
        Object.keys(props).filter (value => {
            if (/data-\S+/gi.test(value)) {
                dataset[value] = embellish ? props[value] + embellish : props[value];
            }
        });
        return dataset;
    }

    mouseEventProps(props) {
        let dataset = {};
        const eventList = ['onMouseDown', 'onMouseUp', 'onMouseOver', 'onMouseOut', 'onMouseEnter', 'onMouseLeave'];
        Object.keys(props).filter (value => {
            if(eventList.indexOf(value) >= 0) {
                dataset[value] = props[value];
            }
        });
        return dataset;
    }

    dimensionalObjectResolution(data, objkey) {
        let keys = objkey.split('.');
        let value = null;
        keys.map((k) => {
            value = !value ? data[k] : value[k];
        });
        return value;
    }

    hardExtend(into, extend) {
        return Object.assign(into ? JSON.parse(JSON.stringify(into)) : {}, extend ? JSON.parse(JSON.stringify(extend)) : {});
    }

    hardClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    animateBackground(e) {
        let target = e.target;
        let inkNode = target.querySelector('.ink');
        if(!inkNode) {
            return false;
        }
        let aniTiming = {
            duration: 400,
            iterations: 1
        };
        let aniExplode = [
            { opacity: 1, transform: 'scale(0)'},
            { opacity: 0, transform: 'scale(2.5)'}
        ];
        let d = Math.max(target.offsetWidth, target.offsetHeight);
        let x = e.pageX - target.getBoundingClientRect().left - inkNode.clientWidth/2;
        let y = e.pageY - target.offsetTop - inkNode.clientHeight/2 - target.getBoundingClientRect().height;
        inkNode.style.height=d + "px";
        inkNode.style.width=d + "px";
        inkNode.style.top=y + "px";
        inkNode.style.left=x + "px";
        if(inkNode.animate) {
            inkNode.animate(aniExplode, aniTiming);
        }
    }

    animateShow(node, direction) {
        let aniTiming = {
            duration: 500,
            iterations: 1,
            fill: 'both'
        };
        let aniExplode = direction ? [
            { opacity: 0},
            { opacity: 1}
        ] : [
            { opacity: 1},
            { opacity: 0}
        ];
        if(node.animate) {
            let animation = node.animate(aniExplode, aniTiming);
            animation.play();
        }
    }

    animateSlide(node, direction) {
        let aniTiming = {
            duration: 500,
            iterations: 1,
            fill: 'both'
        };
        let aniExplode = [
            { overflow: 'hidden', maxHeight: 0},
            { overflow: 'hidden', maxHeight: '200vh'}
        ];
        if(node.animate) {
            let animation = node.animate(aniExplode, aniTiming);
            animation.pause(); // must pause out of the gate or it will just run.

            if (direction) {
                animation.play();
            } else {
                animation.reverse();
            }
        }

    }

    extendChildren(children, propsObj) {
        let childrenNodes = [];
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

    for (let i = 0; i < this.length; i++) {
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