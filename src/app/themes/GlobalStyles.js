var appBarHeight = 64;
var mainPadding = 20;
var mainPaddingREM = mainPadding/10;
var large_min =     1079;   // smaller than 1080px
var small_min =     839;    // smaller than 840px
var xsmall_min =    599;    // smaller than 600px

export default {
    default: {
        breakpoints: [
            {[large_min]: 'large'},
            {[small_min]: 'small'},
            {[xsmall_min]: 'xsmall'}
        ],
    },

    // layouts *********************************
    MainContent: {
        height: '100vh',
        backgroundColor: 'white'
    },

    MenuItem: {
        Icon: {
            display: 'block'
        }
    },

    TwoColumnLayout: {
        display: '-webkit-box; display: -webkit-flex; display: flex',
        flexWrap: 'wrap',
        marginBottom: mainPadding + 'px',
        left: {
            width:'calc(50% - ' + mainPadding/2 + 'px)',
            marginRight:  mainPadding + 'px',
            textAlign: 'left'

        },
        right: {
            width:'calc(50% - ' + mainPadding/2 + 'px)',
            textAlign: 'left'
        }
    },

    Card: {
        transition: "all .25s ease-in-out",
        zIndex: "2",
        background: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        header: {
            backgroundColor: 'blue',
            padding: mainPadding*1.5 + 'px',
            fontSize: '2rem',
            color: 'white',
            zIndex: 1,
            position: 'relative'
        },
        body: {
            padding: mainPadding*1.5 + 'px'
        },
        footer: {
            borderTop: 'solid 1px #ccc',
            padding: mainPadding + 'px',
            textAlign: 'right',
            background: 'white',
            zIndex: 1
        },
        inactiveScreen: {
            position: 'absolute',
            top: '80px',
            right: 0,
            bottom: 0,
            left: 0,
            background: 'white',
            zIndex: 3
        }
    },

    Paper: {
        background: 'white',
        borderRadius: '2px',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },

    FloaterPanel: {
        overlayNORMAL: {
            display: 'none',
            position: 'fixed',
            top: appBarHeight + 'px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: '1000',
            background: 'rgba(0,0,0,.75)'
        },
        contentNORMAL: {
            width:'100%',
            margin: '0 auto',
            maxWidth: '1400px',
            background: 'rgba(30,43,56,.7)',
            boxShadow: '0 10px 25px black',
            overflowY: 'auto',
            position: 'relative',
            header: {
                lineHeight: '40px',
                height: '40px',
                fontSize: '2rem',
                cursor: 'auto',
                //padding: '0 ' + mainPadding + 'px'
                boxShadow: '0 5px 25px black',
            },
            body: {
                margin: mainPadding*1.25 + 'px ' + mainPadding/2 + 'px ' + mainPadding/2 + 'px ' + mainPadding/2 + 'px',
                padding: mainPadding/2 + 'px',
                background: 'white'
            }
        },
        contentSMALL: {
            width:'100%',
            maxWidth: '600px',
            margin: '0 auto',
            height:'100vh',
            background: 'rgba(30,43,56,.7)',
            //display: 'none',
            overflowY: 'auto',
            body: {
                padding: mainPadding / 2 + 'px 0'
            }
        }
    },

    Form : {
        Fieldset: {
            border: 'none',
            margin: 0,
            padding: 0,
            position: 'relative',
            label : {
                fontSize: '1.6rem',
                margin: mainPadding*.75 + 'px' + ' 0',
                lineHeight: '20px',
                display: 'block',
                color: 'black',
            }
        },
        TextInput: {
            margin: mainPadding/2 + 'px 0'
        },
        RadioInput: {
            width: '45%',
            float: 'left',
            margin: mainPadding/4 + 'px 0'
        },
        RangeSlider: {
            width: 'calc(100% - 10px)',
            sliderHolder: {
                position: 'relative',
                top: '-30px',
                marginBottom: mainPadding + 'px'
            },
            sliderNode: {
                position: 'absolute',
                width: '100%'
            },
            sliderSummary: {
                color: 'black'
            },
            unlimited: {
                paddingTop: mainPadding + 'px'
            }
        },
        RadioButton: {
            marginBottom: mainPadding + 'px',
            label: {
                marginLeft: mainPadding*1.5 + 'px'
            }
        },
        iFrameViewClosed: {
            border: 'none',
            background: 'transparent',
            width: '100%',
            height: 'calc(100vh - 85px)',
            transition: '.5s margin-left'
        },
        iFrameViewOpen: {
            border: 'none',
            background: 'transparent',
            width: '100%',
            height: 'calc(100vh - 85px)',
            transition: '.5s margin-left',
            marginLeft: '255px'
        }
    },

    Alert: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.75)',
        color: 'white',
        padding: mainPadding/2 + 'px',
        whiteSpace: 'nowrap',
        borderRadius: '4px',
        opacity: 0,
        transition: 'opacity .5s',
        display: 'none'
    }

}
