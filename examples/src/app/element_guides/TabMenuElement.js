"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {TabMenu} from 'zebra-stripes/Layouts'
import {Item} from 'zebra-stripes/Forms'

const appleStyle = {
  padding: '20px',
    height: '100%',
  color: 'white',
  backgroundColor: '#8bd18b'
};

const orangeStyle = {
    padding: '20px',
    height: '100%',
    color: 'white',
    backgroundColor: '#c88627'
};

const bananaStyle = {
    padding: '20px',
    height: '100%',
    color: 'white',
    backgroundColor: '#a0aa01'
};

export class TabMenuElement extends React.Component {

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
                title="TabMenu"
                location="import {TabMenu} from 'zebra-stripes/Layouts';import {Item} from 'zebra-stripes/Forms'"
                propsMap={[
                        {name: 'onClick',         type: 'function',  desc: 'Callback function fired when one of the tabs are clicked.', default: '() => {}'},
                        {name: 'contentStyle',    type: 'Object',    desc: 'Extends the content area container of the TabMenu base styling.' , default: '{}'},
                        {name: 'style',           type: 'Object',    desc: 'Extends the base styling of the TabMenu selector element.' , default: '{}'},
                        {name: 'constrainHeight', type: 'boolean',   desc: 'Will force the vertical height to not exceed the screen height, when opened.' , default: 'false'},
                    ]}
                colOneWidth="50%"
                colTwoWidth="50%"
                samples={[
                        {
                            desc: 'Default TabMenu Usage',
                            code:
                                'import {TabMenu} from \'zebra-stripes/Layouts\'\n' +
                                'import {Item} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TabMenu>\n' +
                                '    <Item key="tab1" label="Apples"/>\n' +
                                '    <Item key="tab2" label="Bananas"/>\n' +
                                '    <Item key="tab3" label="Oranges"/>\n' +
                                '    <Item key="tab4" label="Lemons"/>\n' +
                                '</TabMenu>',
                            example: (
                                 <TabMenu>
                                     <Item key="tab1" label="Apples"/>
                                     <Item key="tab2" label="Bananas"/>
                                     <Item key="tab3" label="Oranges"/>
                                     <Item key="tab4" label="Lemons"/>
                                 </TabMenu>
                            )
                        },
                        {
                            desc: 'Default Selected Item',
                            code:
                                'import {TabMenu} from \'zebra-stripes/Layouts\'\n' +
                                'import {Item} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<TabMenu>\n' +
                                '    <Item key="tab1" label="Apples"/>\n' +
                                '    <Item key="tab2" selected={true} label="Bananas"/>\n' +
                                '    <Item key="tab3" label="Oranges"/>\n' +
                                '    <Item key="tab4" label="Lemons"/>\n' +
                                '</TabMenu>',
                            example: (
                                 <TabMenu>
                                     <Item key="tab1" label="Apples"/>
                                     <Item key="tab2" selected={true} label="Bananas"/>
                                     <Item key="tab3" label="Oranges"/>
                                     <Item key="tab4" label="Lemons"/>
                                 </TabMenu>
                            )
                        },
                        {
                            desc: 'TabMenu With Item Content',
                            code:
                                'import {TabMenu} from \'zebra-stripes/Layouts\'\n' +
                                'import {Item} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                'const appleStyle = {\n' +
                                '  padding: \'20px\', height: \'100%\', color: \'white\', backgroundColor: \'#8bd18b\'\n' +
                                '};\n' +
                                '\n' +
                                'const orangeStyle = {\n' +
                                '    padding: \'20px\', height: \'100%\', color: \'white\', backgroundColor: \'#c88627\'\n' +
                                '};\n' +
                                '\n' +
                                'const bananaStyle = {\n' +
                                '    padding: \'20px\', height: \'100%\', color: \'white\', backgroundColor: \'#a0aa01\'\n' +
                                '};\n' +
                                '\n' +
                                '<TabMenu contentStyle={{height: \'340px\', position: \'relative\'}}>\n' +
                                '    <Item key="tab1" label="Apples">\n' +
                                '       <div style={appleStyle}>Apple Content</div>\n' +
                                '    </Item>\n' +
                                '    <Item key="tab2" label="Bananas">\n' +
                                '       <div style={bananaStyle}>Banana Content</div>\n' +
                                '    </Item>\n' +
                                '    <Item key="tab3" label="Oranges">\n' +
                                '       <div style={orangeStyle}>Oranges Content</div>\n' +
                                '    </Item>\n' +
                                '</TabMenu>',
                            example: (
                                 <TabMenu contentStyle={{height: '340px', position: 'relative'}} >
                                     <Item key="tab1" label="Apples">
                                        <div style={appleStyle}>Apple Content</div>
                                     </Item>
                                     <Item key="tab2" label="Bananas">
                                        <div style={bananaStyle}>Banana Content</div>
                                     </Item>
                                     <Item key="tab3" label="Oranges">
                                        <div style={orangeStyle}>Oranges Content</div>
                                     </Item>
                                 </TabMenu>
                            )
                        }
                    ]}
                description={[
                        <p key="p1">TabMenus have flexible configurations for situations where you want to toggle between values within the selector, or it can be configured through the child Item elements to toggle between content areas.</p>,
                        <p key="p2">The Item components define both the title of each tab, as well as the content ot show when that item is selected. Content to show is added by including the content in the body of the component.</p>
                    ]}
            />
        )
    }
}
