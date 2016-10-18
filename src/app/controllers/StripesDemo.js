"use strict"

import React from 'react'
import { render } from 'react-dom'

import {FlatButton, RaisedButton} from '../Stripes/Forms/Buttons'
import {Card} from '../Stripes/Layout/Card'
import {Paper} from '../Stripes/Layout/Paper'
import {H1, H3} from '../Stripes/Layout/Headers'
import {TwoColumnLayout} from  '../Stripes/Layout/TwoColumnLayout'
import {Alert} from  '../Stripes/Notifications/Alert'
import {Icon} from  '../Stripes/Symbols/Icon'

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
                    <Paper style={{width: '32%', marginRight: '2%', marginBottom: '10px'}}>This is a paper component</Paper>
                    <Paper style={{width: '32%', marginRight: '2%', marginBottom: '10px'}} depth="1">This is a paper component</Paper>
                    <Paper style={{width: '32%', marginBottom: '10px'}} depth="3">This is a paper component</Paper>
                </section>

                <section>
                    <H3>TwoColumnLayout</H3>
                    <TwoColumnLayout
                        columnOne={<div>This is content for the first column. This will display on the left side of the component.</div>}
                        columnTwo={<div>This is content for the second column. This will display on the right side of the component.</div>}
                    />
                </section>

                <section>
                    <H3>Alert</H3>
                    <div style={{position: "relative", margin: '20px 20px 20px 200px', background: 'blue', width: "30px", height: "30px"}}>
                        <Alert show={true}>This is an alert on the left</Alert>
                    </div>
                    <div style={{position: "relative", margin: '20px', background: 'green', width: "30px", height: "30px"}}>
                        <Alert show={true} position="right">This is an alert on the right</Alert>
                    </div>
                </section>


                <section>
                    <H3>Icon</H3>
                    <Icon
                        style={{margin: '10px'}}
                        iconid="view_by_2"
                        size="large"
                    />
                    <Icon
                        style={{margin: '10px'}}
                        iconid="view_by_2"
                        size="large"
                        type="primary"
                    />
                    <Icon
                        style={{margin: '10px'}}
                        iconid="view_by_2"
                        size="large"
                        color="orange"
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