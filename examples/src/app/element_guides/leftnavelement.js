"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {LeftNav} from 'zebra-stripes/Layouts'
import {RaisedButton} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class LeftNavElement extends React.Component {

    constructor(props) {
        super(props);
        this.closeMenu = this.closeMenu.bind(this);
    }

    closeMenu() {
        this.refs.LeftNav.close();
    }

    render() {
        return (
            <ComponentDocumentation
                title="LeftNav"
                location="import {LeftNav} from 'zebra-stripes/Layouts';"
                propsMap={[
                        {name: 'closeOnBlur',   type: 'boolean',    desc: 'This will automatically clsoe the menu when the user clicks off of it.', default: 'true'},
                        {name: 'color',         type: 'string',     desc: 'CSS color value for the icon used as a trigger for the left nav.', default: 'black'},
                        {name: 'icon',          type: 'string',     desc: 'The icon id to use when rendering the LeftNav trigger.', default: 'menu'},
                        {name: 'iconstyle',     type: 'object',     desc: 'Extends the base icon styling used for the left nav trigger.', default: '{}'},
                        {name: 'modal',         type: 'boolean',    desc: 'Add a darkened background around the menu, to represent focus on the launched menu.', default: 'false'},
                        {name: 'onBlur',        type: 'function',   desc: 'This callback function will fire when the menu is blurred.', default: '{return false;}'},
                        {name: 'open',          type: 'boolean',    desc: 'A boolean that will change the open and close state of the menu.' , default: 'false'},
                        {name: 'width',         type: 'string',     desc: 'A CSS width property used to set the width of the menu that slides out.' , default: '250px'}
                    ]}
                colOneWidth="25%"
                colTwoWidth="75%"
                samples={[
                        {
                            desc: 'Default LeftNav Usage with Modal',
                            code:
                                'import {LeftNav} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<LeftNav modal={true}>\n' +
                                '    Left Nav Content.\n' +
                                '</LeftNav>',
                            example: (
                                <LeftNav modal={true}>
                                    Left Nav Content.
                                </LeftNav>
                            )
                        },{
                            desc: 'LeftNav With Components with Actions',
                            code:
                                'import {LeftNav} from \'zebra-stripes/Layouts\'\n' +
                                'import {RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                'closeMenu() {\n' +
                                '    this.refs.LeftNav.close();\n' +
                                '}\n' +
                                '\n' +
                                '<LeftNav\n' +
                                '    ref="LeftNav"\n' +
                                '    icon="home"\n' +
                                '    modal={true}\n' +
                                '    width="50%"\n' +
                                '    closeOnBlur={false}>\n' +
                                '    <RaisedButton style={{position: "absolute", bottom: 0, left: 0, width: "calc(100% - 10px)"}}\n' +
                                '         key="button6" type="primary" onClick={this.closeMenu}>Manually Close</RaisedButton>\n' +
                                '</LeftNav>',
                            example: (
                                <LeftNav ref="LeftNav" width="50%" icon="home" modal={true} closeOnBlur={false}>
                                    <RaisedButton style={{position: 'absolute', bottom: 0, left: 0, width: 'calc(100% - 10px)'}}
                                     key="button6" type="primary" onClick={this.closeMenu}>Manually Close</RaisedButton>
                                </LeftNav>
                            )
                        }
                    ]}
                description={[
                        <p key="p1">The LeftNav component is a container that wraps a collection of elements in a hidden module. By default, the icon to trigger the opening and closing of the LeftNav panel is rendered in the place that the component is inserted in the DOM.</p>,
                        <p key="p2">The icon by default is a menu icon, but that can be changed through the props configuration.</p>
                    ]}
            />
        )
    }
}

module.exports = {
    LeftNavElement: LeftNavElement
};