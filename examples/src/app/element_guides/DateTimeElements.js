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

                propsMap={[
                        {name: 'baseDateTime',    type: 'Date',     desc: 'Used to set the local date/time, typically from a server. If this is not set, it will use the client\'s datetime.', default: 'new Date()'},
                        {name: 'date',            type: 'Date',     desc: 'The initial date value of the Date selector.', default: 'null'},
                        {name: 'dateConstraint',  type: 'Array',    desc: 'An array of dates that the Date picker will be forced to choose between.', default: 'false'},
                        {name: 'dateFormat',      type: 'string',   desc: 'The date format displayed in the header of the DatePicker dialog.', default: 'ddd, MMMM D'},
                        {name: 'disabled',        type: 'boolean',  desc: 'Toggle to disable the form form accepting inputs.', default: 'false'},
                        {name: 'errorMessage',    type: 'string',   desc: 'The error message that is shown when a bad date is entered into the form.', default: 'Invalid Date Format (M/D/YYYY)'},
                        {name: 'format',          type: 'string',   desc: 'The date format that the set value is displayed within the input field.', default: 'M/D/YYYY'},
                        {name: 'manual',          type: 'boolean',  desc: 'Toggle that, when set, allows the user to manually enter a date in the input field. By default, clicking the input will launch the DatePicker dialog.', default: 'false'},
                        {name: 'onSet',           type: 'function', desc: 'Callback function fired when the date value is changed.', default: '() => { return false; }'},
                        {name: 'placeholder',     type: 'string',   desc: 'The default placeholder text when there is no value entered.', default: 'null'},
                        {name: 'style',           type: 'object',   desc: 'Style object that will override the component\'s container', default: '{}'},
                        {name: 'width',           type: 'string',   desc: 'The css property value for the width of the DatePicker input.', default: '100%'},
                        {name: 'yearFormat',      type: 'string',   desc: 'The year format to be displayed on the Year picker dialog.', default: 'YYYY'}
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
                            desc: 'Manual DatePicker Control with a Set Value',
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
                        <p key="p1">Date pickers are used as form elements to select date values through the use of a Material design-like GUI. The component has configurations to enable the user to manually add date, if they do not choose to use the picker.</p>,
                        <p key="p2">The component will attempt to resolve entered date, and convert that value into a date object.</p>
                    ]}
            />
        )
    }
}

export class TimePickerElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="TimePicker"
                location="import {TimePicker} from 'zebra-stripes/Forms';"

                propsMap={[
                        {name: 'baseDateTime',    type: 'Date',     desc: 'Used to set the local date/time, typically from a server. If this is not set, it will use the client\'s datetime.', default: 'new Date()'},
                        {name: 'clockFormat',   type: 'string',    desc: 'Sets the clock selector to be in 12hr, or 24hr (Military) time format.', default: '12hr'},
                        {name: 'disabled',      type: 'boolean',   desc: 'Toggle to disables the form to be interacted with.', default: 'false'},
                        {name: 'errorMessage',  type: 'string',    desc: 'The error message line thrown when the inputted time is invalid.', default: 'Invalid Time Format (h:mm A)'},
                        {name: 'format',        type: 'string',    desc: 'The number format that will display on the input once a value is submitted.', default: 'h:mm A'},
                        {name: 'hourFormat',    type: 'string',    desc: 'The hour format displayed on the dialog header panel.', default: 'h'},
                        {name: 'minuteFormat',  type: 'string',    desc: 'The minute format displayed on the dialog header panel.', default: 'mm'},
                        {name: 'manual',        type: 'boolean',   desc: 'Toggle to enable the input to be manually entered, keeping this false will launch the Time selector when the user clicks the input.', default: 'false'},
                        {name: 'onSet',         type: 'function',  desc: 'Callback function fired when the value of the Time picker is changed.', default: ' () => { return false; }'},
                        {name: 'placeholder',   type: 'string',    desc: 'The placeholder string shown when no value is entered.', default: 'Time'},
                        {name: 'style',         type: 'object',    desc: 'Style overrides for the container of the Time picker.', default: '{}'},
                        {name: 'time',          type: 'string',    desc: 'The initial time value, in date string format', default: 'null'},
                        {name: 'width',         type: 'string',    desc: 'CSS value for the width of the Time component.' , default: '100%'},
                    ]}
                colOneWidth="45%"
                colTwoWidth="55%"
                samples={[
                        {
                            desc: 'Default TimePicker Usage',
                            code:
                                'import {TimePicker} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TimePicker/>\n',
                            example: <TimePicker/>
                        },
                        {
                            desc: 'Manual TimePicker Control with a Set Value and 24hr Clock',
                            code:
                                'import {TimePicker} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TimePicker\n' +
                                '   manual={true}\n' +
                                '   clockFormat="24hr"\n' +
                                '   time="Wed Jun 21 2017 1:00:00 GMT-0400 (EDT)"\n' +
                                '/>\n',
                            example: <TimePicker manual={true} clockFormat="24hr" time="Wed Jun 21 2017 1:00:00 GMT-0400 (EDT)"/>
                        }
                    ]}
                description={[
                        <p key="p1">Time pickers are used as form elements to select times. The component can be set to work on a 12hr or 24hr clock, and added configurations allows the user to manually add times, if they do not choose to use the picker.</p>,
                        <p key="p2">The component will attempt to resolve entered times, and convert the value into a date object.</p>
                    ]}
            />
        )
    }
}

