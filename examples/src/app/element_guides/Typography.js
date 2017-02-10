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
                <H1>Typography</H1>
                <ComponentDocumentation
                    title="Title"
                    location="import {Title} from 'zebra-stripes/Typography';"
                    propsMap={[standardStyleProp]}
                    samples={[
                        {
                            code:"<Title>\n     Title Component\n</Title>",
                            example:(<Title style={{wordWrap: 'break-word'}}>ABCDEFGHIJKLMNOPQRSTUVWXYZabsdefghijklmnopqrstuvwxyz1234567890</Title>)
                        },
                        {
                            code:"<Title style=\{color:'blue'\}>\n     Title Component\n</Title>",
                            example:(<Title style={{wordWrap: 'break-word', color:'blue'}}>ABCDEFGHIJKLMNOPQRSTUVWXYZabsdefghijklmnopqrstuvwxyz1234567890</Title>)
                        }
                    ]}
                    description={<p>Typically used as a top-level header, the Title tag will be the prominent typographical rendering on the page, and will render semantically out to the &lth;header&ht; element.</p>}
                />
                <ComponentDocumentation
                    title="Header 1"
                    location="import {H1} from 'zebra-stripes/Typography';"
                    samples={[
                        {
                            code:"<H1>\n     Header 1 Component\n</H1>",
                            example:(<H1 style={{wordWrap: 'break-word'}}>ABCDEFGHIJKLMNOPQRSTUVWXYZabsdefghijklmnopqrstuvwxyz1234567890</H1>)
                        }
                    ]}
                    propsMap={[standardStyleProp]}
                    description={<p>Highest level header tag. Post React rendering will result in the use of the common h1 tag.</p>}
                />
                <ComponentDocumentation
                    title="Header 2"
                    location="import {H2} from 'zebra-stripes/Typography';"
                    samples={[
                        {
                            code:"<H2>\n     Header 2 Component\n</H2>",
                            example:(<H2 style={{wordWrap: 'break-word'}}>ABCDEFGHIJKLMNOPQRSTUVWXYZabsdefghijklmnopqrstuvwxyz1234567890</H2>)
                        }
                    ]}
                    description={<p>Post React rendering will result in the use of the common h2 tag.</p>}
                    propsMap={[standardStyleProp]}
                />
                <ComponentDocumentation
                    title="Header 3"
                    location="import {H3} from 'zebra-stripes/Typography';"
                    samples={[
                        {
                            code:"<H3>\n     Header 3 Component\n</H3>",
                            example:(<H3 style={{wordWrap: 'break-word'}}>ABCDEFGHIJKLMNOPQRSTUVWXYZabsdefghijklmnopqrstuvwxyz1234567890</H3>)
                        }
                    ]}
                    description={<p>Post React rendering will result in the use of the common h3 tag.</p>}
                    propsMap={[standardStyleProp]}
                />
            </div>
        )
    }
}

const standardStyleProp = {name: 'style', type: 'object', desc: 'Extend the base thematic styling for this tag.', default: '{}'};

module.exports = {
    Typography: Typography
};