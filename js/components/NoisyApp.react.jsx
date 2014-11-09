var React = require('react');

var RouteStore = require('../stores/RouteStore');
var VoxelTerrainRenderer = require('./VoxelTerrainRenderer.react.jsx');
var TopDownMapRenderer = require('./TopDownMapRenderer.react.jsx');

function getStateFromStores() {
    return {
        route: RouteStore.get()
    };
}

var NoisyApp = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        RouteStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        RouteStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <h1>Hello {this.state.route}</h1>
                <TopDownRenderer />
                <VoxelTerrainRenderer />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }

});

module.exports = NoisyApp;
