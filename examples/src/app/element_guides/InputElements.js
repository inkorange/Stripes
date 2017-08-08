"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Item, Fieldset, TextBox, TextArea, DropDown, FlatButton, RaisedButton} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class TextBoxElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputerror: null
        };
        this.toggleError = this.toggleError.bind(this);
    }

    toggleError() {
        this.setState({
            inputerror: this.state.inputerror ? null : 'you have an error.'
        });
    }

    render() {
        return (
            <ComponentDocumentation
                title="TextBox"
                location="import {TextBox} from 'zebra-stripes/Forms';"

                propsMap={[
                        {name: 'disabled',          type: 'boolean',    desc: 'Toggle to enable and disable the TextBox input.', default: 'false'},
                        {name: 'error',             type: 'string',     desc: 'An error string that when not null, will put the input into an error state, and display this error message below the input.', default: 'null'},
                        {name: 'onBlur',            type: 'function',   desc: 'Callback function fired when the input is blurred.', default: 'null'},
                        {name: 'onClick',           type: 'function',   desc: 'Callback function fired when the input is clicked.', default: 'null'},
                        {name: 'onChange',          type: 'function',   desc: 'Callback function when the input\'s value is changed, either by user input or programatically.', default: 'null'},
                        {name: 'onKeyPress',        type: 'function',   desc: 'Callback function when there is a user\'s key press.', default: 'null'},
                        {name: 'onKeyUp',           type: 'function',   desc: 'Callback function when there is a user\'s key release.', default: 'null'},
                        {name: 'placeholder',       type: 'string',     desc: 'The string to show when no value has been entered into the input.', default: 'null'},
                        {name: 'readOnly',          type: 'string',     desc: 'Disables the form from accepting input, putting it into read-only format.', default: 'false'},
                        {name: 'showSuggestions',   type: 'boolean',    desc: 'Enabling the showing of suggestions, if suggestion data has been added through the component properties.', default: 'false'},
                        {name: 'style',             type: 'string',     desc: 'The overriding styling of the TextBox component.', default: '{}'},
                        {name: 'suggestionData',    type: 'Array',      desc: 'An array of strings that will be used (as long as showSuggestions is turned on) as reference to show suggestions when values are entered into the input field.', default: '[]'},
                        {name: 'value',             type: 'string',     desc: 'The initial value of the input.', default: '""'},
                        {name: 'width',             type: 'string',     desc: 'The CSS property value of the width of the input.', default: 'null'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'TextBox with a Placeholder',
                            code:
                                'import {TextBox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TextBox placeholder="This is a placeholder" />\n',
                            example: <TextBox placeholder="This is a placeholder" />
                        },
                        {
                            desc: 'TextBox with Size Setting',
                            code:
                                'import {TextBox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TextBox width="50%" placeholder="This is a placeholder" />\n',
                            example: <TextBox width="50%" placeholder="This is a placeholder" />
                        },
                        {
                            desc: 'TextBox with Suggestions',
                            code:
                                'import {TextBox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TextBox\n' +
                                '    width="100%"\n' +
                                '    showSuggestions={true}\n' +
                                '    suggestionData={["Alabama","Alaska","Arkansas","California","Colorado","New York","Connecticut"]}\n' +
                                '    placeholder="Type a state that begins with A or C" />',
                            example: <TextBox
                                        width="100%"
                                        showSuggestions={true}
                                        suggestionData={['Alabama', 'Alaska','Arkansas','California','Colorado','New York','Connecticut']}
                                        placeholder="Type a state that begins with A or C" />
                        },
                        {
                            desc: 'TextBox with Suggestions',
                            code:
                                'import {TextBox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                'toggleError() {\n' +
                                '    this.setState({\n' +
                                '        inputerror: this.state.inputerror ? null : "you have an error."\n' +
                                '    });\n' +
                                '}\n' +
                                '\n' +
                                '<TextBox placeholder="This is a placeholder"\n' +
                                '    error={this.state.inputerror}/>\n' +
                                '<RaisedButton style={{marginTop: "25px"}}\n' +
                                '    onClick={this.toggleError}>\n' +
                                '    Trigger Error\n' +
                                '</RaisedButton>',
                            example: [
                                <TextBox key="tb" placeholder="This is a placeholder" error={this.state.inputerror}/>,
                                <RaisedButton key="rb" style={{marginTop: "25px"}} key="button1" onClick={this.toggleError}>Trigger Error</RaisedButton>
                            ]
                        }
                    ]}
                description={[
                        <p key="p1">The TextBox component is a versatile input that doubles for both a suggestive search input as well as a standard textbox input component.</p>,
                        <p key="p2">Consistent error handling is maintained across all form elements with the use of the error attribute. This value both triggers an error state on this element, as well as defines the text to be displayed in the event of an error.</p>
                    ]}
            />
        )
    }
}

