var NoisyDispatcher = require('../dispatcher/NoisyDispatcher');
var ActionTypes = require('../constants/NoisyConstants').ActionTypes;

module.exports = {

    at: function(route) {
        NoisyDispatcher.handleRouteAction({
            type: ActionTypes.ROUTE_CHANGE,
            route: route
        });
    }

};

