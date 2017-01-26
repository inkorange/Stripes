"use strict"

import React from 'react'
import { render } from 'react-dom'
import jsxToString from 'jsx-to-string';
import {PrismCode} from "react-prism"

import {H1, H2, H3, Title} from 'zebra-stripes/Typography'
import {TabularListing} from 'zebra-stripes/Elements/TabularListing'
import {Card, ShowHide, Dialog, Paper, TwoColumnLayout, IconMenu, LeftNav, NavBar, TabMenu} from 'zebra-stripes/Layouts'

export class ComponentDocumentation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var dataObj = {
            structure: [
                {
                    width: '150px',
                    name: 'Props Name',
                    field: 'name'
                },
                {
                    width: '175px',
                    name: 'Type',
                    field: 'type'
                },
                {
                    name: 'Description',
                    field: 'desc',
                    wrap: true
                },
                {
                    width: '125px',
                    name: 'Default Value',
                    field: 'default'
                }
            ],
            rows: this.props.propsMap
        };

        var paramNodes = this.props.propsMap ? <TabularListing
            data={dataObj}
        /> : <p>There are no parameters.</p>;


        var codeExamples = [];
        this.props.samples.map((obj, i) => {
            var codeNodes = (
                <pre style={style.codesnippet}>
                    <PrismCode className="language-js">
                        {obj.code ? obj.code : jsxToString(obj.example)}
                    </PrismCode>
                </pre>
            );
            codeExamples.push(
                <TwoColumnLayout
                    key={"codesample"+i}
                    columnOne={obj.example}
                    columnOneWidth="60%"
                    columnTwo={codeNodes}
                    columnTwoWidth="40%"
                    gutter="20"
                />
            )
        });

        return (

                <Card
                    title={this.props.location ? [<p style={style.location}>{this.props.location}</p>, this.props.title] : this.props.title}
                    style={style.base}
                >

                <div style={style.details}>
                    {this.props.description}
                    <div style={style.properties}>
                        <ShowHide
                            label={this.props.title + " Properties"}
                            labelStyle={{padding: '20px', backgroundColor: '#f3f3f3', color: 'rgb(100, 100, 100)', fontSize: '2rem'}}
                            contentStyle={{padding: '20px'}}
                            icons={["up","down"]}
                            initialShow={true}
                        >
                            <div style={{backgroundColor: 'white'}}>
                                {paramNodes}
                            </div>
                        </ShowHide>
                    </div>
                    <ShowHide
                        label="Examples in Practice"
                        labelStyle={{padding: '20px', backgroundColor: '#f3f3f3', color: 'rgb(100, 100, 100)', fontSize: '2rem'}}
                        contentStyle={{padding: '20px'}}
                        icons={["up","down"]}
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
        marginBottom: '40px'
    },
    details: {
        marginTop: '-20px'
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