export class TextAreaElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="TextArea"
                location="import {TextArea} from 'zebra-stripes/Forms';"

                propsMap={[
                        {name: 'error',       type: 'string',    desc: 'An error string that when not null, will put the textarea into an error state, and display this error message below the textarea.', default: 'null'},
                        {name: 'onChange',    type: 'function',  desc: 'Callback function fired when the textarea value changes.', default: 'null'},
                        {name: 'placeholder', type: 'string',    desc: 'The string to show when no value has been entered into the input.', default: 'null'},
                        {name: 'style',       type: 'string',    desc: 'The overriding styling of the TextArea container.', default: '{}'},
                        {name: 'value',       type: 'string',    desc: 'The initial value of the TextArea input.', default: '""'},
                        {name: 'width',       type: 'string',    desc: 'The CSS property value of the width of the input.', default: 'null'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default TextArea Usage',
                            code:
                                'import {TextArea} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TextArea placeholder="This is a placeholder" />\n',
                            example: <TextArea placeholder="This is a placeholder" />
                        },
                        {
                            desc: 'TextArea With Width Setting',
                            code:
                                'import {TextArea} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TextArea width="100%" placeholder="This is a placeholder" />\n',
                            example: <TextArea width="100%" placeholder="This is a placeholder" />
                        }
                    ]}
                description={[
                        <p key="p1">The TextArea component is a textarea wrapping input component used to maintain consistent display and interaction behavior across the library.</p>
                    ]}
            />
        )
    }
}


export class DropDownElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="DropDown"
                location="import {DropDown, Item} from 'zebra-stripes/Forms';"
                propsMap={[
                        {name: 'error',         type: 'string',    desc: 'An error string that when not null, will put the input into an error state, and display this error message below the input.', default: 'null'},
                        {name: 'iconStyle',     type: 'object',    desc: 'The icon style for the dropdown arrow to the right of the select box.', default: '{}'},
                        {name: 'onChange',      type: 'function',  desc: 'Callback function fired when the value on the DropDown input changes.', default: 'white'},
                        {name: 'placeholder',   type: 'string',    desc: 'The default string used when no value has been set on the DropDown.', default: '() => { return false; }'},
                        {name: 'style',         type: 'object',    desc: 'The overriding styling of the DropDown\'s containing element.', default: '{}'},
                        {name: 'value',         type: 'string',    desc: 'The initial value setting for the DropDown.', default: '{}'},
                        {name: 'width',         type: 'string',    desc: 'CSS width property that defines the width of the DropDown.', default: '{}'}

                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default DropDown Usage',
                            code:
                                'import {DropDown, Item} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<DropDown\n' +
                                '    placeholder="Please select an option..."\n' +
                                '    showEmpty={true}\n' +
                                '    width="250px"\n' +
                                '>\n' +
                                '    <Item value={null} key="option0">--- select one ---</Item>\n' +
                                '    <Item value="1" key="option1">Select Option 1</Item>\n' +
                                '    <Item value="2" key="option2">Select Option 2</Item>\n' +
                                '    <Item value="3" key="option3">Select Option 3</Item>\n' +
                                '    <Item value="13" key="option13">Super long input for this select Option 4</Item>\n' +
                                '</DropDown>',
                            example: <DropDown
                                        placeholder="Please select an option..."
                                        showEmpty={true}
                                        width="250px"
                                     >
                                        <Item value={null} key="option0">--- select one ---</Item>
                                        <Item value="1" key="option1">Select Option 1</Item>
                                        <Item value="2" key="option2">Select Option 2</Item>
                                        <Item value="3" key="option3">Select Option 3</Item>
                                        <Item value="13" key="option13">Super long input for this select Option 4</Item>
                                    </DropDown>
                        }
                    ]}
                description={[
                        <p key="p1">The DropDown component is used as a select box, allowing the user to define a colleciton of Items, representing options, and displaying a custom interface for this form element.</p>
                    ]}
            />
        )
    }
}
module.exports = {
    TextBoxElement: TextBoxElement,
    TextAreaElement: TextAreaElement,
    DropDownElement: DropDownElement
};