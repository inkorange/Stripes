import React from 'react';
import { render } from 'react-dom';

class TLAController extends React.Component {

    constructor() {
        super();
        // all callback functions need local context bindings -- do not like.
        //this.changeContent = this.changeContent.bind(this);
    }

}

module.exports = TLAController;