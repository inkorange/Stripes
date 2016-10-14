"use strict"

import React from 'react'
import { render } from 'react-dom'

class Homepage  extends React.Component {

    state = {
    };

    constructor() {
        super();
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <article className="main_content_child">

                <footer className="zebra">
                    <img src="./images/zebralogo.svg" />
                    <p>&copy;2016 ZIH Corp and/or its affiliates. All Rights Reserved. Zebra and the stylized Zebra head are trademarks of ZIH Corp, registered in many jurisdictions worldwide.</p>
                </footer>
            </article>
        )
    }
 
};

module.exports = Homepage;