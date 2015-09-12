(function() {
  
  var app = window.app = window.app || {};
  
  var cmp = app.cmp = {};
  var model = app.model = {};
  
  app.IMAGES = {
    loading: 'img/loading.gif'
  };

  app.const = {
    REDDIT_URL: 'https://www.reddit.com',
    APP_NAME: 'Reddit Ultron',
    APP_INITIALS: 'RU',
    LOAD_NUM: 3
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
        document.title = (title ? app.const.APP_INITIALS + ' - ' + title : app.const.APP_NAME);
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

}
());
