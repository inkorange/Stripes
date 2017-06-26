"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {CheckBox, RadioButtonGroup, CheckBoxGroup, Item, Fieldset, FlatButton, RaisedButton} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class CheckBoxElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked1: true
        }
    }

    render() {
        return (
            <ComponentDocumentation
                title="CheckBox"
                location="import {CheckBox} from 'zebra-stripes/Forms';"

                propsMap={[
                        {name: 'align',          type: 'string',     desc: 'Alignment of the CheckBox input in respect to the label text.', default: 'left'},
                        {name: 'checked',        type: 'boolean',    desc: 'Sets if the CheckBox should be in a checked state or not.', default: 'false'},
                        {name: 'disabled',       type: 'boolean',    desc: 'Toggle to enable and disable the CheckBox control.', default: 'false'},
                        {name: 'invertedColors', type: 'boolean',    desc: 'This option will swap the icon and CheckBox background colors for instances when the CheckBox is placed on solid colored backgrounds.', default: 'null'},
                        {name: 'onChange',       type: 'function',   desc: 'TThe callback function fired when the value of the RadioButtonGroup is changed. This is fired when the change is done through click events or programatically.', default: '() => { return false; }'},
                        {name: 'style',          type: 'string',     desc: 'The overriding styling of the CheckBox container.', default: '{}'},
                        {name: 'value',          type: 'string',     desc: 'The value assigned to this CheckBox, exposed when this input is checked.', default: '""'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default CheckBox Usage',
                            code:
                                'import {CheckBox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<CheckBox label="CheckBox Option" />\n',
                            example: <CheckBox label="CheckBox Option"/>
                        },
{
                            desc: 'Manually Controlling CheckBox',
                            code:
                                'import {CheckBox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<CheckBox checked={this.state.checked} label="CheckBox Option" />\n' +
                                '<RaisedButton \n' +
                                '   onClick={() => { this.setState({checked: !this.state.checked}); } }> \n' +
                                '   Toggle Check \n' +
                                '</RaisedButton>',
                            example: [<CheckBox checked={this.state.checked1} label="CheckBox Option"/>,
                                     <RaisedButton onClick={() => { this.setState({checked1: !this.state.checked1}); } }>Toggle Check</RaisedButton>]
                        },
                    ]}
                description={[
                        <p key="p1">In cases where just one checkbox toggle is used, developers can option to use the CheckBox component here.</p>,
                        <p key="p2">When using it as a toggler, leveraging the onChange callback will allow actions to be taken when the checked value changes.</p>

                    ]}
            />
        )
    }
}

export class CheckBoxGroupElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="CheckBoxGroup"
                location="import {CheckBoxGroup, Item} from 'zebra-stripes/Forms';"
