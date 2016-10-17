"use strict"

import React from 'react'
import { render } from 'react-dom'

import {FlatButton, RaisedButton} from '../Stripes/Forms/Buttons'
import {Card} from '../Stripes/Layout/Card'
import {Paper} from '../Stripes/Layout/Paper'
import {H1, H3} from '../Stripes/Layout/Headers'
import {TwoColumnLayout} from  '../Stripes/Layout/TwoColumnLayout'

class StripesDemo extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <article className="main_content_child">
                <H1>Zebra Stripes Design System</H1>
                <section>
                    <H3>FlatButton</H3>
                    <FlatButton key="button1">FlatButton</FlatButton>
                    <FlatButton key="button2" type="primary">FlatButton</FlatButton>
                    <FlatButton key="button3" type="secondary" onClick={() => { alert('I clicked'); }}>FlatButton</FlatButton>
                    <FlatButton key="button4" disabled={true}>FlatButton</FlatButton>
                </section>
                <section>
                    <H3>RaisedButton</H3>
                    <RaisedButton key="button5">RaisedButton</RaisedButton>
                    <RaisedButton key="button6" type="primary">RaisedButton</RaisedButton>
                    <RaisedButton key="button7" type="secondary">RaisedButton</RaisedButton>
                </section>

                <section>
                    <H3>Card</H3>
                    <Card
                        title="This is the Card Title"
                        actions={[
                            <FlatButton key="action1">Yes</FlatButton>,
                            <RaisedButton key="action2" type="primary">No</RaisedButton>
                        ]}
                    >
                        This is the card body.
                    </Card>
                </section>

                <section>
                    <H3>Paper</H3>
                    <Paper style={{width: '200px', marginBottom: '10px'}}>This is a paper component</Paper>
                    <Paper style={{width: '200px', marginBottom: '10px'}} depth="1">This is a paper component</Paper>
                    <Paper style={{width: '200px', marginBottom: '10px'}} depth="3">This is a paper component</Paper>
                </section>

                <section>
                    <H3>TwoColumnLayout</H3>
                    <TwoColumnLayout
                        columnOne={<div>Hi</div>}
                        columnTwo={<div>There</div>}
                    />
                </section>


                <footer className="zebra">
                    <img src="./images/zebralogo.svg" />
                    <p>&copy;2016 ZIH Corp and/or its affiliates. All Rights Reserved. Zebra and the stylized Zebra head are trademarks of ZIH Corp, registered in many jurisdictions worldwide.</p>
                </footer>
            </article>
        )
    }
 
}

module.exports = StripesDemo;