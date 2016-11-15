"use strict"

import React from 'react'
import { render } from 'react-dom'

import {FlatButton, RaisedButton} from '../Stripes/Forms/Buttons'
import {Card, Dialog, Paper, H1, H3, Title, TwoColumnLayout, IconMenu, LeftNav, NavBar, TabMenu} from '../Stripes/Layouts'
import {RadioButtonGroup, CheckBoxGroup, Item, Fieldset, TextBox, TextArea, DropDown} from '../Stripes/Forms'
import {Table, TableHeader, TableHeaderCell, TableHeaderRow, TableBody, TableRow, TableCell} from '../Stripes/Table'
import {Alert} from  '../Stripes/Notifications/Alert'
import {Icon} from  '../Stripes/Symbols/Icon'

class CustomPage extends React.Component {

    constructor(props) {
        super(props);
        this.launchForm = this.launchForm.bind(this);
        this.state = {
        }
    }

    launchForm() {
        this.refs.dialog.open();
    }

    render() {

        return (
            <article className="main_content_child">
                <Title>This is a Sample Page</Title>
                <div>
                    <Paper style={{width: '32%', height: '200px', marginRight: '2%', marginBottom: '10px'}}>This is pretty interesting in this first box here.</Paper>
                    <Paper style={{width: '32%', backgroundImage: 'url(images/fire.jpg)', height: '200px', marginRight: '2%', marginBottom: '10px'}}>This is pretty interesting in this first box here.</Paper>
                    <Paper style={{width: '32%', height: '200px', marginBottom: '10px'}}>This is pretty interesting in this first box here.</Paper>
                    </div>
                <div>
                    <RaisedButton type="primary" style={{margin: '50px auto'}} onClick={this.launchForm}>LAUNCH FORM</RaisedButton>
                    </div>

                <Dialog
                    title="Please fill out this form"
                    ref="dialog"
                    >
                    there will be content here.
                </Dialog>
            </article>
        )
    }

}

module.exports = CustomPage;