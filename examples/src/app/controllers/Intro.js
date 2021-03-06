"use strict"

import React from 'react'
import { render } from 'react-dom'

import {H1, H2, H3, Title, A} from 'zebra-stripes/Typography'
import {Icon} from  'zebra-stripes/Symbols/Icon'

import { Stripes } from 'zebra-stripes/Core/Stripes'

class StripesDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <article className="main_content_child" style={{padding: '110px 5% 0px 5%'}}>

                <Title style={mainheaderStyle}>Zebra Stripes Design System: An Easily Re-Usable Web Component Architecture Built on ReactJS.</Title>
                <h3 style={taglineStyle}>Introducing the first official release, v2018.1, with extended support for Material and Zebra design patterns.</h3>

                <p>Welcome to the Stripes Design Library (v2018.1) authored by the engineers of the TLA Application.</p>

                <a href="https://facebook.github.io/react/" target="_blank"><img src="./images/react.jpg" style={{float: 'right', padding: '20px'}} /></a>

                <p>The components contained within this guide are developed against the Material UI design concepts, with elements originating from Zebra's own design methodology.</p>

                <p>This library is an extension to the ReactJS library, and written with minimal library dependencies. The components are written in ES6 Class patterns. This web component architecture promotes the design system approach called Atomic Design.</p>

                <H2>Web Components</H2>
                <p>Web components are a technology that instantiates portions of the UI layer as individual [shadow DOM] parts. These are typically referred to as the UI elements of the application, such as a top nav, search box, tabular listing. The same architecture is used to render logic and data-based controllers also enforcing design systems across an application’s UI.</p>
                <p>The new TLA application uses the idea of atomic design, the individual breakdown of reusable components of a UI. Brad Frost (<A href="http://bradfrost.com/blog/post/atomic-web-design/" target="_blank">http://bradfrost.com/blog/post/atomic-web-design/</A>) introduced the idea of atoms, elements, and molecules when referring to components of a layout. Web component technologies such as Polymer and ReactJS provide a vehicle to implement such a design system.</p>

                <H2>Using Atomic Design</H2>
                <p>Atomic Design states that all pages are constructed of elements, which are then constructure of small components referred to as molecules, and those composed of smaller ones such as atoms. This concept is a modern way to both design applications as well as implement and reuse shared components across this application and other sister apps. The deployment system that represents such an architecture will also work to promote a more flexible upgrade and new installation path for new hubs.</p>

                <H2>We Alreday Have h1 Tags, Why Do We Need to Use a New H1 Element?</H2>
                <p>Inheriting this Stripes design system in your project allows developers to maintain a strict design system in structure, decoration, and semantics.</p>
                <p>The CSS that has historically accompanied the page templates are now included with the instantiation of the component through the javascript. By leveraging theme configurations, the Stripes library will maintain color schemes, element sizing, even iconography, across the entire component library.</p>
                <pre><code className="language-js">
                    {'<h3>This is a typical <h3> tag which gives you stock styling...</h3>'}
                </code></pre>
                <h3>This is a typical &lt;h3&gt; tag which gives you stock styling...</h3>

                <pre><code className="language-js">
                    {'<H3>When using This <H3> tag, you inherit the styling of the \n configured theme, fonts and all...</H3>'}
                </code></pre>
                <H3>When using This &lt;H3&gt; tag, you inherit the styling of the configured theme, fonts and all...</H3>

                <H2>Maintainers</H2>
                <p>Chris West<br/>
                    UI Software Engineer, DCS<br/>
                    Zebra Technologies<br/>
                    <A href="">west@zebra.com</A></p>

            </article>
        )
    }

}

const mainheaderStyle = {
    padding: '60px calc(5% + 20px)',
    margin: '20px calc(-5% - 20px) 40px',
    backgroundImage: 'url(./images/headline_background.jpg)',
    backgroundSize: 'cover',
    color: 'white',
    fontSize: '42px',
    fontWeight: '250',
    lineHeight: '1.4',
    textShadow: '0 1px 0 rgba(0,0,0,.75)'
};

const taglineStyle = {
    background: '#005983',
    color: 'white',
    fontSize: '20px',
    fontWeight: '200',
    marginTop: '-40px',
    marginBottom: '40px',
    padding: '16px',
    boxShadow: '0 5px 15px -5px rgba(0,0,0,.5) inset'
};

module.exports = StripesDemo;