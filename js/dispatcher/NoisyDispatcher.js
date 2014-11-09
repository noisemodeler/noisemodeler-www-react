var Dispatcher = require('flux').Dispatcher;

var PayloadSources = require('../constants/NoisyConstants');
var copyProperties = require('react/lib/copyProperties');

var NoisyDispatcher = copyProperties(new Dispatcher(), {

    handleRouteAction: function(action) {
        var payload = {
            source: PayloadSources.ROUTE_CHANGE,
            action: action
        };
        this.dispatch(payload);
    }

});

module.exports = NoisyDispatcher;
