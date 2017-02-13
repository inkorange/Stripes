"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Card} from 'zebra-stripes/Layouts'
import {FlatButton, RaisedButton} from 'zebra-stripes/Forms'

export class CardElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var CardNode = (
            <Card
                key="card1"
                title="This is the Card Title"
                actions={[
                    <FlatButton key="action1">Yes</FlatButton>,
                    <RaisedButton key="action2" type="primary">No</RaisedButton>
                ]}
            >
                This is the card body.
            </Card>);

        var CardNode2 = (
            <Card
                key="card2"
                style={{height: "300px"}}
                headerStyle={{backgroundColor: 'red'}}
                title="Button Actions and Styling"
                actions={[
                    <FlatButton onClick={() => {alert('YES!');}} key="action1b">Yes</FlatButton>,
                    <RaisedButton onClick={() => {alert('NO!');}} key="action2b" type="primary">No</RaisedButton>
                ]}
            >
                This is the card body.
            </Card>);
        return (

        <ComponentDocumentation
                    title="Card"
                    location="import {Card} from 'zebra-stripes/Layouts';"
                    propsMap={[
                        {name: 'style', type: 'object', desc: 'Extends the base styling of the Card element.', default: '{}'},
                        {name: 'headerStyle', type: 'object', desc: 'Extends the styling within the header section of the Card.', default: '{}'},
                        {name: 'footerStyle', type: 'object', desc: 'Extends the styling in the footer section of the Card.', default: '{}'},
                        {name: 'title', type: 'string', desc: 'Text to display in the header of the Card element.', default: 'null'},
                        {name: 'actions', type: '[ReactComponent(s)]', desc: 'A collection of React component objects to be included in the footer. Bindings are expected to already be attached to the elements, as the Card element will not initial event handlers on children elements.', default: 'null'},
                        {name: 'fillContainer', type: 'boolean', desc: 'This toggle forces the Card container to fill up the last relatively styled parent container.', default: 'false'},
                        {name: 'forceBottomAlign', type: 'boolean', desc: 'This toggle will force the actions in the footer to always be at the bottom of the screen, typically used when the panel is fullscreen height.', default: 'false'},
                        {name: 'inactiveDepth', type: 'number (0 to 1)', desc: 'In cases where the Card is performing an action and the user needs to wait, toggling this prop to be greater than 0 will put a screen over the Card. The screen is relative to the last relatively styled parent container. ', default: '0'}
                    ]}
                    samples={[
                        {
                            desc: 'Standard Use with Actions',
                            code:
                                'import {Card} from \'zebra-stripes/Layouts\'\n' +
                                'import {FlatButton, RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Card\n' +
                                '    title="This is the Card Title"\n' +
                                '    actions={[\n' +
                                '        <FlatButton key="action1">Yes</FlatButton>,\n' +
                                '        <RaisedButton key="action2" type="primary">No</RaisedButton>\n' +
                                '    ]}\n' +
                                '>\n' +
                                '    This is the card body.\n' +
                                '</Card>',
                            example: CardNode
                        },
                        {
                            desc: 'Styling with Event Binded Actions',
                            code:
                                'import {Card} from \'zebra-stripes/Layouts\'\n' +
                                'import {FlatButton, RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Card\n' +
                                '    style={{height: "300px"}}\n'+
                                '    headerStyle={{backgroundColor: "red"}}\n'+
                                '    title="This is the Card Title"\n' +
                                '    actions={[\n' +
                                '        <FlatButton onClick={() => {alert("YES!");}} key="action1">Yes</FlatButton>,\n' +
                                '        <RaisedButton onClick={() => {alert("YES!");}} key="action2" type="primary">No</RaisedButton>\n' +
                                '    ]}\n' +
                                '>\n' +
                                '    This is the card body.\n' +
                                '</Card>',
                            example: CardNode2
                        }
                    ]}
                    description={[
                        <p key="p1">In situations to encapsulate actionable data, Card components enforce consistency in a header/body/action composition within the UI.</p>,
                        <p key="p2">Good use cases for the Card element are within dialog pop-ups. The actions attribute passed through to this module allows for interactions to act upon based on the content of the Card. They are not limited to Button components, as seen in the example below. They can be any ReactJS Element object, or collection of objects.</p>
                    ]}
                />
        )
    }
}

module.exports = {
    CardElement: CardElement
};