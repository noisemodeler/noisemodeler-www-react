var keyMirror = require('react/lib/keyMirror');

module.exports = {

    ActionTypes: keyMirror({
        NAVIGATE_TO: null
    }),
    
    PayloadSources: keyMirror({
        ROUTE_CHANGE: null
    }),

    Routes: keyMirror({
        ROOT: null,
        DOWNLOAD: null
    })

};
