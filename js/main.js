(function() {

    var app = window.app = window.app || {};

    var cmp = app.cmp = {};
    var model = app.model = {};

    var deps = {
        // EXTRA
        'js/': ['util'],
        // MODELS
        'js/models/': [],
        // COMPONENTS
        'js/components/': ['search', 'results']
    };

    var layout = function(title, content) {
        return {
            controller: function(args) {
                document.title = 'Reddit Search - ' + title;
            },
            view: function(ctrl, args) {
                return m('div.container', {
                    config: mutil.c.fadeIn
                }, [
                    m.component(content, {})
                ]);
            }
        };
    };

    var loadRoutes = function() {
        m.route.mode = 'hash';
        m.route(document.body, '/search', {
            '/search': layout('Start', app.cmp.search),
            '/search/:query': layout('Results', app.cmp.results)
        });
    };

    // load dependencies, then register routes and start system
    app.loadModules(deps, loadRoutes);

}());
