var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var ActionTypes = require('../constants/NoisyConstants').ActionTypes;
var NoisyDispatcher = require('../dispatcher/NoisyDispatcher');

var CHANGE_EVENT = 'change';

var route = null;

var RouteStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function() {
        return route;
    }

});

RouteStore.dispatchToken = NoisyDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
        case ActionTypes.ROUTE_CHANGE:
            route = action.route;
            RouteStore.emitChange();
            break;

        default: 
            //do nothing
    }
});

module.exports = RouteStore;
