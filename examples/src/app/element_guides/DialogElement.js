"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Dialog} from 'zebra-stripes/Layouts'
import {FlatButton, RaisedButton} from 'zebra-stripes/Forms'
import {H1} from 'zebra-stripes/Typography'

export class DialogElement extends React.Component {

    constructor(props) {
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    toggleDialog(open) {
        if(open) {
            this.refs.Dialog.open();
        } else {
            this.refs.Dialog.close();
        }
    }

    render() {
        return (
            <ComponentDocumentation
                title="Dialog"
                location="import {Dialog} from 'zebra-stripes/Layouts';"
                propsMap={[
                        {name: 'actions', type: '[ReactComponent(s)]', desc: 'A collection of React component objects to be included in the footer. Bindings are expected to already be attached to the elements.', default: 'null'},
                        {name: 'cardStyle', type: 'object', desc: 'Extends the base card styling which is contained in the Dialog body.', default: '{}'},
                        {name: 'dialogStyle', type: 'object', desc: 'Extends the wrapping Dialog container styling.', default: '{}'},
                        {name: 'title', type: 'string', desc: 'Text to be added to the header of the Dialog panel.', default: 'null'},
                        {name: 'showClose', type: 'boolean', desc: 'Present a control in the header to close the dialog.', default: 'false'},
                        {name: 'style', type: 'object', desc: 'Extends the base styling of the Dialog element.', default: '{}'},
                        {name: 'width', type: 'css value', desc: '...', default: '80%'}
                    ]}
                colOneWidth="30%"
                colTwoWidth="70%"
                samples={[
                        {
                            desc: 'Default Dialog Usage',
                            code:
                                'import {Dialog} from \'zebra-stripes/Layouts\'\n' +
                                'import {FlatButton, RaisedButton} from \'zebra-stripes/Forms\'\n' +
                                '\n' +
                                'toggleDialog(open) {\n' +
                                '    if(open) {\n' +
                                '        this.refs.Dialog.open();\n' +
                                '    } else {\n' +
                                '        this.refs.Dialog.close();\n' +
                                '    }\n' +
                                '}\n' +
                                '\n' +
                                '<RaisedButton key="action1" onClick={() => { this.toggleDialog(true); }}>Launch Dialog</RaisedButton>\n' +
                                '<Dialog ref="Dialog"\n' +
                                '        modal={true}\n' +
                                '        title="This is the Card Title"\n' +
                                '        width="50%"\n' +
                                '        key="dialog1"\n' +
                                '        actions={[\n' +
                                '            <FlatButton key="action1a" onClick={() => { this.toggleDialog(false); }}>Submit</FlatButton>,\n' +
                                '            <RaisedButton key="action2b" onClick={() => { this.toggleDialog(false); }}type="primary">Cancel</RaisedButton>\n' +
                                '        ]}\n' +
                                '>\n' +
                                '    <p>This is the content area of the dialog.This is the content area of the dialog.This is the content\n' +
                                '    area of the dialog.This is the content area of the dialog.This is the content area of the\n' +
                                '    dialog.This is the content area of the dialog.This is the content area of the dialog.This is the\n' +
                                '    content area of the dialog.</p>\n' +
                                '</Dialog>',
                            example: ([ <RaisedButton key="action1" onClick={() => { this.toggleDialog(true); }}>Launch Dialog</RaisedButton>,
                                        <Dialog ref="Dialog"
                                                modal={true}
                                                title="This is the Card Title"
                                                width="50%"
                                                key="dialog1"
                                                actions={[
                                                    <FlatButton key="action1a" onClick={() => { this.toggleDialog(false); }}>Submit</FlatButton>,
                                                    <RaisedButton key="action2b" onClick={() => { this.toggleDialog(false); }}type="primary">Cancel</RaisedButton>
                                                ]}
                                        >
                                            <p>This is the content area of the dialog.This is the content area of the dialog.This is the content
                                            area of the dialog.This is the content area of the dialog.This is the content area of the
                                            dialog.This is the content area of the dialog.This is the content area of the dialog.This is the
                                            content area of the dialog.</p>
                                        </Dialog>])
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
    DialogElement: DialogElement
};