"use strict"

import React from 'react'
import { render } from 'react-dom'

import {ComponentDocumentation} from '../controllers/ComponentDocumentation'
import {Icon} from  'zebra-stripes/Symbols/Icon'
import {H3} from  'zebra-stripes/Typography'
const iconRef = require('../themes/iconLibrary.js');
var iconJSON = xmlToJson(new DOMParser().parseFromString(iconRef, 'text/xml'));

function xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

export class IconElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var iconItems = [];
        iconJSON.svg.symbol.map(icon => {
            iconItems.push(<div style={{display: 'inline-block', width: '100px', float: 'left', padding: '5px', textAlign: 'center'}}><Icon iconid={icon["@attributes"].id} size="large"/><p>{icon["@attributes"].id}</p></div>)
        });

        return (
            <ComponentDocumentation
                title="Icon"
                location="import {Icon} from  'zebra-stripes/Symbols/Icon';"

                propsMap={[
                        {name: 'basestyle', type: 'object',   desc: 'CSS object that overrides the container styling of the Icon component.', default: '{}'},
                        {name: 'color',     type: 'string',   desc: 'Defines the color of the icon. That can be done in this attribute, or directly in the style attribute as a CSS property.', default: 'null'},
                        {name: 'inactive',  type: 'boolean',  desc: 'Toggle to enable and disable the Icon, putting disabled styling on it, and making it un-clickable.', default: 'false'},
                        {name: 'onClick',   type: 'object',   desc: 'Sets a callback function when the Icon is clicked. This also sets the style properties for the Icon to behave and look like an active interaction point.', default: 'null'},
                        {name: 'size',      type: 'string',   desc: 'Static style settings, in string format. Acceptable values: small, medium, large. width and height CSS values sent through the style property will override this.', default: '() => { return false; }'},
                        {name: 'style',     type: 'string',   desc: 'The overriding styling of the actual svg object nested in the Icon component. This is where specific svg-based styling should be applied (ie: fill).', default: '{}'}
                    ]}
                colOneWidth="25%"
                colTwoWidth="75%"
                samples={[
                        {
                            desc: 'Default Icon Usage',
                            code:
                                'import {Icon} from \'zebra-stripes/Symbols/Icon\'\n' +
                                '\n' +
                                '<Icon iconid="home" />\n'+
                                '<Icon iconid="home" size="medium" />\n'+
                                '<Icon iconid="home" size="large" />\n',
                            example: [<Icon iconid="home"/>,<Icon iconid="home" size="medium"/>,<Icon iconid="home" size="large"/>]
                        },
                        {
                            desc: 'Icon with Click Event Bindings',
                            code:
                                'import {Icon} from \'zebra-stripes/Symbols/Icon\'\n' +
                                '\n' +
                                '<Icon iconid="admin"\n'+
                                '    style={{margin: "10px"}}\n' +
                                '    onClick={() => { alert("clicked admin"); }}\n'+
                                '    size="large"/>\n'+
                                '<Icon iconid="email"\n'+
                                '    style={{margin: "10px"}}\n' +
                                '    onClick={() => { alert("clicked email"); }}\n'+
                                '    size="large" />\n'+
                                '<Icon iconid="rtcube"\n'+
                                '    style={{margin: "10px"}}\n' +
                                '    onClick={() => { alert("clicked rtcube"); }}\n'+
                                '    size="large" />\n',
                            example: [  <Icon iconid="admin" style={{margin: "10px"}} onClick={() => { alert("clicked admin"); }} size="large"/>,
                                        <Icon iconid="email" style={{margin: "10px"}} onClick={() => { alert("clicked email"); }} size="large"/>,
                                        <Icon iconid="rtcube" style={{margin: "10px"}} onClick={() => { alert("clicked rtcube"); }} size="large"/>]
                        }
                    ]}
                description={[
                        <p key="p1">The Stripes library has support to inherit SVG symbols embedded in the root .html file, or as a configuration directly to the library upon instantiation.</p>,
                        <pre key="code1"><code className="language-js">
                            {'Stripes({\n'+
                             '      palette: theme.palette,\n'+
                             '      spacing: theme.spacing,\n'+
                             '      icons: icons\n'+
                             '})'}
                        </code></pre>,
                        <H3 key="p2">Full Icon Library Installed:</H3>,
                        <div key="p3">{iconItems}</div>,
                        <p style={{clear:'both'}} key="p4">Through this Icon component, the configured Stripes design language is maintained through both color, size, as well as iconography. Icon sets can be swapped in and out between projects.</p>,
                    ]}
            />
        )
    }
}

module.exports = {
    IconElement: IconElement
};