"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {FlatButton, RaisedButton} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class FlatButtonElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="FlatButton"
                location="import {FlatButton} from 'zebra-stripes/Forms';"

                propsMap={[
                        {name: 'disabled',  type: 'boolean',    desc: 'Toggle to enable and disable the button control.', default: 'false'},
                        {name: 'icon',      type: 'string',     desc: 'The icon id, as defined by the stripes library, that will display to the left of the button text.', default: 'null'},
                        {name: 'iconColor', type: 'string',     desc: 'The color of the icon that will be displayed in the button.', default: 'white'},
                        {name: 'onClick',   type: 'function',   desc: 'The callback function fired when the button is clicked.', default: '() => { return false; }'},
                        {name: 'style',     type: 'string',     desc: 'The overriding styling of the button.', default: '{}'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default FlatButton Usage',
                            code:
                                'import {FlatButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<FlatButton>FlatButton</FlatButton>\n',
                            example: <FlatButton>FlatButton</FlatButton>
                        },
                        {
                            desc: 'Primary FlatButton Theme',
                            code:
                                'import {FlatButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<FlatButton type="primary">FlatButton</FlatButton>\n',
                            example: <FlatButton type="primary">FlatButton</FlatButton>
                        },
                        {
                            desc: 'Secondary Theme on FlatButton with Click Handling',
                            code:
                                'import {FlatButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<FlatButton type="secondary"\n'+
                                '   onClick={() => { alert("I clicked"); }}>\n' +
                                '   FlatButton\n' +
                                '</FlatButton>\n',
                            example: <FlatButton type="secondary" onClick={() => { alert('I clicked'); }}>FlatButton</FlatButton>
                        },
                        {
                            desc: 'Disabled FlatButton',
                            code:
                                'import {FlatButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<FlatButton disabled={true}>FlatButton</FlatButton>\n',
                            example: <FlatButton disabled={true}>FlatButton</FlatButton>
                        },
                        {
                            desc: 'FlatButton with Icons',
                            code:
                                'import {FlatButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<FlatButton type="primary" icon="home">Home</FlatButton>\n',
                            example: <FlatButton type="primary" icon="home">Home</FlatButton>
                        }
                    ]}
                description={[
                        <p key="p1">The standard flat button form component, used to trigger submission actions. These buttons come with default, primary, and secondary themeing that is configured in the Stripes colors and themes files.</p>
                    ]}
            />
        )
    }
}

export class RaisedButtonElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="RaisedButton"
                location="import {RaisedButton} from 'zebra-stripes/Forms';"

                propsMap={[
                        {name: 'disabled',  type: 'boolean',    desc: 'Toggle to enable and disable the button control.', default: 'false'},
                        {name: 'icon',      type: 'string',     desc: 'The icon id, as defined by the stripes library, that will display to the left of the button text.', default: 'null'},
                        {name: 'iconColor', type: 'string',     desc: 'The color of the icon that will be displayed in the button.', default: 'white'},
                        {name: 'onClick',   type: 'function',   desc: 'The callback function fired when the button is clicked.', default: '() => { return false; }'},
                        {name: 'style',     type: 'string',     desc: 'The overriding styling of the button.', default: '{}'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default TimePicker Usage',
                            code:
                                'import {RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<RaisedButton>RaisedButton</RaisedButton>\n',
                            example: <RaisedButton>RaisedButton</RaisedButton>
                        },
                        {
                            desc: 'Manual TimePicker Control with a Set Value',
                            code:
                                'import {RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<RaisedButton type="primary">RaisedButton</RaisedButton>\n',
                            example: <RaisedButton type="primary">RaisedButton</RaisedButton>
                        }
                    ]}
                description={[
                        <p key="p1">The standard raised button form component, used to trigger submission actions. These buttons come with default, primary, and secondary themeing that is configured in the Stripes colors and themes files.</p>
                    ]}
            />
        )
    }
}


module.exports = {
    FlatButtonElement: FlatButtonElement,
    RaisedButtonElement: RaisedButtonElement
};