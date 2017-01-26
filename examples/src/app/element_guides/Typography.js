"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {H1, H2, H3, Title} from 'zebra-stripes/Typography'
export class Typography extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <H3>Typography</H3>
                <ComponentDocumentation
                    title="Title"
                    propsMap={[{name: 'style', type: 'Object', desc: '', default: '{}'}]}
                    code="<Title>Title Component</Title>"
                    example={<Title>Use of Title Example Component in Practice</Title>}
                    description="Typically used as a top-level header, the Title tag will be the prominent typographical rendering on the page."
                />
                <ComponentDocumentation
                    title="Header 1"
                    code="<H1>Header 1 Component</H1>"
                    propsMap={[{name: 'style', type: 'Object', desc: '', default: '{}'}]}
                    example={<H1>Header 1 Example Component in Practice</H1>}
                />
                <ComponentDocumentation
                    title="Header 2"
                    code="<H2>Header 2 Component</H2>"
                    propsMap={[{name: 'style', type: 'Object', desc: '', default: '{}'}]}
                    example={<H2>Header 2 Example Component in Practice</H2>}
                />
                <ComponentDocumentation
                    title="Header 3"
                    code="<H3>Header 3 Component</H3>"
                    propsMap={[{name: 'style', type: 'Object', desc: '', default: '{}'}]}
                    example={<H3>Header 3 Example Component in Practice</H3>}
                />
            </div>
        )
    }
}

module.exports = {
    Typography: Typography
};