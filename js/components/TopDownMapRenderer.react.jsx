var React = require('react');

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
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    return gl;
};

var draw2DMap = function(gl) {
    triangleVertexPositionBuffer = gl.createBuffer();
    var vertices = [
        0.0, 1.0, 0.0,
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); 
    triangleVertexPositionBuffer.itemSize = 3; //not build into webgl
    triangleVertexPositionBuffer.numItems = 3; //not build into webgl

    var myVertexShaerSrc =
        "attribute vec3 pos;"+
        "void main() {"+
        "   gl_Position = vec4(pos, 1.0);"+
        "}";

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, myVertexShaderSrc);
    gl.compileShader(vertexShader);

    //drawing
    gl.viewport(0,0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

};

var TopDownMapRenderer = React.createClass({

    render: function() {
        return <canvas width="400" height="300">Get a real browser!</canvas>;
    },

    componentDidMount: function() {
        console.log("GL context mounted");
        var gl = initializeGL(this.getDOMNode());
        draw2DMap(gl);
    },

});

module.exports = NoisyApp;