export class DateTimePickerElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="DateTimePicker"
                location="import {DateTimePicker} from 'zebra-stripes/Forms';"

                propsMap={[
                        {name: 'baseDateTime',    type: 'Date',     desc: 'Used to set the local date/time, typically from a server. If this is not set, it will use the client\'s datetime.', default: 'new Date()'},
                        {name: 'clockFormat',    type: 'string',    desc: 'Sets the clock selector to be in 12hr, or 24hr (Military) time format.', default: '12hr'},
                        {name: 'datewidth',      type: 'string',   desc: 'The css value, typically a percentage of 100%, that defines the width of the date input selector.', default: '60%'},
                        {name: 'dateConstraint', type: 'Array',    desc: 'An array of strings that defines the lower and upper extent of dates that are selectable.', default: '[null,null]'},
                        {name: 'dateFormat',     type: 'string',    desc: 'The date format that is displayed in the datePicker dialog header.', default: 'ddd, MMMM D'},
                        {name: 'disabled',       type: 'boolean',    desc: 'Toggle to enable or disable the form from accepting user input.', default: 'false'},
                        {name: 'format',         type: 'string',    desc: 'The minute format displayed on the dialog header panel.', default: 'M/DD/YYYY'},
                        {name: 'manual',         type: 'boolean',   desc: 'Toggle to enable the input to be manually entered, keeping this false will launch the Time selector when the user clicks the input.', default: 'false'},
                        {name: 'onChange',       type: 'function',  desc: 'Callback function fired when the value of the DateTimePicker is changed.', default: ' () => { return false; }'},
                        {name: 'placeholder',    type: 'Array',    desc: 'An array of strings that represent the placeholder for the date and time inputs.', default: '[\'Date\',\'Time\']'},
                        {name: 'style',          type: 'object',    desc: 'Style overrides for the container of the DateTimePicker.', default: '{}'},
                        {name: 'timeFormat',     type: 'string',    desc: 'The format displayed of the selected time.', default: 'hh:mm a'},
                        {name: 'timewidth',      type: 'string',    desc: 'The css value, typically a percentage of 100%, that defines the width of the time selector.', default: '40%'},
                        {name: 'value',          type: 'string',    desc: 'The string representation of a date object used for the initial date and time of the form input.' , default: 'null'},
                        {name: 'yearFormat',     type: 'string',    desc: 'The format of the year to be displayed in the Year selector.' , default: 'YYYY'},
                    ]}
                colOneWidth="45%"
                colTwoWidth="55%"
                samples={[
                        {
                            desc: 'Default DateTimePicker Usage',
                            code:
                                'import {DateTimePicker} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<DateTimePicker/>\n',
                            example: <DateTimePicker/>
                        },
                        {
                            desc: 'Manual DateTimePicker Control with a Set Value',
                            code:
                                'import {DateTimePicker} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<DateTimePicker\n' +
                                '   manual={true}\n' +
                                '   value="Wed Jun 21 2017 1:00:00 GMT-0400 (EDT)"\n' +
                                '/>\n',
                            example: <DateTimePicker manual={true} value="Wed Jun 21 2017 1:00:00 GMT-0400 (EDT)"/>
                        }
                    ]}
                description={[
                        <p key="p1">The DateTimePicker is an aggregated component that encapsulates the Date and Time pickers into one module to set a full date and time object.</p>,
                    ]}
            />
        )
    }
}
module.exports = {
    DatePickerElement: DatePickerElement,
    TimePickerElement: TimePickerElement,
    DateTimePickerElement: DateTimePickerElement
};