/*
        align: 'left',
        disabled: false,
        invertColors: false,
        onChange: () => { return false; },
        onClick:  () => { return false; }
        style: {},
 */
                propsMap={[
                        {name: 'align',          type: 'string',     desc: 'Alignment of the CheckBox input in respect to the label text.', default: 'left'},
                        {name: 'disabled',       type: 'boolean',    desc: 'Toggle to enable and disable the CheckBox controls.', default: 'false'},
                        {name: 'invertedColors', type: 'boolean',     desc: 'This option will swap the icon and CheckBox background colors for instances when the CheckBox is placed on solid colored backgrounds.', default: 'null'},
                        {name: 'onChange',       type: 'function',     desc: 'TThe callback function fired when the value of the RadioButtonGroup is changed. This is fired when the change is done through click events or programatically.', default: '() => { return false; }'},
                        {name: 'onClick',        type: 'function',   desc: 'The callback function fired when the button is clicked.', default: '() => { return false; }'},
                        {name: 'style',          type: 'string',     desc: 'The overriding styling of the CheckBoxGroup container.', default: '{}'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default CheckBoxGroup Usage',
                            code:
                                'import {CheckBoxGroup, Item} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<CheckBoxGroup ref="checkboxgroup">\n' +
                                '    <Item defaultChecked={true} key="option1">Checkbox Option 1</Item>\n' +
                                '    <Item key="option2">Checkbox Option 2</Item>\n' +
                                '    <Item key="option3">Checkbox Option 3</Item>\n' +
                                '</CheckBoxGroup> \n' +
                                '<RaisedButton \n' +
                                '    onClick={() => { alert("Selected values are: " + this.refs.checkboxgroup.getValues()); }}>\n' +
                                '    What are the Values?\n' +
                                '</RaisedButton>',
                            example: [<CheckBoxGroup ref="checkboxgroup">
                                        <Item defaultChecked={true} key="option1">Checkbox Option 1</Item>
                                        <Item key="option2">Checkbox Option 2</Item>
                                        <Item key="option3">Checkbox Option 3</Item>
                                    </CheckBoxGroup>,
                                    <RaisedButton key="button1" onClick={() => { alert("Selected values are: " + this.refs.checkboxgroup.getValues()); }}>What are the Values?</RaisedButton>]
                        }
                    ]}
                description={[
                        <p key="p1">A CheckBoxGroup component is typically used in the case where multiple values can be selected within a form element. The array of values is accessed by accessing the component with the getValues() function.</p>
                    ]}
            />
        )
    }
}

export class RadioButtonGroupElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="RadioButtonGroup"
                location="import {RadioButtonGroup, Item} from 'zebra-stripes/Forms';"
                propsMap={[
                        {name: 'disabled',  type: 'boolean',    desc: 'Toggle to enable and disable the RadioButton controls.', default: 'false'},
                        {name: 'name',      type: 'string',     desc: 'The name attribute used as a form identifier for the group of radio inputs.', default: 'null'},
                        {name: 'onChange',  type: 'function',   desc: 'The callback function fired when the value of the RadioButtonGroup is changed. This is fired when the change is done through click events or programatically.', default: '() => { return false; }'},
                        {name: 'onClick',   type: 'function',   desc: 'The callback function fired when on the of the radio options are clicked.', default: '() => { return false; }'},
                        {name: 'style',     type: 'string',     desc: 'The overriding styling of the RadioButtonGroup container element.', default: '{}'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default RadioButtonGroup Usage With Value Extraction',
                            code:
                                'import {RadioButtonGroup, Item, RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<RadioButtonGroup ref="radiobuttongroup" name="group1">\n' +
                                '    <Item key="option1" defaultChecked={true} >Radio Option 1</Item>\n' +
                                '    <Item value="opt2" key="option2">Radio Option 2</Item>\n' +
                                '    <Item key="option3">Radio Option 3</Item>\n' +
                                '</RadioButtonGroup>\n' +
                                '<RaisedButton \n' +
                                '    onClick={() => { alert("Selected value is: " + this.refs.radiobuttongroup.getValues()); }}>\n' +
                                '    What is the Value?\n' +
                                '</RaisedButton>',
                            example: [<RadioButtonGroup ref="radiobuttongroup" key="radbutgrp" name="group1">
                                        <Item key="option1" defaultChecked={true} >Radio Option 1</Item>
                                        <Item value="opt2" key="option2">Radio Option 2</Item>
                                        <Item key="option3">Radio Option 3</Item>
                                    </RadioButtonGroup>,
                                    <RaisedButton key="button1" onClick={() => { alert("Selected value is: " + this.refs.radiobuttongroup.getValues()); }}>What is the Value?</RaisedButton>]
                        }
                    ]}
                description={[
                        <p key="p1">When form elements call for a single selection in a collection of options, the RadioButtonGroup component can be used. There is no single RadioButton component, since RadioButtons are typically used as an exclusive selection against other options, having just one has minimal use cases.</p>
                    ]}
            />
        )
    }
}

module.exports = {
    CheckBoxElement: CheckBoxElement,
    CheckBoxGroupElement: CheckBoxGroupElement,
    RadioButtonGroupElement: RadioButtonGroupElement
};