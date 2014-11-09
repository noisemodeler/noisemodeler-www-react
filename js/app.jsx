var React = require('react');

var NoisyApp = require('./components/NoisyApp.react');
var RouterAPIUtils = require('./utils/RouterAPIUtils');

RouterAPIUtils.start();

React.renderComponent(
    <NoisyApp />,
    document.getElementById('app')
);

window.React = React; //export for React devtools
