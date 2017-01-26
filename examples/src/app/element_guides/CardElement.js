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
                title="This is the Card Title"
                actions={[
                    <FlatButton key="action1">Yes</FlatButton>,
                    <RaisedButton key="action2" type="primary">No</RaisedButton>
                ]}
            >
                This is the card body.
            </Card>);


        return (

        <ComponentDocumentation
                    title="Card"
                    location="import {Card} from 'zebra-stripes/Layouts';"
                    propsMap={[
                        {name: 'style', type: 'Object', desc: '', default: '{}'},
                        {name: 'headerStyle', type: 'Object', desc: '', default: '{}'},
                        {name: 'footerStyle', type: 'Object', desc: '', default: '{}'},
                        {name: 'title', type: 'String', desc: '', default: 'null'},
                        {name: 'actions', type: '[ReactComponent(s)]', desc: '', default: 'null'},
                        {name: 'fillContainer', type: 'Boolean', desc: 'This toggle forces the Card container to fill up the last relatively styled parent container.', default: 'false'},
                        {name: 'forceBottomAlign', type: 'Boolean', desc: 'This toggle will force the actions in the footer to always be at the bottom of the screen, typically used when the panel is fullscreen height.', default: 'false'},
                        {name: 'inactiveDepth', type: 'Float (0 to 1)', desc: 'In cases where the Card is performing an action and the user needs to wait, toggling this prop to be greater than 0 will put a screen over the Card. The screen is relative to the last relatively styled parent container. ', default: '0'}
                    ]}
                    samples={[
                        {
                            code:'<Card\n' +
                                '    title="This is the Card Title"\n' +
                                '    actions={[\n' +
                                '        <FlatButton key="action1">Yes</FlatButton>,\n' +
                                '        <RaisedButton key="action2" type="primary">No</RaisedButton>\n' +
                                '    ]}\n' +
                                '>\n' +
                                '    This is the card body.\n' +
                                '</Card>',
                            example: CardNode
                        }
                    ]}
                    description={[
                        <p>In situations to encapsulate actionable data, Card components enforce consistency in a header/body/action composition within the UI.</p>,
                        <p>Good use cases for the Card element are within dialog pop-ups. The actions attribute passed through to this module allows for interactions to act upon based on the content of the Card. They are not limited to Button components, as seen in the example below. They can be any ReactJS Element object, or collection of objects.</p>
                    ]}
                />
        )
    }
}

module.exports = {
    CardElement: CardElement
};