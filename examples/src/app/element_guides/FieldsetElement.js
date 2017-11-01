"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Fieldset} from 'zebra-stripes/Forms'
import {TextBox} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class FieldsetElement extends React.Component {

    constructor(props) {
        super(props);
    }
    /*
     <H3>Fieldset</H3>
     <Fieldset
     title="Active Section"
     style={{marginBottom: '20px'}}
     >
     This is an active Fieldset.
     </Fieldset>
     <Fieldset disabled={true} title="Disabled Section">
     This Fieldset is no longer active.
     </Fieldset>
    */
    render() {
        return (

            <ComponentDocumentation
                title="Fieldset"
                location="import {Fieldset} from 'zebra-stripes/Forms';"
                propsMap={[
                        {name: 'depth',     type: 'number', desc: 'Values used to give the element depth, by manipulating the box-shadow css property.', default: '1'},
                        {name: 'disabled',  type: 'boolean', desc: 'Will make the fieldset component inactive, and gray out the container.', default: 'false'},
                        {name: 'style',     type: 'object', desc: 'Extends the base styling of the Paper element.', default: '{}'},
                        {name: 'title',     type: 'string', desc: 'Added to the container\'s header as a label for the elements it contains.' , default: 'null'},
                        {name: 'visible',   type: 'boolean', desc: 'Will hide the element from view, through css display rule.', default: 'true'}
                    ]}
                colOneWidth="45%"
                colTwoWidth="55%"
                samples={[
                        {
                            desc: 'Default Fieldset Usage',
                            code:
                                'import {Fieldset} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Fieldset\n'+
                                '    title="Active Section">\n' +
                                '    This is a fieldset component.\n' +
                                '</Fieldset>',
                            example: <Fieldset title="Active Section">This is a fieldset component.</Fieldset>
                        },
                        {
                            desc: 'Fieldset with Inputs and Styling',
                            code:
                                'import {Fieldset, Textbox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Fieldset\n'+
                                '    title="Firstname"\n'+
                                '    style={{boxShadow: "0 0 10px rgba(0,0,0,.25)", padding: "5px 10px 20px 10px"}}>\n' +
                                '    <TextBox width="100%" placeholder="please enter a name..." />\n' +
                                '</Fieldset>',
                            example: <Fieldset title="Firstname" style={{boxShadow: "0 0 10px rgba(0,0,0,.25)", padding: "5px 10px 20px 10px"}}><TextBox width="100%" placeholder="please enter a name..." /></Fieldset>
                        },
                        {
                            desc: 'Disabled Fieldset with Inputs',
                            code:
                                'import {Fieldset, Textbox} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                '<Fieldset\n'+
                                '    title="Firstname"\n'+
                                '    disabled={true}\n'+
                                '    style={{boxShadow: "0 0 10px rgba(0,0,0,.25)", padding: "5px 10px 20px 10px"}}>\n' +
                                '    <TextBox width="100%" placeholder="please enter a name..." />\n' +
                                '</Fieldset>',
                            example: <Fieldset disabled={true} title="Firstname" style={{boxShadow: "0 0 10px rgba(0,0,0,.25)", padding: "5px 10px 20px 10px"}}><TextBox width="100%" placeholder="please enter a name..." /></Fieldset>
                        }
                    ]}
                description={[
                        <p key="p1">When grouping form elements together in a user form, Fieldset tags are used to group like data content together, as well as provide structure to the form's various elements.</p>,
                        <p key="p2">By disabling the Fieldset, you would be disabling all input elements contained within the group, which is very useful when conditionally showing large sections of inputs in a form.</p>
                    ]}
            />
        )
    }
}

module.exports = {
    FieldsetElement: FieldsetElement
};