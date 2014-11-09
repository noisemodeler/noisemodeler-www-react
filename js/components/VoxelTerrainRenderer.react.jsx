var React = require('react');

var initNGL = require('../renderer/ngl');

var skyColor = {
    r: 0,
    g: 0.6,
    b: 0.9,
    a: 1.0
};

var initializeGL = function(canvas) {
    var gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e){}

    if(!gl){
        console.error("Error initializing webgl");
        return null;
    }

    ngl = initNGL(gl);

    ngl.setClearColor(skyColor);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    return gl;
};

var VoxelTerrainRenderer = React.createClass({

    componentDidMount: function() {
        console.log("GL context mounted");
        initializeGL(this.getDOMNode());
    },

    render: function() {
        return <canvas width="400" height="300">Get a real browser!</canvas>;
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }

});

module.exports = VoxelTerrainRenderer;
