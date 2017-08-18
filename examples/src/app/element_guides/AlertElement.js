"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Alert} from 'zebra-stripes/Notifications/Alert'
import {RaisedButton} from 'zebra-stripes/Forms'
import {Ribbon} from 'zebra-stripes/Notifications/Ribbon'
import {Icon} from 'zebra-stripes/Symbols/Icon'

export class AlertElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertshow: false
        };
    }


    render() {
        return (
            <ComponentDocumentation
                title="Alert"
                location="import {Alert} from 'zebra-stripes/Notifications/Alert';"

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
                            desc: 'Basic Alert Usage',
                            code:
                                'import {Alert} from \'zebra-stripes/Notifications/Alert\'\n' +
                                'import {Icon} from \'zebra-stripes/Symbols/Icon\'\n' +
                                '\n' +
                                '<div style={{position: "relative", width: "35px", margin: "20px 20px 20px 200px"}}>\n' +
                                '    <Icon\n' +
                                '        iconid="admin"\n' +
                                '        size="large"/>\n' +
                                '    <Alert show={true}>This is an alert on the left</Alert>\n' +
                                '</div>',
                            example: <div style={{position: "relative", width: '35px', margin: '20px 20px 20px 200px'}}>
                                        <Icon
                                            iconid="admin"
                                            size="large"/>
                                        <Alert show={true}>This is an alert on the left</Alert>
                                    </div>
                        },
                        {
                            desc: 'Basic Alert Usage',
                            code:
                                'import {Alert} from \'zebra-stripes/Notifications/Alert\'\n' +
                                'import {Icon} from \'zebra-stripes/Symbols/Icon\'\n' +
                                '\n' +
                                '<div style={{position: "relative",  width: "35px",margin: "20px"}}>\n' +
                                '   <Icon\n' +
                                '        iconid="admin"\n' +
                                '        size="large"\n' +
                                '        style={{cursor: "pointer"}}\n' +
                                '        onClick={() => {this.setState({alertshow: !this.state.alertshow})}}\n' +
                                '   />\n' +
                                '   <Alert show={this.state.alertshow} position="right">This is an alert on the right</Alert>\n' +
                                '</div>',
                            example: <div style={{position: "relative",  width: "35px",margin: "20px"}}>
                                        <Icon
                                            iconid="admin"
                                            size="large"
                                            style={{cursor: "pointer"}}
                                            onClick={() => {this.setState({alertshow: !this.state.alertshow})}}
                                        />
                                        <Alert show={this.state.alertshow} position="right">This is an alert on the right</Alert>
                                    </div>
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

export class RibbonElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showribbon: false
        };
    }


    render() {
        return (
            <ComponentDocumentation
                title="Ribbon"
                location="import {Ribbon} from 'zebra-stripes/Notifications';"

                propsMap={[
                        {name: 'show',        type: 'boolean',  desc: 'Defines if the Ribbon should show or not.', default: 'false'},
                        {name: 'iconid',      type: 'string',   desc: 'Callback function fired when the input is blurred.', default: 'null'},
                        {name: 'onClick',     type: 'function', desc: 'Callback function fired when the input is clicked.', default: 'null'},
                        {name: 'height',      type: 'string',   desc: 'The CSS property value of the height of the Ribbon.', default: '50px'},
                        {name: 'position',    type: 'string',   desc: 'One of top, or bottom that defines where the Ribbon will show.', default: 'top'}
                    ]}
                colOneWidth="50%"
                colTwoWidth="50%"
                samples={[
                        {
                            desc: 'Basic Ribbon Usage',
                            code:
                                'import {Ribbon} from \'zebra-stripes/Notifications\'\n' +
                                'import {RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<div style={{position: "relative"}}>\n' +
                                '    <RaisedButton type="primary" onClick={() => {this.setState({showribbon: !this.state.showribbon})}}>Toggle Ribbon</RaisedButton>\n' +
                                '    <Ribbon\n' +
                                '        iconid="alert"\n' +
                                '        show={this.state.showribbon}\n' +
                                '        position="bottom"\n' +
                                '    >\n' +
                                '       This is a Message\n' +
                                '   </Ribbon>\n' +
                                '</div>',
                            example: <div style={{position: "relative"}}>
                                        <RaisedButton type="primary" onClick={ () => { this.setState({showribbon: !this.state.showribbon})}}>Toggle Ribbon</RaisedButton>
                                        <Ribbon show={this.state.showribbon} position="bottom" iconid="alert">This is a Message</Ribbon>
                                    </div>
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
module.exports = {
    AlertElement: AlertElement,
    RibbonElement: RibbonElement
};