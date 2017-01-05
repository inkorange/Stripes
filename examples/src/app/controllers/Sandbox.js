"use strict"

import React from 'react'
import { render } from 'react-dom'

import {Stripes} from '../../../../pkg/src/Core/Stripes'
import {Slider} from '../../../../pkg/src/Forms'

// theme
const theme = require('../themes/Theme');



class Sandbox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article className="main_content_child">
                <h3>Slider</h3>
                <div style={{width: '50%'}}>
                    <Slider />
                </div>
            </article>
        )
    }
}

module.exports = Sandbox;