"use strict"

import React from 'react'
import { render } from 'react-dom'
import jsxToString from 'jsx-to-string';

import {H1, H2, H3, Title} from 'zebra-stripes/Typography'
import {TabularListing} from 'zebra-stripes/Elements/TabularListing'
import {Card, ShowHide, Dialog, Paper, TwoColumnLayout, IconMenu, LeftNav, NavBar, TabMenu} from 'zebra-stripes/Layouts'

export class ComponentDocumentation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);

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
        var codeNodes = (
            <pre style={style.codesnippet}>
                <code className="language-js">
                    {this.props.code ? this.props.code : jsxToString(this.props.example)}
                </code>
            </pre>
        );
        var paramNodes = this.props.propsMap ? <TabularListing
            data={dataObj}
        /> : <p>There are no parameters.</p>;

        return (

                <Card
                    title={this.props.title}
                    style={style.base}
                >

                <div style={style.details}>
                    <p>{this.props.description}</p>
                    <ShowHide label="Examples in Practice">
                        <TwoColumnLayout
                            columnOne={this.props.example}
                            columnOneWidth="60%"
                            columnTwo={codeNodes}
                            columnTwoWidth="40%"
                            gutter="20"
                        />
                    </ShowHide>
                    <div style={style.properties}>
                        <H3>{this.props.title + " Properties"}</H3>
                        <div style={{backgroundColor: 'white'}}>
                            {paramNodes}
                        </div>
                    </div>
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
        marginLeft: '25px'
    },
    properties: {
        backgroundColor: 'rgba(0,0,0,.05)',
        padding: '10px 20px 20px 20px',
        marginTop: '20px'
    },
    table: {
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,.5)'
    },
    codesnippet: {
        height: '100%'
    }
}