"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {TwoColumnLayout} from 'zebra-stripes/Layouts'
import {H1} from 'zebra-stripes/Typography'

export class TwoColumnElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="TwoColumnLayout"
                location="import {TwoColumnLayout} from 'zebra-stripes/Layouts';"
                propsMap={[
                        {name: 'columnOne',         type: '[ReactComponent(s)]',    desc: 'Content for the first column, can be a collection of React components, or a text string.', default: '""'},
                        {name: 'columnOneStyle',    type: 'object',                 desc: 'Extends the base styling of the first column.', default: '{}'},
                        {name: 'columnOneWidth',    type: 'string',                 desc: 'CSS value for the width of the first column. The value should be in the % format, should not contain "px" and should not be a number value.', default: '50%'},
                        {name: 'columnTwo',         type: '[ReactComponent(s)]',    desc: 'Content for the second column, can be a collection of React components, or a text string.', default: '""'},
                        {name: 'columnTwoStyle',    type: 'object',                 desc: 'Extends the base styling of the second column.', default: '{}'},
                        {name: 'columnTwoWidth',    type: 'string',                 desc: 'CSS value for the width of the first column. The value should be in the % format, should not contain "px" and should not be a number value. If the value is left null, it will be calculated to be the remaining width left by the width of the first column value.', default: 'null'},
                        {name: 'gutter',            type: 'number',                 desc: 'Must be a number value. This value represents the space between the columns. The widths of the columns will be a percentage of the remaining space left by the gutter width.', default: 'null'},
                        {name: 'style',             type: 'object',                 desc: 'Extends the base styling of the Paper element.', default: '{}'}
                    ]}
                colOneWidth="45%"
                colTwoWidth="55%"
                samples={[
                        {
                            desc: 'Default TwoColumnLayout Usage',
                            code:
                                'import {TwoColumnLayout} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<TwoColumnLayout\n' +
                                '    columnOne={<div>This is content for the first column. This will display on the left side of the component.</div>}\n' +
                                '    columnTwo={<div>This is content for the second column. This will display on the right side of the component.</div>}\n' +
                                '/>',
                            example: (<TwoColumnLayout
                                    columnOne={<div>This is content for the first column. This will display on the left side of the component.</div>}
                                    columnTwo={<div>This is content for the second column. This will display on the right side of the component.</div>}
                                />)
                        },
                        {
                            desc: 'Styled TwoColumnLayout  with Gutter',
                            code:
                                'import {TwoColumnLayout} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<TwoColumnLayout\n' +
                                '    columnOne={<div>Column one content.</div>}\n' +
                                '    columnTwo={<div>Column two content.</div>}\n' +
                                '    gutter="30"\n' +
                                '    columnOneWidth="25%"\n' +
                                '    columnTwoStyle={{boxShadow: "0 2px 10px rgba(0,0,0,.2)", padding: "20px"}}\n' +
                                '/>',
                            example: (<TwoColumnLayout
                                    columnOne={<div>Column one content.</div>}
                                    columnTwo={<div>Column two content.</div>}
                                    gutter="30"
                                    columnOneWidth="25%"
                                    columnTwoStyle={{boxShadow: '0 2px 10px rgba(0,0,0,.2)', padding: '20px'}}
                                />)
                        }
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
    TwoColumnElement: TwoColumnElement
};