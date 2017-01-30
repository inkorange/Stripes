"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Paper} from 'zebra-stripes/Layouts'
import {H1} from 'zebra-stripes/Typography'

export class PaperElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="Paper"
                location="import {Paper} from 'zebra-stripes/Layouts';"
                propsMap={[
                        {name: 'style', type: 'object', desc: 'Extends the base styling of the Paper element.', default: '{}'},
                        {name: 'depth', type: 'number', desc: 'Values used to give the element depth, by manipulating the box-shadow css property.', default: '1'},
                        {name: 'onBlur', type: 'function', desc: 'Callback function executed when the element triggers a blur event.', default: '1'}
                    ]}
                colOneWidth="45%"
                colTwoWidth="55%"
                samples={[
                        {
                            desc: 'Default Paper Usage',
                            code:
                                'import {Paper} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<Paper>\n' +
                                '    This is a paper component.\n' +
                                '</Paper>',
                            example: <Paper>This is a paper component.</Paper>
                        },
                        {
                            desc: 'Paper Usage With Styling and Depth Effect',
                            code:
                                'import {Paper} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<Paper\n' +
                                '   style={{padding: "20px"}}\n' +
                                '   depth="2"\n' +
                                '>\n' +
                                '    This is a paper component.\n' +
                                '</Paper>',
                            example: <Paper style={{padding: '20px'}} depth="2">This is a paper component.</Paper>
                        },
                        {
                            desc: 'Paper Usage with Blur Event and Depth Effect',
                            code:
                                'import {Paper} from \'zebra-stripes/Layouts\'\n' +
                                'import {H1} from \'zebra-stripes/Typography\'\n' +
                                '\n' +
                                '<Paper\n' +
                                '   onBlur={() => {alert("blurred.")}}\n'+
                                '   style={{padding: "20px", width: "100%"}}\n' +
                                '   depth="3"\n' +
                                '>\n' +
                                '   <H1>Try clicking me and then off me...</H1>\n' +
                                '</Paper>',
                            example: <Paper onBlur={() => {alert('blurred.')}} style={{padding: '20px', width: '100%'}} depth="3"><H1>Try clicking me and then off me...</H1></Paper>
                        },

                    ]}
                description={[
                        <p key="p1">Paper Components are used in cases where content needs to be wrapped in a call-out container.</p>,
                        <p key="p2">This component is very versitile in which it can be used in many situations. It's used as a styling wrapper, with any number of Nodes being applied to it's children context.</p>
                    ]}
            />
        )
    }
}

module.exports = {
    PaperElement: PaperElement
};