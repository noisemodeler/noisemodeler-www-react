var page = require('page');

var RouterActionCreators = require('../actions/RouterActionCreators');
var Routes = require('../constants/NoisyConstants').Routes;

var routeTo = function(route) {
    return function(){ RouterActionCreators.at(route); };
};

page('/', routeTo(Routes.ROOT));
page('/download', routeTo(Routes.DOWNLOAD));

//legacy routes
page('/index.html', routeTo(Routes.ROOT));
page('/download.html', routeTo(Routes.DOWNLOAD));

module.exports = {

    start: page

};
