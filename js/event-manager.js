'use strict'
/*
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    Event Logging Manager - July 2016

    Binding agent for delegated website events, and interface for manually triggered custom events.

    When we have the ability to log custom user interactions beyond page request logging, it allows
    us to get a much better view of how the application is being used, what’s working  where we need
    to improve, and what’s most effective.

    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

export default function (config) {

    let events = [];
    let params = {
        bufferReleaseCount: 10, // count to which the logger will fire the payload to the API
        categories: [],         // whitelisted array of categories that will be allowed to be logged.
        timeRelease: 30000,     // TODO: timeout count(ms) on when to send the payload to the API
        validateCategory: true, // flag that says if the logger should enforce the categories whitelist
        globals: {},            // object that will be interpreted when a click event is logged
        logging: true,          // turns logging on and off
        eventList: ["click"]    // collection of event bindings used on delegated UI events
    };

    /* default constructor */
    var _init = function() {
        Object.assign(params,config);
        if(params.logging) {
            _bind();
        }
    };

    /*
    Initial bindings for all global click events.
    The following code will delegate click events to only the DOM elements that have the
    attribute "data-event-EVENTTYPE" ie: data-event-click. The event binding list is taken form the eventList array
     */
    var _bind = function() {
        window.onbeforeunload = _launchPayload;
        for(var eventItem of params.eventList) {
            document.addEventListener(eventItem, function (e) {
                for (var target = e.target; target && target != this; target = target.parentNode) {
                    //console.log(target.matches('[data-event-'+eventItem+']'), target.outerHTML.indexOf('[data-event-'+eventItem+']') >= 0);
                    if (target.matches('[data-event-'+eventItem+']')) {
                        var eventPart = "event" + eventItem.charAt(0).toUpperCase() + eventItem.slice(1).toLowerCase();
                        if(target.dataset.eventActive !== "false") { // if it specifically says not to log, we wont.
                            _addEvent({
                                type: eventItem,
                                category: target.dataset[eventPart],
                                desc: target.dataset.eventDesc
                            });
                        }
                        break;
                    }
                }
            }, false);
        }
    };

    /*
    takes event object and if logging is on, forwards it to the _pushEvent function
     */
    var _addEvent = function(e_obj) {
        if(params.logging) {
            _pushEvent(e_obj);
        }
    };

    /*
    Takes the event object (e) and decorates it with other environmental variables, as well as the global object that
    was configured during instantiation.
    If the validateCategory flag is set to true, it will compare the incoming category value with the collection
    of categories in the config to see if it is whitelisted for logging.
    Once the new event object is added to the buffer, it does a test to see if the size of the buffer is at the
    configured bufferReleaseCount, if so, it executes the launchPayload function.
     */
    var _pushEvent = function(e) {
        if(params.validateCategory && params.categories.length > 0) {
            if(params.categories.indexOf(e.category.toUpperCase()) < 0) {
                console.warn('category does not match validated list. Event logging for ' + e.category + ' has been ignored');
                return false;
            }
        }
        e.site = window.location.host;
        e.pathname = window.location.pathname;
        e.params = window.location.search;
        e.time = new Date().getTime();
        var globalObj = {};
        Object.keys(params.globals).map(k => {
            if(typeof params.globals[k] === "function") {
                globalObj[k] = params.globals[k]();
            } else {
                globalObj[k] = params.globals[k];
            }
        });
        Object.assign(e, globalObj);
        //console.log('event: ', e);
        events.push(e);
        if(events.length === params.bufferReleaseCount) {
            _launchPayload();
        }
    };

    /*
    Using the configured API, the collection of buffered events will be POSTed to the endpoint
    the request body is a string representation of the JSON object of all event requests.
     */
    //application/json
    var _launchPayload = function() {
        if(events.length > 0 && params.logging) {
            fetch(params.api, {
                headers: {
                    'Accept': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(events)
            }).then(function() {
                //console.log('I launched payload to API!!');
            });
            events.length = 0; // quickly clears array
        }
    };

    /* default constructor call */
    _init();

    /* PUBLIC METHOD */
    this.addEvent = _addEvent;
}
