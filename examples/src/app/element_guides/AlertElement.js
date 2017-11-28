"use strict"

import React from 'react'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Alert, Tour} from 'zebra-stripes/Notifications'
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

export class TourElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showribbon: false
        };
        this.startTour = this.startTour.bind(this);
    }

    startTour() {
        this.refs.Tour.start();
    }

    render() {
        let script = [
            {
                title: 'Note Iconography',
                summary: 'This icon is typically used to call out added notes to the application.',
                location: [null, 'top', '350px'],
                target: '.Icon2',
                focus: [null,null, '200px']
            },
            {
                title: 'Admin Iconography',
                summary: 'You would find this icon in the left nav, and it brings the user to the admin section of the application.',
                location: ['right', 'top', '350px'],
                target: '.Icon1',
                focus: ['25%','75%', '150px', '100px']
            }
        ];
        return (
            <ComponentDocumentation
                title="Tour"
                location="import {Tour} from 'zebra-stripes/Notifications';"
                propsMap={[
                    {name: 'onStart',       type: 'function', desc: 'Callback function fired when the Tour begins.',                            default: '() => { return false; }'},
                    {name: 'onStop',        type: 'function', desc: 'Callback function that\'s fired when the Tour stops.',                     default: '() => { return false; }'},
                    {name: 'script',        type: 'Array',    desc: 'An array of objects that defines each step of the tour to be displayed.',  default: '[]'},
                    {name: 'showStepCount', type: 'boolean',  desc: 'Toggle to show the step number of each script section.',                   default: 'true'},
                    {name: 'zIndex',        type: 'Integer',  desc: 'Forces the zIndexing value of the Tour, used to situate the Tour above other elements.',  default: '1'}
                ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                    {
                        desc: 'Basic Tour Usage',
                        code:
                        'import {Icon} from \'zebra-stripes/Symbols/Icon\'\n' +
                        'import {Tour} from \'zebra-stripes/Notifications\'\n' +
                        'import {RaisedButton} from \'zebra-stripes/Forms\'\n' +
                        '\n' +
                        '// function to launch the tour once button is clicked\n' +
                        'startTour() {\n' +
                        '   this.refs.Tour.start();\n' +
                        '}\n' +
                        '\n' +
                        '// script configuration declaration\n' +
                        'let script = [\n' +
                        '    {\n' +
                        '        title: "Note Iconography",\n' +
                        '        summary: "This icon is typically used to call out added notes to the application.",\n' +
                        '        location: [null, "top", "350px"], //that first null will make the card centered on the target\n' +
                        '        target: ".Icon2",\n' +
                        '        focus: [null,null, "200px"]\n' +
                        '    },\n' +
                        '    {\n' +
                        '        title: "Admin Iconography",\n' +
                        '        summary: "You would find this icon in the left nav, and it brings the user to the admin section of the application.",\n' +
                        '        location: ["right", "top", "350px"],\n' +
                        '        target: ".Icon1",\n' +
                        '        focus: ["25%","75%", "150px", "100px"] //since we have a target value, first 2 values here will be ignored.\n' +
                        '    }\n' +
                        '];\n' +
                        '\n' +
                        '// JSX Code for render section\n' +
                        '<div style={{position: "relative", height: "300px"}}>\n' +
                        '    <Icon iconid="admin"\n' +
                        '          className="Icon1"\n' +
                        '          basestyle={{position: "absolute", top: "25%", left: "10%"}} size="large"/>\n' +
                        '    <Icon iconid="note"\n' +
                        '          className="Icon2"\n' +
                        '          basestyle={{position: "absolute", top: "100%", right: "10%"}}\n' +
                        '          size="large"/>\n' +
                        '    <RaisedButton onClick={this.startTour} type="primary">Start Tour</RaisedButton>\n' +
                        '    <Tour key="Tour" ref="Tour" script={script} />\n' +
                        '</div>',
                        example: <div style={{position: "relative", height: '300px'}}>
                            <Icon iconid="admin"
                                  className="Icon1"
                                  basestyle={{position: "absolute", top: '25%', left: '10%'}}
                                  size="large"/>

                            <Icon iconid="note"
                                  className="Icon2"
                                  basestyle={{position: "absolute", top: '100%', right: '10%'}}
                                  size="large"/>
                            <RaisedButton onClick={this.startTour} type="primary">Start Tour</RaisedButton>
                            <Tour key="Tour" zIndex="1000" ref="Tour" script={script} />
                        </div>
                    }
                ]}
                description={[
                    <p key="p1">This component can be droped into any page, and scripted to launch a step by step tour of a current feature on the site.</p>,
                    <p key="p2">The tour is configured with a collection of object, structured like below:</p>,
                    <div key="p3">
                        <pre key="precode">
                            <code className="language-js">
                                {'{\n' +
                                '    title: "Note Iconography",                     // text in the Card header\n' +
                                '    summary: "This text on the body of the Card.", // text in the body of the Card\n' +
                                '    location: [null, "top", "350px"],              // card position: [x,y,width]\n' +
                                '    target: ".Icon2",                              // will focus on this particular element\n' +
                                '    focus: ["right","top", "200px", "100px"]       // focus position [x,y,width,height]\n' +
                                '}'}
                            </code>
                        </pre>
                    </div>,
                    <p key="p4"><em>title</em> (required): will be what's displayed for each panel on the Card.</p>,
                    <p key="p5"><em>summary</em> (required): is the language that shows in the body of the displayed Card component.</p>,
                    <p key="p6"><em>location</em> (required): An array of 3 values that defines where the Card component will display on the page.<br/>
                        This could change from step to step, since the focus of the talking point might not be where the card currently is, or could be behind it. The tour will animate the movement to the next position when you advance to the next step.<br/>
                        The first object in the array is the position from the left of the page, considering the entire viewable area. The second is the position from the top. If left as a null, the tour will attempt to position the Card in the center, vertically. Positioning keys are also accepted 'right' or 'left' for the first object, and 'top' or 'bottom' for the second.<br/>
                        The last object is the size of the panel. We suggest you use a fixed pixel value, and not a %. Please include the px or % in each definition.</p>,
                    <p key="p7"><em>target</em> (optional): will have the circle focal point positioned right in the middle of this selector. If multiple fields are found, it will always point to the first one in the collection.</p>,
                    <p key="p8"><em>focus</em> (required): The will position the circular focal point to the values within this array of objects. The first object is the left position, the second is the top, and the third is the width of the circle, the last (optional) is the height. If you do not put a height value in, it will be a square based off the width value. These values will be animated to the next step in the script. If target is populated, the first two values in this object will be ignored, and it will use the targetd object as the x and y positioning.</p>
                ]}
            />
        )
    }
}
module.exports = {
    AlertElement: AlertElement,
    RibbonElement: RibbonElement,
    TourElement: TourElement
};