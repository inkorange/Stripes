"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {IconMenu, TwoColumnLayout} from 'zebra-stripes/Layouts'

export class IconMenuElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ComponentDocumentation
                title="IconMenu"
                location="import {IconMenu} from 'zebra-stripes/Layouts'"
                propsMap={[
                        {name: 'backgroundColor',type: 'Object',  desc: 'An array that identifies what the icon background color should be in the inactive, and active state.' , default: '[\'transparent\', \'white\']'},
                        {name: 'contentStyle',   type: 'Object',  desc: 'Extends the content area container of the TabMenu base styling.' , default: '{}'},
                        {name: 'direction',      type: 'string',  desc: 'Forces the panel to open up in a specific direction relative to the icon trigger.', default: 'bottom'},
                        {name: 'iconColor',      type: 'Object',  desc: 'An array that identifies what the icon color should be in the inactive, and active state.' , default: '[null,null]'},
                        {name: 'iconid',         type: 'string',  desc: 'Icon component reference for the icon to use, this can be any iconid configured to be used in the design system.', default: 'filter'},
                        {name: 'iconStyle',      type: 'Object',  desc: 'Extends the icon baseStyle object.' , default: '{}'},
                        {name: 'max-width',      type: 'String',  desc: 'CSS size value, % or unit-based. This field enforces the max-width of the container.' , default: 'null'},
                        {name: 'style',          type: 'Object',  desc: 'Extends the base styling of the TabMenu selector element.' , default: '{}'},
                        {name: 'closeOnBlur',    type: 'boolean', desc: 'When the IconMenu is clicked away (blurred), it will automatically close.' , default: 'false'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default IconMenu Usage, Left and Right',
                            code:
                                'import {IconMenu} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<IconMenu style={{float: \'left\'}} contentStyle={{padding: \'20px\'}} iconid="filter" direction="right" max-width="400px">\n' +
                                '     <p>This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content.</p>\n' +
                                '</IconMenu>\n' +
                                '<IconMenu style={{float: \'right\'}} contentStyle={{padding: \'20px\'}}  iconid="filter" direction="left" max-width="400px">\n' +
                                '     <p>This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content.</p>\n' +
                                '</IconMenu>',
                            example: ([
                                 <IconMenu key="ic1" style={{float: 'left'}} contentStyle={{padding: '20px'}} iconid="filter" direction="right" max-width="400px">
                                     <p>This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content.</p>
                                 </IconMenu>,
                                 <IconMenu key="ic2" style={{float: 'right'}} contentStyle={{padding: '20px'}}  iconid="filter" direction="left" max-width="400px">
                                     <p>This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content. This is pure IconMenu content.</p>
                                 </IconMenu>
                            ])
                        },
                        {
                            desc: 'IconMenu Top Location Usage',
                            code:
                                'import {IconMenu, TwoColumnLayout} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<IconMenu style={{float: \'right\'}} iconid="filter" direction="top" max-width="400px">\n' +
                                '     <TwoColumnLayout\n' +
                                '     style={{padding: \'20px\', width: \'300px\'}}\n' +
                                '     columnOne={<div>This is content for the first column. This will display on the left side of the component.</div>}\n' +
                                '     columnTwo={<div>This is content for the second column. This will display on the right side of the component.</div>}\n' +
                                '     />\n' +
                                '</IconMenu>',
                            example: (
                                 <IconMenu style={{float: 'right'}} iconid="filter" direction="top" max-width="400px">
                                     <TwoColumnLayout
                                     style={{padding: '20px', width: '300px'}}
                                     columnOne={<div key="col1">This is content for the first column. This will display on the left side of the component.</div>}
                                     columnTwo={<div key="col2">This is content for the second column. This will display on the right side of the component.</div>}
                                     />
                                 </IconMenu>
                            )
                        },
                        {
                            desc: 'IconMenu Icon Color Handling',
                            code:
                                'import {IconMenu} from \'zebra-stripes/Layouts\'\n' +
                                '\n' +
                                '<IconMenu style={{float: \'right\'}} iconid="filter"\n' +
                                '          direction="right" contentStyle={{width:"400px"}}\n' +
                                '          backgroundColor={["transparent","blue"]} iconColor={["blue","white"]}\n' +
                                '>\n' +
                                '     <p>IconMenu Content...</p>\n' +
                                '</IconMenu>',
                            example: (
                                 <IconMenu contentStyle={{width:'400px'}} direction="right" backgroundColor={["transparent","blue"]} iconColor={["blue","white"]} iconid="filter">
                                     <p>IconMenu Content...</p>
                                 </IconMenu>
                            )
                        }
                    ]}
                description={[
                        <p key="p1">IconMenu can be used both to present forms off of meanu headers, or used to show/hide content, like on tooltips. They will be visible within the parent container's view constraints. Meaning, if overflow is restricted to the parent's container, the iconMenu will be susceptible to those constraints.</p>,
                    ]}
            />
        )
    }
}
