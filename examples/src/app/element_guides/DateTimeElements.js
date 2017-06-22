"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {DatePicker, TimePicker, DateTimePicker} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class DatePickerElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="DatePicker"
                location="import {DatePicker} from 'zebra-stripes/Forms';"
                /*
                date: null,
                dateConstraint: [null,null], //['2013-11-05','2016-12-25'],
                dateFormat: 'ddd, MMMM D',
                depth: 1,
                disabled: false,
                errorMessage: 'Invalid Date Format (M/D/YYYY)'
                format: 'M/D/YYYY',
                manual: false,
                onSet: () => { return false; },
                placeholder: null,
                style: {},
                visible: true,
                width: '100%',
                yearFormat: 'YYYY',
                 */
                propsMap={[
                        {name: 'date',            type: 'Date',      desc: 'An array of two numbers that defines the lower and upper maximum values of the Slider.', default: '[0,100]'},
                        {name: 'dateConstraint',  type: 'Array',    desc: 'Toggle to activate and deactivate the Slider form control.', default: 'false'},
                        {name: 'dateFormat',      type: 'string',   desc: 'A callback function that takes the current value of the Slider and transforms it, to be displayed in the tooltip.', default: '(n) => { return parseInt(n, 10);\n }'},
                        {name: 'depth',           type: 'Integer',    desc: 'Size value in pixels that the handle of the slider handle, used for height and width.', default: 20},
                        {name: 'disabled',        type: 'boolean',   desc: 'Callback function when the value of the slider has changed.', default: '() => { return false; }'},
                        {name: 'errorMessage',    type: 'string',      desc: 'An array of numbers that defines the lower and upper range of the slider\'s limits.', default: '[0,100]'},
                        {name: 'format',          type: 'string',    desc: 'Number in milliseconds when the handle\'s activation is removed. This extends the ability to click the handle and activate it in setting values without drag events.', default: 'M/D/YYYY'},
                        {name: 'manual',          type: 'boolean',    desc: 'Toggle to show the tooltip containing the current value of the slider onMouseDown.', default: 'true'},
                        {name: 'onSet',           type: 'function',    desc: 'Frequency of the value in which the slider will snap to during dragging.', default: ' () => { return false; }'},
                        {name: 'placeholder',     type: 'string',     desc: 'CSS object that will override the Slider container\'s styles.', default: 'null'},
                        {name: 'style',           type: 'Object',     desc: 'The default value of where the Slider should start.', default: '{}'},
                        {name: 'visible',         type: 'boolean',     desc: 'CSS value for the width of the Slider component.' , default: 'true'},
                        {name: 'width',           type: 'string',     desc: 'CSS value for the width of the Slider component.' , default: '100%'},
                        {name: 'yearFormat',      type: 'string',     desc: 'CSS value for the width of the Slider component.' , default: 'YYYY'}
                    ]}
                colOneWidth="45%"
                colTwoWidth="55%"
                samples={[
                        {
                            desc: 'Default DatePicker Usage',
                            code:
                                'import {DatePicker} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<DatePicker/>\n',
                            example: <DatePicker/>
                        },
                        {
                            desc: 'Manual DatePicker Control',
                            code:
                                'import {DatePicker} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<DatePicker\n' +
                                '   manual={true}\n' +
                                '   date="Wed Jun 21 2017 16:49:55 GMT-0400 (EDT)"\n' +
                                '/>\n',
                            example: <DatePicker manual={true} date="Wed Jun 21 2017 16:49:55 GMT-0400 (EDT)"/>
                        }
                    ]}
                description={[
                        <p key="p1">Sliders are typically used in form elements to capture a value within a configured range. The Slider widget works on both desktop and touch-based devices, in that you can click to activate the handle node to then click anywhere along the slider track to drop the handle.</p>
                    ]}
            />
        )
    }
}


module.exports = {
    DatePickerElement: DatePickerElement,
    //RangeSliderElement: RangeSliderElement
};