"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Slider, RangeSlider} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class SliderElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="Slider"
                location="import {Slider} from 'zebra-stripes/Forms';"
                propsMap={[
                        {name: 'constraint',            type: 'Array',      desc: 'An array of two numbers that defines the lower and upper maximum values of the Slider.', default: '[0,100]'},
                        {name: 'disabled',              type: 'boolean',    desc: 'Toggle to activate and deactivate the Slider form control.', default: 'false'},
                        {name: 'format',                type: 'function',   desc: 'A callback function that takes the current value of the Slider and transforms it, to be displayed in the tooltip.', default: '(n) => { return parseInt(n, 10);\n }'},
                        {name: 'handlesize',            type: 'Integer',    desc: 'Size value in pixels that the handle of the slider handle, used for height and width.', default: 20},
                        {name: 'onChange',              type: 'function',   desc: 'Callback function when the value of the slider has changed.', default: '() => { return false; }'},
                        {name: 'range',                 type: 'Array',      desc: 'An array of numbers that defines the lower and upper range of the slider\'s limits.', default: '[0,100]'},
                        {name: 'removeActivateTimeout', type: 'Integer',    desc: 'Number in milliseconds when the handle\'s activation is removed. This extends the ability to click the handle and activate it in setting values without drag events.', default: '2000'},
                        {name: 'showHandleValue',       type: 'boolean',    desc: 'Toggle to show the tooltip containing the current value of the slider onMouseDown.', default: 'true'},
                        {name: 'snap',                  type: 'Integer',    desc: 'Frequency of the value in which the slider will snap to during dragging.', default: 1},
                        {name: 'style',                 type: 'object',     desc: 'CSS object that will override the Slider container\'s styles.', default: '{}'},
                        {name: 'value',                 type: 'number',     desc: 'The default value of where the Slider should start.', default: 0},
                        {name: 'width',                 type: 'string',     desc: 'CSS value for the width of the Slider component.' , default: '100%'},
                    ]}
                colOneWidth="55%"
                colTwoWidth="45%"
                samples={[
                        {
                            desc: 'Default Slider Usage',
                            code:
                                'import {Slider} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Slider/>\n',
                            example: <Slider/>
                        },
                        {
                            desc: 'Slider with Width and Constraints',
                            code:
                                'import {Slider} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Slider\n'+
                                '    width="75%"\n'+
                                '    constraint={[0,75]}>\n' +
                                '\>',
                            example: <Slider width="75%" constraint={[0,75]} />
                        },
                        {
                            desc: 'Slider with Data Formatting',
                            code:
                                'import {Slider} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Slider\n'+
                                '    range={[0,50]}\n'+
                                '    format={(d) => { return Math.floor(d) + " of 50"; }}\n'+
                                '\>',
                            example: <Slider range={[0,50]} format={(d) => { return Math.floor(d) + " of 50"; }} />
                        }
                    ]}
                description={[
                        <p key="p1">Sliders are typically used in form elements to capture a value within a configured range. The Slider widget works on both desktop and touch-based devices, in that you can click to activate the handle node to then click anywhere along the slider track to drop the handle.</p>
                    ]}
            />
        )
    }
}

export class RangeSliderElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="RangeSlider"
                location="import {RangeSlider} from 'zebra-stripes/Forms';"
                propsMap={[
                        {name: 'constraint',            type: 'Array',      desc: 'An array of two numbers that defines the lower and upper maximum values of the Slider.', default: '[0,100]'},
                        {name: 'disabled',              type: 'boolean',    desc: 'Toggle to activate and deactivate the Slider form control.', default: 'false'},
                        {name: 'format',                type: 'function',   desc: 'A callback function that takes the current value of the Slider and transforms it, to be displayed in the tooltip.', default: '(n) => { return parseInt(n, 10);\n }'},
                        {name: 'handlesize',            type: 'Integer',    desc: 'Size value in pixels that the handle of the slider handle, used for height and width.', default: 20},
                        {name: 'isUnlimited',           type: 'boolean',    desc: 'Toggles if a checkbox should be automatically checked to make the upper limit the value of Infinity.', default: 'false'},
                        {name: 'onChange',              type: 'function',   desc: 'Callback function when the value of the slider has changed.', default: '() => { return false; }'},
                        {name: 'range',                 type: 'Array',      desc: 'An array of numbers that defines the lower and upper range of the slider\'s limits.', default: '[0,100]'},
                        {name: 'showHandleValue',       type: 'boolean',    desc: 'Toggle to show the tooltip containing the current value of the slider onMouseDown.', default: 'true'},
                        {name: 'showUnlimited',         type: 'boolean',    desc: 'Toggles if a checkbox should show to allow the upper limit to be locked. Once clicked it sets the upper limit to be value of Infinity.', default: 'false'},
                        {name: 'snap',                  type: 'Integer',    desc: 'Frequency of the value in which the slider will snap to during dragging.', default: 1},
                        {name: 'style',                 type: 'object',     desc: 'CSS object that will override the Slider container\'s styles.', default: '{}'},
                        {name: 'unlimitedStyle',        type: 'object',     desc: 'CSS object that will override the styles on the unlimited toggle elements.', default: '{}'},
                        {name: 'value',                 type: 'number',     desc: 'The default value of where the Slider should start.', default: 0},
                        {name: 'width',                 type: 'string',     desc: 'CSS value for the width of the Slider component.' , default: '100%'},
                    ]}
                colOneWidth="55%"
                colTwoWidth="45%"
                samples={[
                        {
                            desc: 'Default RangeSlider Usage',
                            code:
                                'import {RangeSlider} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<RangeSlider/>\n',
                            example: <RangeSlider/>
                        },
                        {
                            desc: 'RangeSlider with Width and Constraints',
                            code:
                                'import {RangeSlider} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<RangeSlider\n'+
                                '    width="75%"\n'+
                                '    constraint={[0,75]}>\n' +
                                '\>',
                            example: <RangeSlider width="75%" constraint={[0,75]} />
                        },
                        {
                            desc: 'RangeSlider with Unlimited Toggle',
                            code:
                                'import {RangeSlider} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<RangeSlider\n'+
                                '    showUnlimited={true}\n'+
                                '    isUnlimited={true}\n'+
                                '\>',
                            example: <RangeSlider showUnlimited={true} isUnlimited={true} />
                        }
                    ]}
                description={[
                        <p key="p1">RangeSlider components that are used to select a numerical range. This component enforces a lower and upper limit, making sure that the user cannot select a low value higher than the high value.</p>
                    ]}
            />
        )
    }
}

module.exports = {
    SliderElement: SliderElement,
    RangeSliderElement: RangeSliderElement
};