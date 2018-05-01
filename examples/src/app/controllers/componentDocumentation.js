"use strict"

import React from 'react'
import { render } from 'react-dom'
import { jsxToString } from 'jsx-to-string'
import {PrismCode} from 'react-prism'

import {H1, H2, H3, Title} from 'zebra-stripes/Typography'
import {TabularListing} from 'zebra-stripes/Elements/TabularListing'
import {Card, ShowHide, Dialog, Paper, TwoColumnLayout, IconMenu, LeftNav, NavBar, TabMenu} from 'zebra-stripes/Layouts'

export class ComponentDocumentation extends React.Component {

    static defaultProps = {
        longProps: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const dataObj = {
            structure: [
                {
                    width: '150px',
                    name: 'Props Name',
                    field: ['name']
                },
                {
                    width: '175px',
                    name: 'Type',
                    field: ['type']
                },
                {
                    name: 'Description',
                    field: ['desc'],
                    wrap: true
                },
                {
                    width: '200px',
                    name: 'Default Value',
                    field: ['default']
                }
            ],
            rows: this.props.propsMap
        };

        const paramNodes = this.props.propsMap ?
            <TabularListing key="tablisting"
                zebraStripes={true}
                data={dataObj}
            /> : <p>There are no parameters.</p>;


        let codeExamples = [];
        this.props.samples.map((obj, i) => {
            let codeNodes = (
                <pre key={"precode" + i} style={style.codesnippet}>
                    <code className="language-js">
                        {obj.code ? obj.code : jsxToString(obj.example)}
                    </code>
                </pre>
            );
            codeExamples.push([
                obj.desc ? <H3 key={"desc"+i}>{obj.desc}</H3> : null,
                <TwoColumnLayout
                    key={"codesample"+i}
                    columnOne={obj.example}
                    columnOneWidth={this.props.colOneWidth ? this.props.colOneWidth : '60%'}
                    columnTwo={codeNodes}
                    columnTwoWidth={this.props.colTwoWidth ? this.props.colTwoWidth : '40%'}
                    gutter="20"
                />
            ])
        });

        return (

                <Card
                    title={this.props.location ? [<p key="location" style={style.location}>{this.props.location}</p>, this.props.title] : this.props.title}
                    style={style.base}
                    headerStyle={style.header}
                >
                    <div style={style.details}>
                        {this.props.description}
                        <div key="properties" style={style.properties}>
                            <ShowHide
                                label={this.props.title + " Properties"}
                                labelStyle={{padding: '20px', backgroundColor: '#f3f3f3', color: 'rgb(20, 20, 20)', fontSize: '2rem'}}
                                icons={["up","down"]}
                                initialShow={false}
                                maxOverflow={this.props.longProps ? '150vh' : '100vh'}
                            >
                                <div style={{backgroundColor: 'white', padding: '20px'}}>
                                    {paramNodes}
                                </div>
                            </ShowHide>
                        </div>
                        <ShowHide
                            label="Examples in Practice"
                            labelStyle={{padding: '20px', backgroundColor: '#f3f3f3', color: 'rgb(20, 20, 20)', fontSize: '2rem'}}
                            contentStyle={{padding: '20px'}}
                            icons={["up","down"]}
                            key="showhide"
                            initialShow={true}
                            maxOverflow={'200vh'}
                        >
                            {codeExamples}
                        </ShowHide>
                    </div>
                </Card>

        )
    }
}

module.exports = {
    ComponentDocumentation: ComponentDocumentation
}

var style = {
    h1: {
        paddingBottom: '20px',
        marginBottom: '10px',
        borderBottom: 'solid 1px rgb(21, 101, 192)'
    },
    base: {
        marginBottom: '100px',
        boxShadow: '0 3px 10px rgba(0,0,0,.25)'
    },
    header: {
        backgroundImage: 'url(./images/headline_background.jpg)',
        backgroundSize: 'cover',
        fontSize: '24px',
        fontWeight: '200',
        margin: 0,
        padding: '40px',
        color: 'white'
    },
    details: {
        //marginTop: '-20px'
    },
    properties: {
        backgroundColor: '#f3f3f3',
        //padding: '10px 20px 20px 20px',
        marginBottom: '20px'
    },
    table: {
        padding: '10px',
        boxShadow: '#f3f3f3'
    },
    codesnippet: {
        height: '100%'
    },
    location: {
        background: 'rgba(255,255,255,.8)',
        float: 'right',
        padding: '5px 10px',
        margin: '-5px 0 0 0',
        fontSize: '1.5rem',
        color: 'black',
        borderRadius: '5px'
    }
}