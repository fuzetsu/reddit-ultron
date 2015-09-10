(function() {

    var app = window.app = window.app || {};

    var cmp = app.cmp = {};
    var model = app.model = {};

    app.IMAGES = {
        loading: 'img/loading.gif'
    };

    var deps = {
        // EXTRA
        'js/': ['util'],
        // MODELS
        'js/models/': ['reddit'],
        // COMPONENTS
        'js/components/': ['start', 'results']
    };

    var layout = function(title, content, cArgs) {
        return {
            controller: function(args) {
                document.title = (title ? 'RS' : 'Reddit Search') + ' - ' + title;
            },
            view: function(ctrl, args) {
                return m('div.container', {
                    config: mutil.c.fadeIn
                }, [
                    m.component(content, cArgs)
                ]);
            }
        };
    };

    var loadRoutes = function() {
        m.route.mode = 'hash';
        m.route(document.body, '/', {
            '/': layout('', cmp.Start),
            '/r/:query': layout('Subreddit', cmp.Results, {type: 'subreddit'}),
            '/search/:query': layout('Search', cmp.Results, {type: 'search'})
        });
    };

    // load dependencies, then register routes and start system
    app.loadModules(deps, loadRoutes);

}());
