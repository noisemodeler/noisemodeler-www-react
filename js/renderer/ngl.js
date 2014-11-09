module.exports = function(gl){
    return {
        setClearColor: function(color){
            gl.clearColor(color.r, color.g, color.b, color.a);
        }
    };
};
