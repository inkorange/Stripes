"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {NavBar} from 'zebra-stripes/Layouts'
import {Icon} from  'zebra-stripes/Symbols/Icon'
import {TextBox} from 'zebra-stripes/Forms'

export class NavBarElement extends React.Component {

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
                title="NavBar"
                location="import {NavBar} from 'zebra-stripes/Layouts';"
                propsMap={[
                        {name: 'fixed',     type: 'boolean',     desc: 'Boolean that makes the navigation to be fixed on the page.', default: 'false'},
                        {name: 'leftIcon',  type: '[ReactComponent(s)]',    desc: 'Trigger/Indicator to be added to the left side of the bar, typically used as an icon to open/close a menu.', default: 'null'},
                        {name: 'style',     type: 'Object',    desc: 'Extends the base styling of the NavBar element.' , default: '{}'},
                        {name: 'title',     type: 'string',   desc: 'Title to display on the right side of the bar, next to the icon.', default: 'null'}
                    ]}
                colOneWidth="50%"
                colTwoWidth="50%"
                samples={[
                        {
                            desc: 'Default NavBar Usage with Menu Iconography',
                            code:
                                'import {NavBar} from \'zebra-stripes/Layouts\'\n' +
                                'import {Icon} from \'zebra-stripes/Symbols/Icon\'\n' +
                                '\n' +
                                '<NavBar\n' +
                                '     leftIcon={(\n' +
                                '       <Icon\n' +
                                '           color="white"\n' +
                                '           iconid="menu"\n' +
                                '           size="medium"\n' +
                                '           onClick={()=> { alert("would perform an action..."; }}\n' +
                                '           basestyle={{cursor: "pointer", height: "25px", marginTop: "18px", lineHeight: 0}}\n' +
                                '       />)}\n' +
                                '     title="NavBar Title"\n' +
                                '     >\n' +
                                '   This is my nav bar.\n' +
                                '</NavBar>',
                            example: (
                                <NavBar ref="NavBar"
                                     leftIcon={(
                                     <Icon
                                     color="white"
                                     iconid="menu"
                                     size="medium"
                                     onClick={()=> { alert('would perform an action...'); }}
                                     basestyle={{cursor: 'pointer', height: '25px', marginTop: '18px', lineHeight: 0}}
                                     />)}
                                     title="NavBar Title"
                                     >
                                     This is my nav bar.
                                </NavBar>
                            )
                        },
                        {
                            desc: 'NavBar With Form Elements',
                            code:
                                'import {NavBar} from \'zebra-stripes/Layouts\'\n' +
                                'import {TextBox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<NavBar title="NavBar Title">\n' +
                                '    <TextBox width="100%"/>\n' +
                                '</NavBar>',
                            example: (
                                <NavBar ref="NavBar" title="NavBar Title">
                                     <TextBox width="100%"/>
                                </NavBar>
                            )
                        }
                    ]}
                description={[
                        <p key="p1">In areas where a section menu is needed, similar to the top nav of a Material UI page, this NavBar component is used.</p>,
                        <p key="p2">Menu functionality is not built into this component, any menu-based components would need to be added through the leftIcon prop, or within the body of the component.</p>
                    ]}
            />
        )
    }
}
