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
        //marginTop: '80px',
        backgroundColor: 'white'
    }
}
