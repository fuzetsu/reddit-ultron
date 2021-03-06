app.cmp.Results = {
  controller: function(args) {
    var ctrl = {
      loading: m.prop(true),
      posts: m.prop([]),
      query: m.route.param('query'),
      limit: m.prop(5),
      backToSearch: function() {
        m.route('/search');
      },
      genPostTitle: function(post) {
        return m('div.post-info', [
          m('div.title', post.title),
          m('div.details', [
            m('span.score', post.score),
            ' upvotes and ',
            m('a[target=_blank]', {
              href: app.const.REDDIT_URL + post.permalink
            }, post.num_comments + ' comments'),
            ' posted by ',
            m('a[target=_blank]', {
              href: app.const.REDDIT_URL + '/user/' + post.author
            }, '/u/' + post.author),
            ctrl.isMultiReddit ? ([
              ' to ',
              m('a[target=_blank]', {
                config: m.route,
                href: '/r/' + post.subreddit
              }, '/r/' + post.subreddit)
            ]) : '',
          ])
        ]);
      },
      genPostContent: function(post) {
        var content = [];
        if(/\.(jpg|png|gif)$/i.test(post.url)) {
          content = m('img.resize', {onclick: mutil.toggleExpand, src: post.url});
        } else if(/imgur\.com\/[a-z0-9]+$/i.test(post.url)) {
          content = m('img.resize', {onclick: mutil.toggleExpand, src: post.url + '.jpg'});
        } else {
          if(/\.(jpg|png|gif)$/i.test(post.thumbnail)) {
            content.push(m('img', {src: post.thumbnail}));
          }
          content.push(m('a[target=_blank]', {href:post.url}, post.url));
        }
        return m('div.post-content', content);
      },
      showError: function() {
        ctrl.loading(false);
        Velocity(util.q('.error'), {
          opacity: 1,
          fontSize: ['125%', '50%']
        }, {
          display: 'block'
        });
        m.redraw();
      },
      handleScroll: function(e) {
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if(document.body.clientHeight - (window.innerHeight + scrollTop) < window.innerHeight) {
          ctrl.limit(ctrl.limit() + app.const.LOAD_NUM);
          m.redraw();
        }
      },
      onunload: function() {
        window.removeEventListener('scroll', ctrl.handleScroll);
      }
    };
    // register scroll handler
    window.addEventListener('scroll', ctrl.handleScroll);
    // determine is this is a multireddit
    ctrl.isMultiReddit = (args.type === 'search' || ctrl.query === 'all' || ctrl.query.indexOf('+') !== -1);
    // request the results
    app.model.Reddit[args.type](m.route.param('query'))
      .then(ctrl.posts)
      .then(ctrl.loading.bind(null, false))
      .then(m.redraw, ctrl.showError);
    return ctrl;
  },
  view: function(ctrl, args) {
    return m('div.results', [
      m('span.back-to-search', {
        onclick: ctrl.backToSearch
      }, [
        mutil.icon('arrow-left'),
        ' Search'
      ]),
      m('div', ctrl.posts().slice(0, ctrl.limit()).map(function(post) {
        return m('div.post', [
          ctrl.genPostTitle(post),
          ctrl.genPostContent(post)
        ]);
      })),
      m('img.loading', {
        src: app.IMAGES.loading,
        hidden: !ctrl.loading()
      }),
      m('div.error', [
        m('p', 'Unable to find "' + ctrl.query + '"'),
        m('button.error-button.pure-button', {
          onclick: ctrl.backToSearch
        }, 'Back to Search?')
      ])
    ]);
  }
};
